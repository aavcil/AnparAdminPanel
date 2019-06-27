import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from './alertify.service';
import { Router } from '@angular/router';
import { apiUrl } from '../global';
import { TechnicalInfos } from '../models/TechnicalInfos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TechnicalInfoService {

  constructor(private HttpClient: HttpClient, private alertifyService: AlertifyService, private router: Router) { }

  path = apiUrl;
  getInfos(): Observable<TechnicalInfos[]> {
    return this.HttpClient.get<TechnicalInfos[]>(this.path + "TechnicalInfo");
  }

  addInfos(info) {
    this.HttpClient.post(this.path + "TechnicalInfo", info);
    this.alertifyService.success("Teknik Bilgi Başarıyla Eklendi.");

  }
  deleteInfo(id){
    return this.HttpClient.delete(this.path + "Product?id="+id);
    }
}
  