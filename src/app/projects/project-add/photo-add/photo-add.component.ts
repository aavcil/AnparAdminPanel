import { Component, OnInit, ViewChild } from '@angular/core';
import { Photo } from 'src/app/models/Photo';
import { FileUploader } from 'ng2-file-upload';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { BehaviorSubject } from 'rxjs';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-photo-add',
  templateUrl: './photo-add.component.html',
  styleUrls: ['./photo-add.component.css']
})
export class PhotoAddComponent implements OnInit {
  @ViewChild("fileInput") fileInput;
  constructor(private activatedRoute: ActivatedRoute, private projectService: ProjectService, private router: Router,private alertifyService:AlertifyService) { }
  PhotoList: any[] = [];
  photos: Photo;
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  currentProject: any;
  base64textString: string;
  urls: any = [];
  radioButtonChecked: any;

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.currentProject = params["id"];
    });
    this.initializeUploader();
  }
  onUploadFinished(event) {
    this.PhotoList.push(event);
    console.log(this.PhotoList);
  }
  onRemoved(event) {
    console.log(event);
    const index = this.PhotoList.indexOf(event, 0);
    if (index > -1)
      this.PhotoList.splice(index, 1);
  }
  onFilterChange(event) {
    this.radioButtonChecked = event;
  }
  allRemoved() {
    this.PhotoList = [];
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
  async onSelectFile() {
    if (this.PhotoList.length > 0) {
      var mainImage = this.PhotoList.find(x => x.file.name == this.radioButtonChecked);
      await this.onRemoved(mainImage);
     await this.PhotoList.forEach(item => {
       this.postData(item.src,false);
      });
      this.postData(mainImage.src,true);
    }
   await this.router.navigateByUrl("/projects"); 
   await this.alertifyService.success("Resim Ekleme İşlemi Başarılı");
   this.PhotoList=[];
  }
  async postData(url,isMain) {
    var photo: Photo = {
      url: url,
      projectId: this.currentProject,
      isMain:isMain
    }
   await this.projectService.addPhoto(photo);
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
