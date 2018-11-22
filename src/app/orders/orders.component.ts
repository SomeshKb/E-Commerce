import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/products.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Order, Product } from '../model/Product';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[] = [];
  products: Product[][] = [];

  constructor(private productService: ProductService, private auth: AuthenticationService) {

  }
  ngOnInit() {
    this.productService.getOrderIDforUser(this.auth.getUserDetails()._id).subscribe(data => {
      data.map(x => {
        this.productService.getOrderDetail(x).subscribe(order => {
          this.orders.push(order);
          order.products.map((x, index) => {
            this.productService.getProduct(x.productID).subscribe(data => {
              if (this.products[index] == undefined) {
                this.products[index] = [];
              }
              this.products[index].push(data);
              console.log(this.products)
            console.log(this.products[0])
            })
          })
        })
      })
    })

  }

  //   getProductDetails(){
  //     this.orders.map(x=>{
  //         x.products.map((y,index)=>{
  //           this.productService.getProduct(y.productID).subscribe(items =>{
  //                  this.product[index].push(items);
  //                  console.log(this.product[index]);
  //           })
  //         })
  //       })
  // }
}