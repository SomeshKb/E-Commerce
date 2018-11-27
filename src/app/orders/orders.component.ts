import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/products.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Order, Product } from '../model/Product';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[] = [];
  products: Product[][] = [];

  constructor(private productService: ProductService, private auth: AuthenticationService) {
    if (auth.isLoggedIn()) {
      auth.isUserLoggedIn.next(true);
    }
  }
  ngOnInit() {

    this.productService.getOrderIDforUser(this.auth.getUserDetails()._id).subscribe(orderID => {
      orderID.map((id, orderNo) => {
        this.products[orderNo] = [];
        this.productService.getOrderDetail(id).subscribe(order => {
          console.log(order)
          console.log(orderNo)
        this.orders.push(order);

          order.products.map((product,productNo) => {

            this.productService.getProduct(product.productID).subscribe(res => {
              console.log(product)
              console.log(productNo)
              this.products[orderNo][productNo]=res;
            })
          })
        })

      })
    })









    // this.productService.getOrderIDforUser(this.auth.getUserDetails()._id).subscribe(data => {
    //   data.map(x => {
    //     this.productService.getOrderDetail(x).subscribe(order => {
    //       this.orders.push(order);
    //       order.products.map((x, index) => {
    //         this.productService.getProduct(x.productID).subscribe(data => {
    //           if (this.products[index] == undefined) {
    //             this.products[index] = [];
    //           }
    //           this.products[index].push(data);
    //           console.log(this.products)
    //         console.log(this.products[0])
    //         })
    //       })
    //     })
    //   })
    // })

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