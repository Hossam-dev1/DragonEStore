import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

declare let $:any;


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogin:boolean = false;
  userData:any = {};
  userName:string = '';

  dashboard:boolean = true;

  constructor(private _AuthService:AuthService, public _Router:Router)
  {
    this._AuthService.currentUserData.subscribe((currentData:any)=>
    {      
      
    if (currentData) 
      {
        this.isLogin = true; 
        if (localStorage.getItem('updatedData')) // updated profile data
        {
          this.userData = currentData;        
          this.userName = this.userData.full_name;
          return;
        }
        this.userData = currentData.user;        
        this.userName = this.userData.full_name;        
      }
      else
      {
        this.isLogin = false;
      }
    })
  }

  logout()
  {
    localStorage.clear();
    this._AuthService.currentUserData.next(null)
    
    this.isLogin = false;
    this._Router.navigate(['/login']);
  }

  profile_Dropdwon()
  {
    if($('#profile_menu li').css('opacity') != 0) 
    {
      $('#profile_menu li').css('opacity', '0');
      $('.action').animate({bottom:'0px',opacity: '0',height:'0px'}, 'fast');
      $('.action').css('display', 'none');
    }
    else
    {
      $('.action').css({'bottom': '', 'display':'block', 'height':''});
      $('#profile_menu li').css('opacity', '1');
      $('.action').animate({opacity: '1'}, 'fast');
    }
  }

  ngOnInit(): void {
    $('#menu-bar').click(function()
    {
      var menu:any = document.getElementById("menu");
      if( $("#menu").css("left") =="500px" ) //when sidebar inside
      {
          menu.style.left = "180px"  ;  
          $('#menu-bar').addClass('fas fa-times');
      }
      else //when sidebar outside
      {
        menu.style.left = "500px"    ;  
        $('#menu-bar').removeClass('fas fa-times');
        $('#menu-bar').addClass('fas fa-bars');
      }
    });

  }

}
