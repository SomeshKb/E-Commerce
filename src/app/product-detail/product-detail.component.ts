import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/products.service';
import { Product, CartProduct } from '../model/Product';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product;

  constructor(private productService: ProductService, private route: ActivatedRoute, private auth: AuthenticationService,private alertService:AlertService) {
    if (auth.isLoggedIn()) {
      this.auth.isUserLoggedIn.next(true);
    }
  }

  ngOnInit() {
    let id: string = this.route.snapshot.paramMap.get('id');
    // console.log(id)
    this.getProductDetails(id);
  }

  getProductDetails(id: string) {
    this.productService.getProduct(id).subscribe(
      (result) => {
        // console.log(result)
        this.product = result
      })
  }

  addToCart() {

    if (this.auth.isLoggedIn()) {
      let cartProduct: CartProduct = {
        productID: this.product._id
      }
      this.productService.addCartProduct(cartProduct, this.auth.getUserDetails()._id).subscribe();
    }
    else{
      // this.alertService.alert.next("Login to add items to your Cart");
      console.log("Alert to login first")
    }

  }
}
