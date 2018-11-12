import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/items.service';
import { Item } from '../model/Item';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items:Item[];

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.getAllItems();
  }

  getAllItems(){
      this.itemService.getItems().subscribe((result)=>{
        this.items=result;
        console.log(result);
      })
  }
}
