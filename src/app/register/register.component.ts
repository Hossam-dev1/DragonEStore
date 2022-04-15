import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators , FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
declare let $:any;


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  displayErrors:string[]=[];
  user_token:string = '';
  fileImg:any = null;

  isError:boolean = false;
  

  constructor(private _AuthService:AuthService, private _Router:Router,private formBuilder: FormBuilder, private toastr: ToastrService) 
  {

  }


  registerForm:FormGroup = this.formBuilder.group({

    email:new FormControl(null, [Validators.required, Validators.email]),
    phone:new FormControl(null, [Validators.required, Validators.pattern("^((\\01-?)|0)?[0-9]{11}$")]),
    role:new FormControl(null, [Validators.required]),    
    password:new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z0-9]{3,10}$")]),
    password_confirmation :new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z0-9]{3,10}$")]),
    full_name:new FormControl(null, [Validators.required]),
    country:new FormControl(null, [Validators.required]),
    city:new FormControl(null, [Validators.required]),
    address:new FormControl(null, [Validators.required]),
    postal_code :new FormControl(null, [Validators.required, Validators.maxLength(5), Validators.minLength(5)]),
    avatar: new FormControl(null , [Validators.required])
  });

  getFile(event:any)
  {
    let fileLength = event.target.files.length;

    if (fileLength > 0)
    {      
      this.fileImg = event.target.files[0];
      this.registerForm.patchValue({avatar:this.fileImg});
    }
    
  }

  submitForm(registerForm:any)
  {    
    let userData = registerForm.value    
    let  formData = new FormData();


    formData.append('avatar', userData.avatar,this.fileImg.name );
    formData.append('email', userData.email);
    formData.append('phone', userData.phone);
    formData.append('role', userData.role);
    formData.append('password', userData.password);
    formData.append('password_confirmation', userData.password_confirmation);
    formData.append('full_name', userData.full_name);
    formData.append('city', userData.city );
    formData.append('country', userData.country);
    formData.append('address', userData.address);
    formData.append('postal_code', userData.postal_code);

    this._AuthService.register(formData).subscribe(
    (response)=>
    {      
      if (response.message == 'Success') 
      {
        this.displayErrors = [];
        this.isError = false;
        this.toastr.info('Registeration Successfully', 'Login Now !');
        this._Router.navigate(['/login']);
        // this.user_token = response.access_token;
      }
    },
    (errors)=>
    {
      this.isError = true;
      
      let errorsArray = errors.error.errors;
      this.displayErrors = [];
      for (var property in errorsArray) 
      {
        this.displayErrors.push(errorsArray[property][0]);
      }
    })

  }

  ngOnInit(): void {
    $(document).ready(function(){

      var current_fs:any, next_fs:any, previous_fs:any; //fieldsets
      var opacity:any;
      // setProgressBar(current);
      
      $(".next").click(function(){
      
      current_fs = $(event!.target).parent();
      next_fs = $(event!.target).parent().next();
      //Add Class Active
      $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
      
      //show the next fieldset
      next_fs.show();
      //hide the current fieldset with style
      current_fs.animate({opacity: 0}, {
      step: function(now:any) {
      // for making fielset appear animation
      opacity = 1 - now;
      
      current_fs.css({
      'display': 'none',
      'position': 'relative'
      });
      next_fs.css({'opacity': opacity});
      },
      duration: 300
      });
      // setProgressBar(++current);
      });
      
      $(".previous").click(function(){
      
      current_fs = $(event!.target).parent();
      previous_fs = $(event!.target).parent().prev();


      
      
      //Remove class active
      $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
      
      //show the previous fieldset
      previous_fs.show();
      
      //hide the current fieldset with style
      current_fs.animate({opacity: 0}, {
      step: function(now:any) {
      // for making fielset appear animation
      opacity = 1 - now;
      
      current_fs.css({
      'display': 'none',
      'position': 'relative'
      });
      previous_fs.css({'opacity': opacity});
      },
      duration: 300
      });
      // setProgressBar(--current);
      });
      

      
      // $(".submit").click(function(){
      // return false;
      // })
      
      });
  }

}
