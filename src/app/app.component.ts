import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as globals from './global';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AdminPanel';
  constructor(private login: AuthService,  private route: Router) {
  }
  loggedIn() {
    return this.login.loggedIn();
  }
  loggedOut() {
    if (this.login.logOut()) {
      this.route.navigateByUrl('/login');
    }
  }

}
