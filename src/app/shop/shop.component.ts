import { Router } from '@angular/router';
import { CartService } from './../services/cart.service';
import { ProductsService } from './../services/products.service';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ToastrService } from 'ngx-toastr';




declare let $:any;


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  catsData:any[] = [];
  displayProducts:any[] = [];
  allProducts:any []=[];
  cartItems:any[]=[];

  currentPage:any = 1;
  lastPage:number = 0;
  page_items:any[]= [];
  catType:any = null;
  term:any;
  isAdded:boolean = false
  minPrice:number = 1;
  maxPrice:number = 10000;
  constructor(private _ProductsService:ProductsService,  private _ToastrService:ToastrService, private _CartService:CartService, private _router:Router) 
  {
    this.getCats();
    this.getProducts();
    this.checkExistingItems();
    
  }

  checkExistingItems()
  {
    this._CartService.cartData.subscribe((resp:any)=>
    {
      this.cartItems = resp
    })
  }

    getCats()
    {
      this._ProductsService.getAllCat().subscribe((resp)=>
      {
        this.catsData = resp.data;
      })
    }

    getProducts()
    {
      this._ProductsService.getAllProducts().subscribe((resp)=>
      {
        this.displayProducts = resp.data;
        this.allProducts = resp.data;
        // this.page_items = resp.meta.links;
        let pagesLength = resp.meta.links.length;
        this.page_items =  resp.meta.links.slice(1, pagesLength - 1);
        this.lastPage = resp.meta.last_page;
              
      },
      (errors)=>
      {
        console.log(errors);
        
      })
    }

    getPerPage(event:any)
    {
      let pageValue = event.value;
      
      this._ProductsService.getProductsPerPage(pageValue).subscribe((resp)=>
      {
        console.log(resp);
        this.displayProducts = resp.data; 
      })
    }


    filterByCat(event:any)
    {
      this.catType = event.value; // to use it by pipe filter      
    }

    addItemToCart(itemId:number)
    {
      this._CartService.addToCart(itemId).subscribe((resp)=>
      {
        console.log(resp);
        this._CartService.showCartData()
        this._ToastrService.success(resp.item.product.name + ' Added successfully!')      
      },
      (errors)=>
      {
        console.log(errors);
        
        
          this._ToastrService.error('You Have to be a Customer!')
          this._router.navigate(['/login'])


        
      })
    }

    getMinPrice(event:any)
    {
      this.minPrice = event.value;
      this.filterByPrice();
    }

    getMaxPrice(event:any)
    {
      this.maxPrice = event.value;
      this.filterByPrice();
    }

    filterByPrice()
    {
        console.log(this.minPrice)
        let productsArray = this.allProducts;        
        this.displayProducts = productsArray.filter((product:any)=>  {return Number(product.price) >= Number(this.minPrice) && Number(product.price) <= Number(this.maxPrice)  });
    }

    nextPagination()
    {
      if(this.currentPage < this.lastPage)
      {
        this.currentPage ++;
        this._ProductsService.getAllProducts(this.currentPage).subscribe((resp)=>
        {
          this.displayProducts = resp.data
          this.checkExistingItems()
          console.log(resp);

        }) 
      }
    }

    prevPagination()
    {
      if(this.currentPage > 1)
      {
        this.currentPage --;
        this._ProductsService.getAllProducts(this.currentPage).subscribe((resp)=>
        {
          this.displayProducts = resp.data;
          
        })
      }
    }

    getByPage(pageNum:any)
    {
      this.currentPage = pageNum;
      this._ProductsService.getAllProducts(pageNum).subscribe((resp)=>
      {
        console.log(pageNum);
        this.displayProducts = resp.data;
        
      })
    }
    


  ngOnInit(): void {

    
    // this.checkExistingItems()

    let min_price = 0;
    let max_price = 1000;

    $('#min-price').on("change mousemove", function () {
        min_price = parseInt($('#min-price').val());
        $('#min-price-txt').text(' $' + min_price);
    });
    $('#max-price').on("change mousemove", function () {
        max_price = parseInt($('#max-price').val());
        $('#max-price-txt').text(' $' + max_price);
    });
  }

}
