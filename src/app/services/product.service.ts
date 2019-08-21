import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from './alertify.service';
import { Router } from '@angular/router';
import { apiUrl } from '../global';
import { Product } from '../models/Product';
import { Observable } from 'rxjs';
import { Photo } from '../models/Photo';
import { Categories } from '../models/Categories';
import { Projects } from '../models/Projects';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private HttpClient: HttpClient, private alertifyService: AlertifyService, private router: Router) { }

  path = apiUrl;
  getProducts(): Observable<Product[]> {

    return this.HttpClient.get<Product[]>(this.path + "Product");

  }
  getProductById(productId): Observable<Product> {
    return this.HttpClient.get<Product>(this.path + "Product/getProductsById?id=" + productId);
  }
  getProductByTitle(id): Observable<Product[]> {
    return this.HttpClient.get<Product[]>(this.path + "Product/getProductsByTitle?titleId=" + id);
  }
  getProductByTrush(): Observable<Product[]> {
    return this.HttpClient.get<Product[]>(this.path + "Product/getTrashProduct");
  }
  moveTrashOrMain(productId): Observable<Product> {
    return this.HttpClient.get<Product>(this.path + "Product/MoveTrashOrMain/" + productId);
  }
  getCategories(): Observable<Categories[]> {
    return this.HttpClient.get<Categories[]>(this.path + "Product/getCategories");
  }

  getCategoriesByTitle(id): Observable<Categories[]> {
    return this.HttpClient.get<Categories[]>(this.path + "Product/getCategoriesByTitle?titleId=" + id);
  }

  add(product) {
    this.HttpClient.post(this.path + "Product", product).subscribe(data => {
      this.alertifyService.success("Ürün Başarıyla Eklendi.");
      this.router.navigateByUrl("/product");

    });
  }
  addCategory(category) {
    this.HttpClient.post(this.path + "Product/addCategory", category).subscribe(data => {
      this.alertifyService.success("Kategori Başarıyla Eklendi.");
      this.router.navigateByUrl("/product");
    });
  }
  deleteCategory(id) {
    return this.HttpClient.delete(this.path + "Product/deleteCategory?id=" + id);
  }
  deleteProduct(id) {
    return this.HttpClient.delete(this.path + "Product?id=" + id);
  }
}
