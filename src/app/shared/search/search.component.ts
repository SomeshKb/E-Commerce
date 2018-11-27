import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ProductService } from '../../services/products.service';
import { debounceTime, switchMap, distinctUntilChanged, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchField: FormControl;
  searchList: FormControl;

  coolForm: FormGroup;
  result: any[];
  constructor(private productService: ProductService, private fb: FormBuilder,private router:Router) {
    this.searchField = new FormControl();
    this.coolForm = fb.group({ search: this.searchField }, { searchList: this.searchList });


    this.searchField.valueChanges
      .pipe(
        debounceTime(400)
        , switchMap((term) => this.productService.getSearchResult(term)))
      .subscribe((result) => {
        this.productService.currentProduct.next(result);
      },
        (err) => {
          if (err.status === 404) {
            this.productService.getProducts().subscribe(res => {
              this.result = res;
              this.productService.currentProduct.next(res);
            });
          }
        });
  }

  ngOnInit() {

  }
}