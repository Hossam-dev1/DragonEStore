import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, Subscription } from 'rxjs';

declare let $:any;
@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseURL:any = 'https://api.dragonestore.tk/';
  headers:any;
  
  cartData:any = new BehaviorSubject([])
  cartItemsLength:any = new BehaviorSubject(0)
  cartTotalValue:any = new BehaviorSubject(0)
  

  constructor(private _HttpClient:HttpClient, private _AuthService:AuthService)
  {
    this._AuthService.headers.subscribe((resp:any)=>
    {
      this.headers= resp
      console.log(this.headers);
      
    }) 
    this.showCartData()
  }
    // Carttttttt

    getCartData():Observable<any>
    {
        return this._HttpClient.get(this.baseURL+`cart`, {headers:this.headers})
    }
    
    showCartData()
    {
      if(this._AuthService.currentUserData.getValue())
      {        
        this.getCartData().subscribe((resp)=>
        {
          this.cartData.next(resp.items);
          this.cartItemsLength.next(resp.items.length);
          this.getCartTotal()
          
        },(errors)=>
        {
          console.log(errors);
          
        })
      }

    }

    addToCart(id:any):Observable<any>
    {
      $('.fa-bag-shopping').addClass('fa-bounce');

      let productData = 
      {
        'quantity':1,
        'product_id':id
      }
      return this._HttpClient.post(this.baseURL+`cart`, productData, {headers:this.headers})
    }

    getCartTotal()
    {
      let cartSubtotal = 0;
      for (let currentItem of this.cartData.getValue()) 
      {
        cartSubtotal+= currentItem.product.final_price * currentItem.quantity
        // console.log(currentItem);
        
        
      }
      this.cartTotalValue.next(cartSubtotal.toFixed(2))
    }
    
    updateItemQty(itemId:number, itemQty:any):Observable<any>
    {

      let productData = 
      {
        'quantity':itemQty
      }
      return this._HttpClient.post(this.baseURL+`cart/${itemId} `, productData, {headers:this.headers})
    }

    clearCartItems():Observable<any>
    {
      return this._HttpClient.delete(this.baseURL+`cart`, {headers:this.headers})
    }
    removeFromCart(itemId:number):Observable<any>
    {
      return this._HttpClient.delete(this.baseURL+`cart/${itemId}`, {headers:this.headers})
    }
}
