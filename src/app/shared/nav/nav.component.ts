import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
  }


  navItemClickded(value: string) {
    this.productService.getProductByGender(value).subscribe(res => {
      this.productService.currentProduct.next(res);
      this.router.navigate(['/products'], { queryParams: { gender: value } });
    })
  }

}
