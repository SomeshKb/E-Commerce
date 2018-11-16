import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/products.service';
import { Product, CartProduct } from '../model/Product';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product:Product;


  constructor(private productService:ProductService,private route:ActivatedRoute,private auth:AuthenticationService) {
      if (auth.isLoggedIn()) {
        this.auth.isUserLoggedIn.next(true);
    }
   }

  ngOnInit() {
    let id: string = this.route.snapshot.paramMap.get('id');
    this.getProductDetails(id);
  }

  getProductDetails(id:string) {
    this.productService.getProduct(id).subscribe(
      (result)=>{
      this.product=result
      })
  }

  addToCart(){
    let cartProduct:CartProduct={
        productID:this.product._id        
    }
    this.productService.addCartProduct( cartProduct,this.auth.getUserDetails()._id).subscribe();
  }
}
