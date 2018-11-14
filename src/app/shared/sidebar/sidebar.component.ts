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

open(value){
  this.isOpen.map((result,index)=>{
    if(index==value){
    this.isOpen[value]=!this.isOpen[value];
  }
  else{
    this.isOpen[index]=false;
  }})

}

}

class Data{
  name:string;
 constructor(val){
   this.name=val;
 }
}
