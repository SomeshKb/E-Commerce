import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'E-Commerce';
  sidebarActive=true;

  // constructor(router:Router) {
  //   router.events.forEach((event) => {
  //       if(event instanceof NavigationStart) {
  //         console.log(event.url)
  //           this.sidebarActive = event.url == "/products?gender=Male";
  //           this.sidebarActive = event.url == "/product/:id";
  //       }
  //     });
  //   }
    

}
