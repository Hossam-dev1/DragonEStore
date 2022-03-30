import { Component, OnInit } from '@angular/core';
declare let $:any;

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

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
