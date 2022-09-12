import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';

declare let $:any;


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userRole:string = ''
  closeResult:any = '';
  fileImg:any;
  message:string = '';
  updatedCat:any;
  catsData:any[]=[];

  productsData:any[]=[];
  imgsArray:any []=[];
  currentProduct:any;
  unAppProducts:any;
  allSellerItems:any;
  // sellerProductsStatus:any[]= [];

  productMessage:string = ''
  statusMessage:string = '';

  constructor(private _ProductsService:ProductsService, private modalService: NgbModal, private _AuthService:AuthService) 
  {
    this._AuthService.userRole.subscribe((currUser:any)=>
    {
      this.userRole = currUser;
    });
  
      
      this.getCurrentCats();
      this.getProducts();
      // console.log(this.catsData);
      
      this.getUnAppProducts();
    
  }

  getCurrentCats()
  {
    this._ProductsService.getAllCat().subscribe((resp)=>
    {
      this.catsData = resp.data;
    })
  }

  catForm:FormGroup = new FormGroup({
    name:new FormControl(null , Validators.required),
    image:new FormControl(null, Validators.required),
    
  })

  getFile(event:any)
  {
    let fileLength = event.target.files?.length;
    if (fileLength > 0)
    {      
      this.fileImg = event.target.files[0];
      this.catForm.patchValue({image:this.fileImg});
    }
  }

  createCat(catData:any)
  {
    console.log(catData);

    let  formData = new FormData();
    formData.append('image', catData.value.image, this.fileImg.name);
    formData.append('name', catData.value.name);
    

    this._ProductsService.createCat(formData).subscribe(
    (response)=>
    {  
      this.message = response.message;
    },
    (error)=>
    {
      this.message = error.message;
      console.log(error);
    },
    ()=>
    {
        this.getCurrentCats();
    }) 
  }
  

  // ======= Edit Category =========== //

  updatedForm:FormGroup = new FormGroup({
    name:new FormControl(null , Validators.required),
    image:new FormControl(null),
    
  })

  getUpdatedFile(event:any)
  {
    let fileLength = event.target.files?.length;
    if (fileLength > 0)
    {      
      this.fileImg = event.target.files[0];
      this.updatedForm.patchValue({image:this.fileImg});
    }
  }

  editCat(id:any, data:any)
  {
    this.open(data);
    this.updatedCat = this.catsData.find( (catId)=> catId.id == id);
    console.log(this.catsData);
    
    
    for (let i = 0; i < this.catsData?.length; i++) // Set Input old Values
    {
      if(this.catsData[i].id == this.updatedCat.id)
      {
        this.updatedForm.controls.name.setValue(this.catsData[i].name);
      }
    }
  }
  
  updateCat(updatedcatData:any)
  {
    let formData:any =
    {
      name : updatedcatData.value.name
    }
    if(this.fileImg) // if edit the image
    {
      formData = new FormData();
      formData.append('image', updatedcatData.value.image, this.fileImg.name);
      formData.append('name', updatedcatData.value.name);
    }
      this._ProductsService.editCat(formData, this.updatedCat.id).subscribe(
        (response)=>
        { 
          this.message = response.message;
          this.getCurrentCats();
          console.log(response);
          
        },
        (error)=>
        {
          this.message = error.message;
          console.log(error);
        })
  }

  // ======= Delete Category =========== //

  deleteCat(id:any)
  {
    this._ProductsService.DeleteCat(id).subscribe(
      (response)=>
      {
        this.message = response.message;
        this.getCurrentCats();        
      },
      (errors)=>
      {
        this.message = errors.error.message;
        console.log(errors);
        
      })
  }

    // ======= Product Sectionnnnnnnnn =========== //


  productsForm:FormGroup = new FormGroup({

    category_id :new FormControl(null),
    name :new FormControl(null),
    description :new FormControl(null),
    cover_image :new FormControl(null), 
    images :new FormArray([]),
    price :new FormControl(null),
    discount :new FormControl(null),
    stock :new FormControl(null),
  });

  getProducts()
  {
    this._ProductsService.getAllProducts().subscribe(
      (resp)=>
      {
        this.productsData = resp.data.filter((product:any)=> product.category !== null )
        // console.log(resp);
        
      })
  }

  getProFile(event:any)
  {
    let fileLength = event.target.files?.length;
    if (fileLength > 0)
    {      
      this.fileImg = event.target.files[0];
      this.productsForm.patchValue({cover_image:this.fileImg});
    }
    // console.log(fileLength);
    
  }
  // array of imagesssss
  getAllProFiles(event:any)
  {
    let fileLength = event.target.files?.length;
    if (fileLength > 0)
    {      
      let productFiles = event.target.files;
      // console.log(event.target.files);
      for (let i = 0; i < fileLength; i++) {
      this.productsForm.controls.images.value.push(productFiles[i]);

      this.imgsArray.push(productFiles[i])
      
      }
    // console.log(fileLength);

    }
  }

  // =======  Create Productt =========== //


  createProduct(productsForm:any)
  { 
    let formData = new FormData();
    formData.append('name', productsForm.value.name);
    formData.append('description', productsForm.value.description);
    formData.append('category_id', productsForm.value.category_id);
    formData.append('price', productsForm.value.price);
    formData.append('discount', productsForm.value.discount);
    formData.append('stock', productsForm.value.stock);
    formData.append('cover_image', productsForm.value.cover_image, this.fileImg.name);
    console.log(this.imgsArray);
    
    for (let img of this.imgsArray) {
      formData.append('images[]', img, img.name);
    }

    this._ProductsService.createProduct(formData).subscribe(
      (resp)=>
      {
        if(resp.data)
        {
          this.productMessage = resp.message;
        }
        this.getProducts();
        this.getUnAppProducts();
        this.productsForm.reset();
        console.log(resp);
      },
      (errors)=>
      {
        this.productMessage = errors.error.message;
        console.log(errors);
        
      }
    )
    
  }

  // =======  Show Productt =========== //

  showProduct(proId:number, show_product:any)
  {
    this.open(show_product);
      this.currentProduct = this.productsData.find((product:any)=> product.id == proId );
      console.log(this.productsData);
  
  }

  // =======  Edit Productt =========== //

  editProduct(proId:number, edit_product:any)
  {
    this.open(edit_product);
    this.productsForm.reset();
    this.currentProduct = this.productsData.find((product)=> product.id == proId );
    
    for (let i = 0; i < this.productsData?.length; i++) // Set Input old Values
    {
      if(this.productsData[i].id == this.currentProduct.id)
      {
        this.productsForm.controls.name.setValue(this.productsData[i].name);
        this.productsForm.controls.description.setValue(this.productsData[i].description);
        this.productsForm.controls.category_id.setValue(this.productsData[i].category.id);
        this.productsForm.controls.price.setValue(this.productsData[i].price);
        this.productsForm.controls.discount.setValue(this.productsData[i].discount);
        this.productsForm.controls.stock.setValue(this.productsData[i].stock);
      }
    }
  }

  updateProduct(productData:any)
  {
    let formData:any =
    {
      name : productData.value.name,
      description : productData.value.description,
      category_id : productData.value.category_id,
      price : productData.value.price,
      discount : productData.value.discount,
      stock : productData.value.stock,
    }
    
    if(this.fileImg) // if edit the image
    {
      formData = new FormData();
      formData.append('image', productData.value.cover_image, this.fileImg.name);
      formData.append('name', productData.value.name);
      formData.append('description', productData.value.description);
      formData.append('category_id', productData.value.category_id);
      formData.append('price', productData.value.price);
      formData.append('discount', productData.value.discount);
      formData.append('stock', productData.value.stock);
    }

    this._ProductsService.editProduct(formData, this.currentProduct.id).subscribe((resp)=>
    {
      this.productMessage = resp.message + ' the update is pending... ';
      this.getProducts();
      this.getUnAppProducts();
    },
    (errors)=>
    {
      this.productMessage = errors.error.message;
      console.log(errors);
      
    })
    
  }

  // =======  Delete Productt =========== //

  deleteProduct(id:any)
  {
    this._ProductsService.deleteProduct(id).subscribe(
      (response)=>
      {
        this.productMessage = response.message;
        this.getProducts();
        this.getUnAppProducts();
        console.log(response);
        
      },
      (errors)=>
      {
        this.productMessage = errors.error.message;
        console.log(errors);
        
      })
  }


  // Admin Approvallllllll

  getUnAppProducts()
  {
    this._ProductsService.getUnApproveProduects().subscribe((resp)=>
    {
      if(this.userRole == 'seller')
      {
        this.allSellerItems= resp.data;
        this.productsData= resp.data;
        // console.log(resp.data);
        return;
      }
      this.unAppProducts = resp.data.filter((product:any) => product.approval_status == 'pending');

      console.log(this.unAppProducts);
    },
    (errors)=>{console.log(errors);
    })
  }



  changeProStatus(statusValue:any, id:any)
  {
    console.log(statusValue);
    let status:any = 
    {
      approval_status:statusValue
    }
    
    this._ProductsService.changeProductStatus(status, id).subscribe(
    (resp)=>
    {
      this.statusMessage = resp.message;
      this.getUnAppProducts();
      this.getProducts;
    },
    (errors)=>
    {
      console.log(errors);
      this.statusMessage = errors.error.message;
    })
  }
  open(content:any) 
  {    
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = reason;      
    });
  }

  ngOnInit(): void {

  //  this.getUnAppProducts()
  }

}
