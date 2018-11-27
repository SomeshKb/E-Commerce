import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/products.service';
import { facet, facetsParams } from '../../model/Facet';
import { Params } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {


  isOpen: Boolean[] = [];
  facetValues: facet[];
  params:facetsParams[]=[];

  constructor(private productService: ProductService) {
  }
  ngOnInit() {
    this.productService.getFacetsValue()
      .subscribe(res => {
        this.facetValues = res
        console.log(res)
        res.map(x => {
          this.isOpen.push(false);
        })
      });
  }

  open(value) {
    this.isOpen[value] = !this.isOpen[value];
  }

  toggleEditable(event, item, value) {

    if (event.target.checked) {
      this.params.push(new facetsParams(item,value));
    } else if (event.target.unchecked) {

    }
  }

  getFilteredResult(){
    console.log(this.params)
    this.productService.getProductByParams(this.params).subscribe(x=>{
      console.log(x)
    })
  }

}


