import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/products.service';
import { facet } from '../../model/Facet';
import { Params } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isOpen: Boolean[] = [];
  facetValues: facet[];
  facetParams: facet={
    _id:'',
    type:'',
    value:[]
  }

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
      if(this.facetParams.type==item){
          this.facetParams.value.push(value);
      }
      else{
        this.facetParams={
          "_id":'1',
          "type":item,
          "value":[value]
        }
      }
           
        console.log(this.facetParams)

    } else if(event.target.unchecked) {
            console.log("::");
            // this.facetParams.value.filter(x=>{console.log(x)})
    }
  }

  getFilteredResult(){
    this.productService.getProductByParams(this.facetParams).subscribe(x=>{
      console.log(x)
    })
  }

}


