import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { TechnicalInfosAdd, TechnicalInfos } from '../models/TechnicalInfos';
import { TechnicalInfoService } from '../services/TechnicalInfo.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-TechnicalInfo',
  templateUrl: './TechnicalInfo.component.html',
  styleUrls: ['./TechnicalInfo.component.css']
})
export class TechnicalInfoComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private info:TechnicalInfoService) { }
  technicalInfoAddForm: FormGroup;
  Info:TechnicalInfosAdd;
  Infos:BehaviorSubject<TechnicalInfos[]>=new BehaviorSubject(null);
  base64textString:string;
  ngOnInit() {
    this.createInfoForm();
    this.getInfos();
  }

  getInfos(){
    this.info.getInfos().subscribe(x=>{
      this.Infos.next(x);
    })
  }

  createInfoForm() {
    this.technicalInfoAddForm = this.formBuilder.group(
      {
        title: ["", Validators.required],
        infoImage: ["", Validators.required],
        description: ["", Validators.required],
      });
  }
  handleFileSelect(evt){
    var files = evt.target.files;
    var file = files[0];
  if (files && file) {
      var reader = new FileReader();
      reader.onload =this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
  }
}
_handleReaderLoaded(readerEvt) {
   var binaryString = readerEvt.target.result;
          this.base64textString= btoa(binaryString);
          console.log(btoa(binaryString));
  }
  

  addInfo(){
    if (this.technicalInfoAddForm.valid) {
      this.Info = Object.assign({}, this.technicalInfoAddForm.value);
      this.Info.url=this.base64textString;
      this.info.addInfos(this.Info);
      this.getInfos();
    }
  }
  deleteInfo(id:number){

  }
}
