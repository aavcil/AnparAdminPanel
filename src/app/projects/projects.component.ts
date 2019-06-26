import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Projects } from '../models/Projects';
import { AlertifyService } from '../services/alertify.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor(private projectService: ProjectService, private alertify: AlertifyService) { }

  public projects:BehaviorSubject<Projects[]>=new BehaviorSubject(null);
  ngOnInit() {
    this.getProject();
  }

  getProject() {
    this.projectService.getProjects().subscribe(x => {
      this.projects.next(x);
    });
  }

  deleteProject(id: number) {
    this.projectService.deleteProject(id).subscribe(x => {
      if (x) {
        this.alertify.success("Silme işlemi başarılı.");
        this.getProject();
      }
      else {
        this.alertify.error("Silme işleminde hata oluştu.");
      }
    });
  }

}
