import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ProductService } from '../services/products.service';
import { Product, orderProduct, Order, CartProduct } from '../model/Product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  // @Output
  // EventEmitter e=new EventEmitter<Order>();


  products: Product[] = [];
  orderProduct: orderProduct[] = [];
  quantity: number[] = [];
  order: Order = {
    _id: null,
    products: [],
    buyerID: "",
    date: "",
    totalCost: 0,
    status: "pending"

  };
  constructor(private auth: AuthenticationService, private productService: ProductService,private router:Router) {
    if (auth.isLoggedIn()) {
      this.auth.isUserLoggedIn.next(true);
    }
  }


  ngOnInit() {
    this.getCartProduct();
  }

  getCartProduct() {

    this.productService.getCartProduct(this.auth.getUserDetails()._id).subscribe(data => {
      data.map(x => {
        this.productService.getProduct(x).subscribe(
          data => {
            this.quantity.push(1);
              this.products.push(data);
          }
        )
      })
    });
  }

  createOrder() {
    this.order.buyerID = this.auth.getUserDetails()._id;
    this.products.map((x, index) => {
      this.order.products.push({
        productID: x._id,
        quantity: this.quantity[index],
        cost: this.quantity[index] * x.cost
      })
    });
    let today = new Date();
    this.order.date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear().toString();
    this.order.totalCost = this.getTotalCost();

    // this.productService.addOrder(this.order).subscribe();
    // this.products.map(x=>this.removeProductFormCart(x._id));
    this.router.navigate(['/checkout',this.order]);


  }

  getTotalCost() {
    let cost: number = 0;
    for (let i = 0; i < this.products.length; i++) {
      cost = cost + this.products[i].cost * this.quantity[i];
    }
    return cost;
  }

  varyQuantity(index: number, type: string, product: Product) {

    if (type === "inc") {
      this.quantity[index]++;
    }
    else if (type == "dec") {
      this.quantity[index]--;
    }

    if (this.quantity[index] == 0) {
      this.removeProductFormCart(this.products[index]._id);
      this.products = this.products.filter(x => x != product);
      this.quantity = this.quantity.filter(x => x > 0);
    }
  }

  removeProductFormCart(productID:string) {
    let cartProduct:CartProduct={
      productID:productID
    }
    this.productService.deleteCartProduct(cartProduct, this.auth.getUserDetails()._id).subscribe();
  }

}
