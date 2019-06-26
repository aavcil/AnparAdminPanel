import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Product } from 'src/app/models/Product';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { ProductAdd } from 'src/app/models/ProductAdd';
import { Categories } from 'src/app/models/Categories';


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  @ViewChild("fileInput") fileInput;
  constructor(private productService: ProductService, private formBuilder: FormBuilder, private authService: AuthService) { }
  product: ProductAdd;
  categoriesIn: Categories[];
  categoriesOther: Categories[];
  categoriesOut: Categories[];  
  productAddForm: FormGroup;
  fileToUpload: File;
  base64textString:string;
  ngOnInit() {
    this.createProductForm();
    this.productService.getCategoriesByTitle(1).subscribe(x=>{this.categoriesIn=x});
    this.productService.getCategoriesByTitle(2).subscribe(x=>{this.categoriesOther=x});    
    this.productService.getCategoriesByTitle(3).subscribe(x=>{this.categoriesOut=x});
  }

  createProductForm() {
    this.productAddForm = this.formBuilder.group(
      {
        title: ["", Validators.required],
        productImage: ["", Validators.required],
        measure: ["", Validators.required],
        categoryId: ["", Validators.required],
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

  addProduct(id) {
    if (this.productAddForm.valid) {
      this.product = Object.assign({}, this.productAddForm.value);
      this.product.titleId=id;
      this.product.productImage=this.base64textString;
      this.productService.add(this.product);
    }

  }

}
