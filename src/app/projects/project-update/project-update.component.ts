import { Component, OnInit } from '@angular/core';
import { Projects } from 'src/app/models/Projects';
import { Photo } from 'src/app/models/Photo';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ProjectAdd } from 'src/app/models/ProjectAdd';

@Component({
  selector: 'app-project-update',
  templateUrl: './project-update.component.html',
  styleUrls: ['./project-update.component.css']
})
export class ProjectUpdateComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private projectService: ProjectService,private formBuilder: FormBuilder) { }
  Project:Projects;
  projectAddForm: FormGroup;
  updateProject:ProjectAdd;
  ngOnInit() {
    this.createProjectForm();
    this.activatedRoute.params.subscribe(params => {
      this.getProjectById(params["id"]);
    });
  }
  getProjectById(id){
    this.projectService.getProjectById(id).subscribe(x=>{
      this.Project=x;
    });
  }

  createProjectForm() {
    this.projectAddForm = this.formBuilder.group(
      {
        title: ["", Validators.required],
        description: ["", Validators.required],
        location: ["", Validators.required],
        finishDate: ["", Validators.required],
        measure: ["", Validators.required],
        projectNevi: ["", Validators.required],
      });
  }

  update(){
    if(this.projectAddForm.valid){
      this.updateProject=Object.assign({},this.projectAddForm.value);
      this.Project.description=this.updateProject.description;
      this.Project.finishDate=this.updateProject.finishDate;
      this.Project.location=this.updateProject.location;
      this.Project.measure=this.updateProject.measure;
      this.Project.projectNevi=this.updateProject.projectNevi;
      this.Project.title=this.updateProject.title;
    }

    this.projectService.updateProject(this.Project);

  }
}
