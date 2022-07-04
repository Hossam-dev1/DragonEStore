import { CartComponent } from './cart/cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

import { ProfileGuard } from './profile.guard';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ShopComponent } from './shop/shop.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileInfoComponent } from './profile-info/profile-info.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'shop',component:ShopComponent},
  {path:'cart', canActivate:[ProfileGuard] ,component:CartComponent},
  {path:'productdetails/:proId/:catId',component:ProductDetailsComponent},
  {path:'register', canActivate:[AuthGuard], component:RegisterComponent},
  {path:'login' , canActivate:[AuthGuard], component:LoginComponent},
  {path:'profile' , canActivate:[ProfileGuard], component:ProfileComponent},
  {path:'profile-info' ,  canActivate:[ProfileGuard], component:ProfileInfoComponent},
  {path:'dashboard' ,  canActivate:[ProfileGuard], component:DashboardComponent},

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes , { useHash: true }) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
