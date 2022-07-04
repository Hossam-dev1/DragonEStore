import { CartService } from './../services/cart.service';
import { ProductsService } from './../services/products.service';
import { Component, OnInit, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

declare let $:any;

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  cartData:any[]=[];
  cartTotal:number = 0
  itemTotal:number = 0
  item:any;
  constructor(private _CartService:CartService, private _ToastrService:ToastrService) {

    this.showCartData()
  }

  showCartData()
  {
    this._CartService.cartData.subscribe((resp:any)=>
    {
      this.cartData = resp;
      
    })

    this._CartService.cartTotalValue.subscribe((resp:any)=>
    {
      this.cartTotal = resp;     
    })
  }

  increase(itemId:any)
  {
    this.item = this.cartData.find((product)=> product.id == itemId);
    this.item.quantity++;
    
    this.itemTotal = this.item.quantity * this.item.product.final_price

    this.updateProductQty(itemId)
    this._CartService.getCartTotal()
    $(`#remove_icon_${itemId}`).removeClass('fa-beat');
  } 

  decrease(itemId:any)
  {
    this.item = this.cartData.find((product)=> product.id == itemId);
    if(this.item.quantity <= 1)
    {
      this.item.quantity = 1
      $(`#remove_icon_${itemId}`).addClass('fa-beat');
    }
    else
    {
      this.item.quantity--;
      this.updateProductQty(itemId)
      this._CartService.getCartTotal()
      $(`#remove_icon_${itemId}`).removeClass('fa-beat');
    }
    
  }

  updateProductQty(itemId:number)
  {
    this._CartService.updateItemQty(itemId, this.item.quantity).subscribe((resp)=>
    {
      this._ToastrService.success(resp.item.product.name + ' Updated successfully!')      
      
    })
    
  }
  removeItem(itemId:number)
  {
    this._CartService.removeFromCart(itemId).subscribe((resp)=>
    {
      console.log(resp);
      this._CartService.showCartData();
      
    })
  }

  ClearCartItems()
  {
    this._CartService.clearCartItems().subscribe(resp=>
      {
        this._ToastrService.info(resp.message)      
        this._CartService.showCartData();
        
      })
  }

  ngOnInit(): void {
  }

}
