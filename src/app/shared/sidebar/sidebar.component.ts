import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/Product';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  products: Data[]=[new Data("Tshirt")];
  isOpen: Boolean[]= [false,false,false];

  constructor() { 
    
    this.products.push(new Data("TShirt"))
    this.products.push(new Data("Tshirt"))
    this.products.push(new Data("Tshirt"))
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
