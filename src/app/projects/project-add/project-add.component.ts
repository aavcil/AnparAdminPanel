import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectAdd } from 'src/app/models/ProjectAdd';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent implements OnInit {

  constructor(private projectService:ProjectService,private formBuilder: FormBuilder) { }
  projectAddForm: FormGroup;
  project:ProjectAdd;
  ngOnInit() {
    this.createProjectForm();

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

  add(){
    if(this.projectAddForm.valid){
      this.project=Object.assign({},this.projectAddForm.value);
      //Todo
     this.projectService.add(this.project);
    }
    
  }
}
