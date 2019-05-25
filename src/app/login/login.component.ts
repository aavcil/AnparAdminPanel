import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';
import{JwtHelperService} from '@auth0/angular-jwt';
import { isNull } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService,private route:Router,private alerty: AlertifyService, ) { }
  loginUser: any = {};

  ngOnInit() {
    if (this.authService.loggedIn()) {
      this.route.navigateByUrl('/product');
    }
  }
  login() {
    this.authService.login(this.loginUser);  
  }
  logOut() {
    this.authService.logOut();
  }
  get isAuthenticated() {
    return this.authService.loggedIn();
  }

}
