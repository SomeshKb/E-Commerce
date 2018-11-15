import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ProductService } from '../services/products.service';
import { Product, CartProduct } from '../model/Product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products:Product[]=[];

  constructor(private auth:AuthenticationService , private productService:ProductService) { 
    if (auth.isLoggedIn()) {
      this.auth.isUserLoggedIn.next(true);
    }   
  }
  

  ngOnInit() {
    this.getCartProduct();
  }

  getCartProduct(){
    this.productService.getCartProduct(this.auth.getUserDetails()._id).subscribe(data=>{
      data.map(x=>{
        this.productService.getProduct(x.productID).subscribe(
          data=>{
            if(this.products!=null){
              this.products.push(data);
            }
            else{
              this.products[0]=data;
            }
          }
        )
      })
    });
  }

}
