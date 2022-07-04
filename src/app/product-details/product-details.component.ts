import { ToastrService } from 'ngx-toastr';
import { CartService } from './../services/cart.service';
import { ProductsService } from './../services/products.service';
import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';

declare let $:any;

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productId:number = 0;
  categoryId:number = 0;
  productDetails:any;
  relatedProducts:any;
  constructor(private _ActivatedRoute:ActivatedRoute, private _ProductsService:ProductsService, private _CartService:CartService, private _ToastrService:ToastrService) {
    
    this.productId = _ActivatedRoute.snapshot.params.proId;
    this.categoryId = _ActivatedRoute.snapshot.params.catId;
    if(this.categoryId && this.productId)
    {
      this.getProductDetails();
      this.getRelatedProducts();
    }
  }
  
  getProductDetails()
  {
    this._ProductsService.getProductById(this.productId).subscribe((resp:any)=>
    {
      this.productDetails = resp.data;      
    })
  } 

  getRelatedProducts()
  {
    this._ProductsService.getProductByCat(this.categoryId).subscribe((resp)=>
    {
      this.relatedProducts = resp.data
    })
  }
  
  slideImgs(event:any)
  {
    let x = event.src;
    $('.main_img img').attr('src', x);
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
      
      this._ToastrService.info(errors.error.message)

      $(".sideBar_lightbox").css("display", 'block');
      $(".sideBar").css("right", '0px');
      
          
    })
  }
  ngOnInit(): void {
    
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 600,
    
    navText: ['<i class="fa-solid fa-caret-left"></i>', '<i class="fa-solid fa-caret-right"></i>'],
    responsive: {
      0: {
        items: 1 
      },
      400: {
        items: 2
      },
      760: {
        items: 3
      },
      1000: {
        items: 4
      }
    },
    nav: true,
  }

}
