import { Pipe, PipeTransform } from '@angular/core';
declare let $:any;
@Pipe({
  name: 'existedItems'
})
export class ExistedItemsPipe implements PipeTransform {

  transform(displayProducts: any[], cartItems:any[]): any {

    if(cartItems && displayProducts)
    {
      $(document).ready(function()
      {
        for (let item of cartItems) 
        {
          $(`#addItemBtn_${item.product.id}`).addClass('disabled btnNone');
          $(`#addItemBtn_${item.product.id}`).text('Added To Cart');
          $(`#addLinkBtn_${item.product.id}`).addClass('btnNone');
        }
      })
      

      return displayProducts

      
    }
  }

}
