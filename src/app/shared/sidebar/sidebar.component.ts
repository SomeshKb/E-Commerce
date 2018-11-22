import { Component, OnInit } from '@angular/core';
import { Product, queryProduct } from '../../model/Product';
import { ProductService } from '../../services/products.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { query } from '@angular/core/src/render3/query';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {


  products: string[] = [];
  facetVariable: string[] = ['gender', 'sleeveLength', 'color', 'neck', 'size']
  isOpen: Boolean[] = [false, false, false, false, false];
  contentEditable;
  facetType: string[][] = [];

  checkedFacet: boolean[][] = [];
  queryString: string[] = [];


  constructor(private productService: ProductService) {
  }
  ngOnInit() {
    this.getDistinctValuesForFacets(this.facetVariable, this.facetType);
  }

  open(value) {
    this.isOpen.map(() => {
      this.isOpen[value] = !this.isOpen[value];
    })
  }

  getDistinctValuesForFacets(types: string[], values: string[][]): void {
    types.map((x) => this.productService.getProductTypes(x).subscribe(result => {
      values.push(result);
    })
    )
  }

  getFilteredResult(gender:string) {

    this.productService.getFilterProduct(gender).subscribe((result) => {
      this.productService.currentProduct.next(result);
    })
  }

  toggleEditable(event, selectedFacet: string, selectedItem: string) {

    if(event.target.checked){
      console.log(7)
    }
    // if (event.target.checked) {

    //   if(item)

    //   // this.queryString.push(selectedFacet +'='  + selectedItem)
    // } else if (event.target.unchecked) {

    //   // this.queryString.push(selectedFacet + '=' + selectedItem)

    // }
  }

}


