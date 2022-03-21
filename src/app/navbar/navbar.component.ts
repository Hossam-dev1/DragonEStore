import { Component, OnInit } from '@angular/core';
declare let $:any;


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    $('#menu-bar').click(function()
    {
      if( $("#menu").css("left")=="500px" ) //when sidebar inside
      {
          $("#menu").animate ( {left: "180"} ,400);
          $('#menu-bar').addClass('fas fa-times');
      }
      
      else //when sidebar outside
      {
        $("#menu").animate ( {left: "500"} ,400);
        $('#menu-bar').removeClass('fas fa-times');
        $('#menu-bar').addClass('fas fa-bars');
      }


    });
  }

}
