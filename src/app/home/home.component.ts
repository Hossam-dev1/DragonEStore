// import { NavbarComponent } from './../navbar/navbar.component';
import { Component, OnInit } from '@angular/core';
declare let $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor() { }


  ngOnInit(): void {

    $('#cart_menu').click(function()
    {
      if( $("#sideBar").css("width") =="0px" ) //when sidebar inside
      {
        $(".sideBar_lightbox").css("display", 'block');
        $(".sideBar").css("width", '320px');
      }
      else //when sidebar outside
      {
        $(".sideBar_lightbox").css("display", 'none');
        $(".sideBar").css("width", '0px');
      }


    });
    
    function closeSideBar() 
    {
      $(".sideBar").css("width", '0px');
      $(".sideBar_lightbox").css("display", 'none');
    }

    $(".sideBar_lightbox").on('click', closeSideBar);
    $("#close-bar").on('click', closeSideBar);

  }

}
