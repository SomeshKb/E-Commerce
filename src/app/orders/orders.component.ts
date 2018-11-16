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
  product: Product[] = [];

  constructor(private productService: ProductService, private auth: AuthenticationService) { }
  ngOnInit() {
    this.productService.getOrderIDforUser(this.auth.getUserDetails()._id).subscribe(data => {
      data.map(x => {

        this.productService.getOrderDetail(x).subscribe(order => {
          console.log(order)

          order.products.map(x =>{

            this.productService.getProduct(x.productID).subscribe(x =>{
 
              this.product.push(x)
              })
            })
        })
      })
    })

  }

}
