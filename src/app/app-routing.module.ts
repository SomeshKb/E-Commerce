import { NgModule } from '@angular/core';
import { ProductsComponent } from './products/products.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrdersComponent } from './orders/orders.component';
import { SearchComponent } from './shared/search/search.component';
import { UserProfileComponent } from './shared/user-profile/user-profile.component';
import { NonProductLayoutComponent } from './layout/non-product-layout/non-product-layout.component';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';
import { ProductLayoutComponent } from './layout/product-layout/product-layout.component';

// const routes: Routes = [
//   { path: '', redirectTo: '/products', pathMatch: 'full' },
//   { path: 'products', component: ProductsComponent },
//   { path: 'products/search/:id',component: ProductsComponent},
//   { path: 'product/:id', component: ProductDetailComponent },
//   { path: 'home', component: HomeComponent},
//   { path: 'login', component: LoginComponent},
//   { path: 'register', component: SignupComponent},
//   { path: 'search', component: SearchComponent},
//   { path: 'cart', component: CartComponent, canActivate: [AuthGuardService]},
//   { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuardService] },
//   { path: 'orders', component: OrdersComponent, canActivate: [AuthGuardService] },
//   { path: 'account', component: UserProfileComponent, canActivate: [AuthGuardService] },
// ];


const routes: Routes = [
  {
    path: '', component: NonProductLayoutComponent,
    children: [
      { path: '', component: HomeComponent }
    ]
  },
  {
    path: '',
    component: ProductLayoutComponent,
    children: [
      { path: 'products', component: ProductsComponent },
      { path: 'search/:id', component: ProductsComponent },
      { path: 'product/:id', component: ProductDetailComponent },
    ]
  },

  {
    path: '',
    component: NonProductLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: 'search', component: SearchComponent },
      { path: 'cart', component: CartComponent, },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'account', component: UserProfileComponent }
    ]
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: SignupComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
