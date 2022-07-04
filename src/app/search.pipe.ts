import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(displayProducts:any[], term:string): any[] {

    return displayProducts.filter((product)=>
    {
      if(term)
      {
        return  product.name.toLowerCase().includes(term.toLocaleLowerCase())
      }

      return displayProducts;
    })
  }

}
