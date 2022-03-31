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
  {path:'register', canActivate:[AuthGuard], component:RegisterComponent},
  {path:'login' , canActivate:[AuthGuard], component:LoginComponent},
  {path:'profile' , canActivate:[ProfileGuard], component:ProfileComponent},
  {path:'profile-info' ,  canActivate:[ProfileGuard], component:ProfileInfoComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
