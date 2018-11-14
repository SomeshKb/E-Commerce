import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Product } from '../model/product';
import { UserDetails } from '../model/User';

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

  addToCart(product:Product[],userID:string){
    const url = this.productUrl +'/addCart/'+userID;
    return this.http.put(url,product);
  }

  getCart(product:Product[],userID:string){
    const url = this.productUrl +'/getCart/'+userID;
    return this.http.get(url);
  }

  saveToCartLocal(product:Product){

  }


   saveCartToken(token: string): void {
    localStorage.setItem('cart-token', token);
    this.cartToken = token;
  }

   getCartToken(): string {
    if (!this.cartToken) {
      this.cartToken = localStorage.getItem('cart-token');
    }
    return this.cartToken;
  }



}
