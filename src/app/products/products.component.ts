import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/products.service';
import { Product } from '../model/Product';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[];
  // sub: Subscription;

  constructor(private productService: ProductService, private auth: AuthenticationService, private route: ActivatedRoute) {
    if (auth.isLoggedIn()) {
      this.auth.isUserLoggedIn.next(true);
    }
    this.productService.currentProduct.subscribe(value => {
      this.products = value;
    })
    this.route.queryParams.subscribe((params => {
      this.getProductByGender(params.gender)
    }))
  }

  ngOnInit() {
    if (this.route.snapshot.queryParams.gender) {
      this.getProductByGender(this.route.snapshot.queryParams.gender);
    }
    else {
      this.getAllProducts();
    }
  }

  getProductByGender(value: string) {
    this.productService.getProductByGender(value).subscribe(product => {
      this.productService.currentProduct.next(product);
    })
  }

  getAllProducts() {
    this.productService.getProducts().subscribe((result) => {
      this.productService.currentProduct.next(result);
    })
  }

  ngOnDestroy() {
    // this.sub.unsubscribe();
  }
}
