import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage:string = '';
  user_token:string = '';


  constructor(private _AuthService:AuthService, private _Router:Router, private _ToastrService:ToastrService) { 


  }

  loginForm:FormGroup = new FormGroup({

    phone_email:new FormControl(null, [Validators.required]),    
    password:new FormControl(null, [Validators.required]),
  })

  login(loginForm:any)
  {
    
    this._AuthService.login(loginForm.value).subscribe(
      (response)=>
      {
        if (response.message == 'Success') 
        {
          localStorage.setItem('currentUser', response.access_token);
          this._AuthService.saveUserData();
          let userNmae = this._AuthService.currentUserData.getValue()?.user.full_name;
          this._ToastrService.success('Login Successfully', `Welcome ${userNmae}` );
          this._Router.navigate(['/home']);
        }
        
      },
      (error)=>
      {
        this.errorMessage = error.error.message;
        console.log(error);
        
        
      })
    
  }
  ngOnInit(): void {
  }

}
