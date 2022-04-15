import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {

  userData:any;

  constructor(private _AuthService:AuthService) 
  {
    this._AuthService.currentUserData.subscribe((data:any)=>
    {      
      if(data.user)
      {
        this.userData = data.user;
        return;
      }
      this.userData  = data
    })
  }

  ngOnInit(): void {
  }

}
