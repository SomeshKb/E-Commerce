import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Product, Order, CartProduct } from '../model/product';
import { UserDetails } from '../model/User';
import { facet } from '../model/Facet';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public currentProduct: Subject<Product[]> = new Subject<Product[]>();

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

  getFilterProduct(type: string) {
    const url: string = this.productUrl + '/filter/' + type;
    return this.http.get<Product[]>(url);
  }

  getProductByGender(type: string) {
    const url: string = this.productUrl + '/nav/search/' + type;
    return this.http.get<Product[]>(url);

  }



  getProductTypes(type: string) {
    const url: string = this.productUrl + '/distinct/' + type;
    return this.http.get<string[]>(url);
  }

  getSearchResult(searchString: string): Observable<Product[]> {
    if (searchString != '') {
      const url: string = this.productUrl + '/search/' + searchString;
      return this.http.get<Product[]>(url);
    }
    else {
      return this.getProducts();
    }
  }

  // CART Functions

  addCartProduct(productID: CartProduct, userID: string) {

    const url = this.productUrl + '/cart/update/' + userID;
    return this.http.put(url, productID);
  }

  getCartProduct(userID: string): Observable<string[]> {
    const url = this.productUrl + '/cart/get/' + userID;
    return this.http.get<string[]>(url);
  }

  deleteCartProduct(cartProduct: CartProduct, userID: string) {
    const url = this.productUrl + '/cart/delete/' + userID;
    return this.http.put(url, cartProduct);
  }


  //facets
  getFacetsValue(): Observable<facet[]> {
    const url: string = this.productUrl + '/facets/all';
    return this.http.get<facet[]>(url);
  }

  //Order Functions

  addOrder(order: Order) {
    const url = this.productUrl + '/order';
    return this.http.post(url, order);
  }

  getOrderDetail(orderID: string): Observable<Order> {
    const url = this.productUrl + '/order/' + orderID;
    return this.http.get<Order>(url);
  }

  getOrderIDforUser(userID: string): Observable<string[]> {
    const url = this.productUrl + '/user/order/' + userID;
    return this.http.get<string[]>(url);
  }

// needed to be formatted and to redesigned for sending json data
  getProductByParams(queryArray) {
    queryArray = (JSON.parse(JSON.stringify(queryArray)));
    let param = new HttpParams();
    param = param.append('facets', queryArray.join(', '));
    console.log(param)
    const url = this.productUrl + '/filter/all';
    return this.http.get(url, { params: param });
  }




}