import { Component, OnInit, ViewChild } from '@angular/core';
import { Photo } from 'src/app/models/Photo';
import { FileUploader } from 'ng2-file-upload';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-photo-add',
  templateUrl: './photo-add.component.html',
  styleUrls: ['./photo-add.component.css']
})
export class PhotoAddComponent implements OnInit {
  @ViewChild("fileInput") fileInput;
  constructor(   private activatedRoute: ActivatedRoute,private projectService:ProjectService,private router: Router) { }
  PhotoList:any[]=[];
  photos: Photo;
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  currentProject:any;
  base64textString:string;
  urls:any = [];

  ngOnInit() {
    this.activatedRoute.params.subscribe(params=>{
      this.currentProject=params["id"];
    })
    this.initializeUploader();
  }
  onUploadFinished(event){   
    console.log(event);
      this.PhotoList.push(event);
  }
  onRemoved(event){
    console.log(event);
  }
  onFilterChange(event){
    console.log(event);
  }
  
  initializeUploader() {
    this.uploader = new FileUploader({
      isHTML5: true,
      allowedFileType: ['image'],
      autoUpload: false,
      removeAfterUpload: true,
      maxFileSize: 10 * 1024 * 1024
    });
  }
  onSelectFile(event) {
    console.log(event);
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = (event) => {
                    this.postData(event.target["result"])
                }

                reader.readAsDataURL(event.target.files[i]);
        }
      this.router.navigateByUrl("/projectDetail/"+this.currentProject);

    }
  }
postData(url){
var photo:Photo={
  url:url,
  projectId:this.currentProject
}
console.log(photo);
this.projectService.addPhoto(photo);

}
//   handleFileSelect(evt){
//     console.log(evt);
//     var files = evt.target.files;
//     var file = files[0];
//   if (files && file) {
//       var reader = new FileReader();
//       reader.onload =this._handleReaderLoaded.bind(this);
//       reader.readAsBinaryString(file);
//   }
// }
// _handleReaderLoaded(readerEvt) {
//    var binaryString = readerEvt.target.result;
//           this.base64textString= btoa(binaryString);
//           console.log(btoa(binaryString));
//   }

}
