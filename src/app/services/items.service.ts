import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../model/item';
import { UserDetails } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private itemUrl = 'api/item';


  constructor(private http: HttpClient) { }


  //  GET items from the server
  getItems(): Observable<Item[]> {
    const url: string = this.itemUrl + '/all';
    return this.http.get<Item[]>(url);
  }

  // GET item using id from server
  getItem(id: string): Observable<Item> {
    const url = `${this.itemUrl}/${id}`;
    return this.http.get<Item>(url);
  }

  // UPDATE like of a item 
  updateLike(updateItem: Item, user: UserDetails) {
    const url = this.itemUrl + '/update/likes/' + updateItem._id;
    return this.http.put(url, user);
  }

  // CREATE item
  createItem(item: Item) {
    const url = this.itemUrl + '/create';
    return this.http.post(url, item);
  }

  // DELETE Item from Server
  removeItem(item: Item) {
    const url = this.itemUrl + '/remove/' + item._id;
    return this.http.delete(url);
  }

  updateItem(item: Item) {
    const url = this.itemUrl + '/update/' + item._id;
    return this.http.put(url, item);
  }

}
