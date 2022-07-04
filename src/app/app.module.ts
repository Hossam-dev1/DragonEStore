import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'ngx-owl-carousel-o';




import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';



// import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { ToastrModule } from 'ngx-toastr';
import { NgxImageZoomModule } from 'ngx-image-zoom';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ShopComponent } from './shop/shop.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { SearchPipe } from './search.pipe';
import { CatFilterPipe } from './cat-filter.pipe';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { ExistedItemsPipe } from './existed-items.pipe';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    ShopComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    ProfileInfoComponent,
    DashboardComponent,
    SearchPipe,
    CatFilterPipe,
    ProductDetailsComponent,
    CartComponent,
    ExistedItemsPipe,

  ],
  imports: [  
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxImageZoomModule,
    ToastrModule.forRoot(
      {
        timeOut: 5000,
        positionClass: 'toast-bottom-right',
        preventDuplicates: false,
      }
    ),

    NgbPaginationModule,
    NgbAlertModule,
    RouterModule,
    CarouselModule
    


    
    

    
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
