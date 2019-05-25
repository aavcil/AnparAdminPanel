import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Projects } from '../models/Projects';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor(private projectService:ProjectService) { }

projects:Projects[];
  ngOnInit() {

    this.projectService.getProjects().subscribe(x=>{
this.projects=x;
console.log(this.projects);
    });

  }

}
