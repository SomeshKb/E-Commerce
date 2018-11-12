import { Component, OnInit } from '@angular/core';
import { TokenPayload, UserDetails } from '../model/user';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  emailRegex = /^(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6}$/;
  showSucessMessage: boolean;
  serverErrorMessages: string;
  credentials: TokenPayload = {
    email: '',
    password: ''
  };
  user: UserDetails;

  constructor(private auth: AuthenticationService, private router: Router, private alertService: AlertService) { }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/blogs');

    }
  }

  onSubmit(form: NgForm) {
    this.login();
  }

  login() {

    this.auth.login(this.credentials).subscribe(() => {
      this.auth.isUserLoggedIn.next(true);
      this.router.navigateByUrl('/blogs');
    }, (err) => {
      if (err.status === 401) {
        this.alertService.addAlertToast('Invalid Credentials');

      }
    });
  }


  resetForm(form: NgForm) {
    this.credentials = {
      'email': "",
      'password': ""
    };
  }

  getDetails() {
    this.user = this.auth.getUserDetails();
  }

}
