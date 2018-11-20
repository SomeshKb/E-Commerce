import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/products.service';
import { Product } from '../model/Product';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products:Product[];

  constructor(private productService: ProductService,private auth: AuthenticationService) { 
    if (auth.isLoggedIn()) {
      this.auth.isUserLoggedIn.next(true);
    }
    this.productService.currentProduct.subscribe(value=>{
      this.products=value;
      console.log(value)
    })

    


  }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts(){
      this.productService.getProducts().subscribe((result)=>{
        this.productService.currentProduct.next(result);
      })
  }
}
