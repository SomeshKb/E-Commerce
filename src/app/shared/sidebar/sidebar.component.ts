import { Component, OnInit } from '@angular/core';
import { Item } from '../../model/Item';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  items: Data[]=[new Data("Tshirt")];
  isOpen: Boolean[]= [false,false,false];

  constructor() { 
    
    this.items.push(new Data("TShirt"))
    this.items.push(new Data("Tshirt"))
    this.items.push(new Data("Tshirt"))
  }
ngOnInit() {

}

open(index){
  this.isOpen[index]=!this.isOpen[index];
}

}

class Data{
  name:string;
 constructor(val){
   this.name=val;
 }
}
