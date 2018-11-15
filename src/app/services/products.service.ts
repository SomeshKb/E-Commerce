import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Product } from '../model/product';
import { UserDetails } from '../model/User';
import { CartProduct, Order } from '../model/Product';
import { CartComponent } from '../cart/cart.component';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private cartToken: string;

  private productUrl = 'api/product';

  constructor(private http: HttpClient) { }

  //  GET products from the server
  getProducts(): Observable<Product[]> {
    const url: string = this.productUrl + '/all';
    return this.http.get<Product[]>(url);
  }

  // GET product using id from server
  getProduct(id: string): Observable<Product> {
    const url = `${this.productUrl}/${id}`;
    return this.http.get<Product>(url);
  }

  // UPDATE like of a product 
  updateLike(updateProduct: Product, user: UserDetails) {
    const url = this.productUrl + '/update/likes/' + updateProduct._id;
    return this.http.put(url, user);
  }

  // CREATE product
  createProduct(product: Product) {
    const url = this.productUrl + '/create';
    return this.http.post(url, product);
  }

  // DELETE Product from Server
  removeProduct(product: Product) {
    const url = this.productUrl + '/remove/' + product._id;
    return this.http.delete(url);
  }

  updateProduct(product: Product) {
    const url = this.productUrl + '/update/' + product._id;
    return this.http.put(url, product);
  }



  // CART Functions

  addCartProduct(cartProduct: CartProduct, userID: string) {
    const url = this.productUrl + '/cart/update/' + userID;
    return this.http.put(url, cartProduct);
  }

  getCartProduct(userID: string): Observable<CartProduct[]> {
    const url = this.productUrl + '/cart/get/' + userID;
    return this.http.get<CartProduct[]>(url);
  }

  deleteCartProduct(cartProduct: CartProduct, userID: string) {
    const url = this.productUrl + '/cart/delete/' + userID;
    return this.http.put(url, cartProduct);
  }

  //Order Functions

  addOrder(order: Order) {
    const url = this.productUrl + '/order';
    return this.http.put(url, order);
  }

  getOrderDetail(orderID: string) :Observable<Order> {
    const url = this.productUrl + '/order/' + orderID;
    return this.http.get<Order>(url);
  }

  getOrderIDforUser(userID: string):Observable<string> {
    const url = this.productUrl + '/user/order/' + userID;
    return this.http.get<string>(url);
  }

}
