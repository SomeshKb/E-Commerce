import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { Blog } from '../model/blog';
// import { UserDetails } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }

  // GET User's total likes
  getUserLikesCount(userID: string): Observable<string> {
    const url = "api/user/likes/" + userID;
    return this.http.get<string>(url);
  }

  // GET Author's Name
  getAuthorName(userID: string): Observable<string> {
    const url = "api/authorName/" + userID;
    return this.http.get<string>(url);
  }

  // GET User's Blog
  getUserBlogs(userID: string): Observable<Blog[]> {
    const url = "api/user/blog/" + userID;
    return this.http.get<Blog[]>(url);
  }

  // GET Author's Details
  getAuthorDetails(userID: string): Observable<UserDetails> {
    const url = "api/authorName/" + userID;
    return this.http.get<UserDetails>(url);
  }

}
