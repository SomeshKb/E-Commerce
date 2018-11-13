import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserDetails } from '../../model/User';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: UserDetails;
  isUserLoggedIn: boolean;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.isUserLoggedIn.subscribe(value => {
      this.user = this.authenticationService.getUserDetails();
      this.isUserLoggedIn = value;

    });
  }

  ngOnInit() {

  }


  logoutUser() {
    this.authenticationService.isUserLoggedIn.next(false);
    this.authenticationService.logout();

  }

}
