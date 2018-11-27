import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { Blog } from '../model/blog';
// import { UserDetails } from '../model/User';
import { Order } from '../model/Product';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }

  // // GET User's total likes
  // getUserLikesCount(userID: string): Observable<string> {
  //   const url = "api/user/likes/" + userID;
  //   return this.http.get<string>(url);
  // }

  // GET User's Orders
  getUserOrders(userID: string): Observable<Order[]> {
    const url = "api/user/orders/" + userID;
    return this.http.get<Order[]>(url);
  }

  // GET Author's Details
  getAuthorDetails(userID: string): Observable<String> {
    const url = "api/authorName/" + userID;
    return this.http.get<String>(url);
  }
}
