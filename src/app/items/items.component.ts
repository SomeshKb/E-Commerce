import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/items.service';
import { Item } from '../model/Item';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items:Item[];

  constructor(private itemService: ItemService,private auth: AuthenticationService) { 
    if (auth.isLoggedIn()) {
      this.auth.isUserLoggedIn.next(true);
    }
  }

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
