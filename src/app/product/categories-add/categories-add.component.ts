import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Categories } from 'src/app/models/Categories';
import { ProductService } from 'src/app/services/product.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { BehaviorSubject } from 'rxjs';



@Component({
  selector: 'app-categories-add',
  templateUrl: './categories-add.component.html',
  styleUrls: ['./categories-add.component.css']
})
export class CategoriesAddComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private productService: ProductService, private alertify: AlertifyService) { }
  category: Categories
  categoriesAddForm: FormGroup;

  // categories: Categories[];
  // in: Categories[];
  // out: Categories[];
  // others: Categories[];
  public categories:BehaviorSubject<Categories[]>=new BehaviorSubject(null);
  public in:BehaviorSubject<Categories[]>=new BehaviorSubject(null);
  public out:BehaviorSubject<Categories[]>=new BehaviorSubject(null);
  public others:BehaviorSubject<Categories[]>=new BehaviorSubject(null);



  ngOnInit() {
    this.createCategoryForm();
    this.getCategories();

  }
  createCategoryForm() {
    this.categoriesAddForm = this.formBuilder.group(
      {
        categoryName: ["", Validators.required],
        titleId: ["", Validators.required],
      });
  }
  addCategory() {
    if (this.categoriesAddForm.valid) {
      this.category = Object.assign({}, this.categoriesAddForm.value);
      this.productService.addCategory(this.category);
      this.getCategories();
    }
  }

  getCategories(){
    this.productService.getCategories().subscribe(x => { this.categories.next(x); });
    this.productService.getCategoriesByTitle(0).subscribe(a => { this.in.next(a); });
    this.productService.getCategoriesByTitle(1).subscribe(a => { this.out.next(a); });
    this.productService.getCategoriesByTitle(2).subscribe(a => { this.others.next(a); });
  }
  delete(id) {
    this.productService.deleteCategory(id).subscribe(x => {
      if (x) {
        this.alertify.success("Kategori Silme İşlemi Başarılı.");
        this.getCategories();
      }
      else {
        this.alertify.error("Kategori Silme İşlemi Başarısız.");

      }
    });
  }



}


