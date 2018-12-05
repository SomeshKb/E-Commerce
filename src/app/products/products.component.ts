import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/products.service';
import { Product } from '../model/Product';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[];

  constructor(private productService: ProductService, private auth: AuthenticationService, private route: ActivatedRoute) {
    if (auth.isLoggedIn()) {
      this.auth.isUserLoggedIn.next(true);
    }

    this.productService.currentProduct.subscribe(value => {
      this.products = value;
    })
  }

  ngOnInit() {
    if (this.route.snapshot.queryParams) {
      let query: string = <string><any>this.route.snapshot.queryParams;
      this.getProductByQueryParams(query);
    }
    else {
      this.getAllProducts();
    }
  }

  //not used 
  getProductByGender(value: string) {
    this.productService.getProductByGender(value).subscribe(product => {
      this.productService.currentProduct.next(product);
    })
  }

  getProductByQueryParams(value: string) {
    this.productService.getProductByParams(value).subscribe(product => {
      this.productService.currentProduct.next(product);
    })
  }

  getAllProducts() {
    this.productService.getProducts().subscribe((result) => {
      this.productService.currentProduct.next(result);
    })
  }
}
