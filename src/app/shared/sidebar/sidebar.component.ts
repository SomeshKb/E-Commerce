import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/products.service';
import { facet, queryFacets } from '../../model/Facet';
import {  Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isSidebarMenuOpen: Boolean[] = [];
  facetValues: facet[];
  queryParams: queryFacets = {
    gender: [],
    sleeveLength: [],
    color: [],
    neck: [],
    size: [],
  }

  constructor(private productService: ProductService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.productService.getFacetsValue()
      .subscribe(res => {
        this.facetValues = res
        res.map(x => {
          this.isSidebarMenuOpen.push(false);
        })
      });

    this.activatedRoute.queryParams.subscribe(params => {
      if (params.gender) {
        this.queryParams.gender.forEach(element => {
          this.queryParams.gender.pop();
        });
        this.queryParams.gender.push(params.gender);
      }});
  }

  openSidebarMenu(value) {
    this.isSidebarMenuOpen[value] = !this.isSidebarMenuOpen[value];
  }

  toggleEditable(event, item, value) {

    if (event.target.checked) {
      switch (item) {
        // case 'gender': this.queryParams.gender.push(value); break;
        case 'sleeveLength': this.queryParams.sleeveLength.push(value); break;
        case 'color': this.queryParams.color.push(value); break;
        case 'neck': this.queryParams.neck.push(value); break;
        case 'size': this.queryParams.size.push(value); break;
      }
    }
    else {
      switch (item) {
        // case 'gender': this.queryParams.gender = this.removeElement(this.queryParams.gender, value); break;
        case 'sleeveLength': this.queryParams.sleeveLength = this.removeElement(this.queryParams.sleeveLength, value); break;
        case 'color': this.queryParams.color = this.removeElement(this.queryParams.color, value); break;
        case 'neck': this.queryParams.neck = this.removeElement(this.queryParams.neck, value); break;
        case 'size': this.queryParams.size = this.removeElement(this.queryParams.size, value); break;
      }
    }
  }

  getFilteredResult() {
    // console.log(this.queryParams)
    this.productService.getProductByParams(this.queryParams).subscribe(product => {
      this.productService.currentProduct.next(product);
      // console.log(product)
      this.router.navigate(['/products'], { queryParams: this.queryParams });
    })
  }

  removeElement(array: string[], value: string): string[] {
    let result = []
    if (array.length < 1) {
      return result;
    }
    else {
      result = array.filter(res => {
        return res != value
      })
    }
    return result;

  }

}


