import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/products.service';
import { Route, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private productService:ProductService,private router:Router) { }

  ngOnInit() {
  }


  navClickded(value:string){

    this.productService.getNavProduct(value).subscribe(res=>{
      this.productService.currentProduct.next(res);
      let params={
        gender:value
      }
        this.router.navigate(['/products',params])
      })
  }

}
