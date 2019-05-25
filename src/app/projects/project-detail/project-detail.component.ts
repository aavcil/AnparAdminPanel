import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute } from '@angular/router';
import { Projects } from 'src/app/models/Projects';
import { Photo } from 'src/app/models/Photo';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { LOCALE_ID } from '@angular/core';
@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css'],
  providers: [ProjectService]

})
export class ProjectDetailComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private projectService: ProjectService) { }
Project:Projects;
photos:Photo[]=[];
galleryOptions: NgxGalleryOptions[];
galleryImages: NgxGalleryImage[];
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.getProjectById(params["id"]);
    });
  }

  getProjectById(id){
    this.projectService.getProjectById(id).subscribe(x=>{
      this.Project=x;
      this.photos=x["photos"];
      this.setGallery();
    });
  }
  getImages() {
    const imageUrl = [];
    console.log(this.photos);
    var keys=Object.keys(this.photos).length;
    for (let i = 0; i < keys; i++) {
      imageUrl.push({
        small:"https://localhost:44386/"+ this.photos[i].url,
        medium:"https://localhost:44386/"+ this.photos[i].url,
        big:"https://localhost:44386/"+ this.photos[i].url,
      });
    }
    return imageUrl;
  }
  
  setGallery() {
    this.galleryOptions = [
      { previewCloseOnClick: true, previewCloseOnEsc: true },
      { breakpoint: 500, width: "300px", height: "300px", thumbnailsColumns: 3 },
      { breakpoint: 300, width: "100%", height: "200px", thumbnailsColumns: 2 }
    ];

    this.galleryImages = this.getImages();
  }
}
