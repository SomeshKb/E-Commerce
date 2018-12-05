import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProductsComponent } from './products/products.component';
import { AppRoutingModule } from './/app-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from './services/products.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AuthGuardService } from './services/auth-guard.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { AlertComponent } from './shared/alert/alert.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrdersComponent } from './orders/orders.component';
import { SearchComponent } from './shared/search/search.component';
import { NavComponent } from './shared/nav/nav.component';
import { UserProfileComponent } from './shared/user-profile/user-profile.component';
import { ProductLayoutComponent } from './layout/product-layout/product-layout.component';
import { NonProductLayoutComponent } from './layout/non-product-layout/non-product-layout.component';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ProductsComponent,
    ProductDetailComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    AlertComponent,
    HomeComponent,
    SidebarComponent,
    CartComponent,
    CheckoutComponent,
    OrdersComponent,
    SearchComponent,
    NavComponent,
    UserProfileComponent,
    ProductLayoutComponent,
    NonProductLayoutComponent,
    LoginLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
  ReactiveFormsModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [ProductService,AuthenticationService,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
