import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/items.service';
import { Item } from '../model/Item';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  item:Item ;
  constructor(private itemService:ItemService,private route:ActivatedRoute,private auth:AuthenticationService) {
      if (auth.isLoggedIn()) {
        this.auth.isUserLoggedIn.next(true);
    }
   }

  ngOnInit() {
    let id: string = this.route.snapshot.paramMap.get('id');
    this.getItemDetails(id);
  }

  getItemDetails(id:string) {
    this.itemService.getItem(id).subscribe(
      (result)=>{
      this.item=result
      })
  }
}
