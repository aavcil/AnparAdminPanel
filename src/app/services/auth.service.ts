import { Injectable } from "@angular/core";
import { LoginUser } from "../models/loginUser";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { JwtHelper, tokenNotExpired } from "angular2-jwt";
import { Router } from "@angular/router";
import { AlertifyService } from "./alertify.service";
import { apiUrl } from "../global";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private alertifyService: AlertifyService
  ) { }
  path = apiUrl;
  userToken: any;
  decodedToken: any;
  jwtHelper: JwtHelper = new JwtHelper();
  TOKEN_KEY = "token" 

  login(loginUser: LoginUser) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    this.httpClient.post(this.path + "Auth/login", loginUser, { headers: headers })
      .subscribe(data => {
        console.log(data);
        this.alertifyService.success('Giriş Başarılı');
        this.router.navigateByUrl("/product");
        this.saveToken(data["tokenString"]);
        this.userToken = data["tokenString"];    
      });
  }
  saveToken(token) {

    localStorage.setItem(this.TOKEN_KEY, token);
  }

  logOut() {
    localStorage.removeItem(this.TOKEN_KEY)
    this.alertifyService.error("Sistemden çıkış yapıldı.");
    this.router.navigateByUrl("/login");
    return true;
  }

  loggedIn() {
    return tokenNotExpired(this.TOKEN_KEY);
  }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }


  getCurrentUserId() {
    return this.jwtHelper.decodeToken(this.token).nameid;
  }

}
