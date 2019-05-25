import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (private route: Router, private logservice: AuthService, private alertify: AlertifyService) {}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.logservice.loggedIn()) {
    return true;
  }
  this.route.navigate(['/login']);
  return false;
  }
}
