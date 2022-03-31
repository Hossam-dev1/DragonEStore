import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';

declare let $:any;


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileErrors:string[]=[];
  passwordErrors:string[]=[];
  fileImg:any = null;

  passwordSuccess:boolean = false;
  profileSuccess:boolean = false;

  userData:any
  userName:any
  constructor(private _AuthService:AuthService, private _Router:Router) 
  {
    this._AuthService.currentUserData.subscribe(()=>
    {      
    if (this._AuthService.currentUserData.getValue()) 
      {
        if (localStorage.getItem('updatedData')) // updated profile data
        {
          this.userData = this._AuthService.currentUserData.getValue();        
          this.userName = this.userData.full_name;
          return;
        }
        this.userData = this._AuthService.currentUserData.getValue().user;                
        this.userName = this.userData.full_name;
        console.log(this.userData.avatar);
        
      }
    })
  }

  passwordForm:FormGroup = new FormGroup({
    password:new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z0-9]{3,10}$")]),
    new_password:new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z0-9]{3,10}$")]),
    new_password_confirmation :new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z0-9]{3,10}$")]),
  })

  passwordUpdate(passwordForm:any)
  {
    console.log(passwordForm.value);
    
    this._AuthService.updatePassword(passwordForm.value).subscribe(
      (response)=>
      {
        
        if(response.message)
        {
          this.passwordSuccess = true;
        }        
        
      },
      (errors)=>
      {
        if (errors.status == 422) 
        {
          let errorsArray = errors.error.errors;
          this.passwordErrors = [];
          for (var property in errorsArray) 
          {
            this.passwordErrors.push(errorsArray[property][0]);
          }
        }
        
      })
  }

  // profileeeeeeeee updateddddddd

  profileForm:FormGroup = new FormGroup({
    full_name:new FormControl(null, [Validators.required]),
    country:new FormControl(null, [Validators.required]),
    city:new FormControl(null, [Validators.required]),
    address:new FormControl(null, [Validators.required]),
    postal_code :new FormControl(null, [Validators.required, Validators.maxLength(5), Validators.minLength(5)]),
    avatar: new FormControl(null , [Validators.required])
  })

  getFile(event:any)
  {
    let fileLength = event.target.files.length;

    if (fileLength > 0)
    {      
      this.fileImg = event.target.files[0];
      this.profileForm.patchValue({avatar:this.fileImg});
      console.log(this.profileForm);
      
    }
  }

  profileSubmit(profileForm:any)
  {    
    let userData = profileForm.value    
    let  formData = new FormData();
    console.log(userData);
    
    formData.append('avatar', userData.avatar,this.fileImg.name );
    formData.append('full_name', userData.full_name);
    formData.append('city', userData.city );
    formData.append('country', userData.country);
    formData.append('address', userData.address);
    formData.append('postal_code', userData.postal_code);
    
    this._AuthService.updateProfile(formData).subscribe(
    (response)=>
    {      
    
      if (response.message) 
      {
        this.userName = response.data.full_name;
        localStorage.setItem('updatedData', JSON.stringify(response.data));
        this.profileErrors = [];
        this.profileSuccess = true
      }
    },
    (errors)=>
    {      
      console.log(errors);
      
      let errorsArray = errors.error.errors;
      this.profileErrors = [];
      for (var property in errorsArray) 
      {
        this.profileErrors.push(errorsArray[property][0]);
      }
    })

  }
  ngOnInit(): void {

    $('#password-tab').click(function()
    {
      $("#account").removeClass('show active');
      $("#password").addClass('show active');
      $('#password-tab').addClass('active bg-secondary text-white')
      $('#account-tab').removeClass('active bg-secondary text-white')

    })

    $('#account-tab').click(function()
    {
      $("#account").addClass('show active');
      $("#password").removeClass('show active');
      $('#account-tab').addClass('active bg-secondary text-white')
      $('#password-tab').removeClass('active bg-secondary text-white')
    })

    $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
      $("#success-alert").slideUp(500);
    });

    window.setTimeout(function() {
      $("#success-alert").fadeTo(500, 0).slideUp(1000,function()
      {
        $("#success-alert").remove()
      })
  }, 6000);

  }

}
