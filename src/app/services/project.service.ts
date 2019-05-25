import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from './alertify.service';
import { Router } from '@angular/router';
import { apiUrl } from '../global';
import { Observable } from 'rxjs';
import { Projects } from '../models/Projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private HttpClient: HttpClient, private alertifyService: AlertifyService, private router: Router) { }

  path = apiUrl;
  getProjects(): Observable<Projects[]> {
    return this.HttpClient.get<Projects[]>(this.path + "Project");
  }
  getProjectById(id): Observable<Projects> {
    return this.HttpClient.get<Projects>(this.path + "Project/getProjectsById?id=" + id);
  }

  add(project) {
    this.HttpClient.post(this.path + "Project", project).subscribe(data => {
      this.alertifyService.success("Ürün Başarıyla Eklendi.");
      this.router.navigateByUrl("/addPhoto/"+ data["id"]);
    });
  }

  addPhoto(photo) {
    this.HttpClient.post(this.path + "Project/AddPhoto", photo).subscribe(data => {
      this.alertifyService.success("Resimler Başarıyla Eklendi.");
    });
  }
}
