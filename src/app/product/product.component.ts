import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/Product';
import { apiUrlImages } from '../global';
import { parse } from 'url';
import { AlertifyService } from '../services/alertify.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService, private alertify: AlertifyService) { }

  // products: Product[];
  // in: Product[];
  // out: Product[];
  // others: Product[];
  public products: BehaviorSubject<Product[]> = new BehaviorSubject(null);
  public in: BehaviorSubject<Product[]> = new BehaviorSubject(null);
  public out: BehaviorSubject<Product[]> = new BehaviorSubject(null);
  public others: BehaviorSubject<Product[]> = new BehaviorSubject(null);

  url: String = apiUrlImages;

  ngOnInit() {
    this.getProducts();
    
  }
  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(x => {
      if (x) {
        this.alertify.success("Silme İşlemi Başarılı");
        this.getProducts();
      }
    });
  }

  getProducts(){
    this.productService.getProducts().subscribe(x => { this.products.next(x); });
    this.productService.getProductByTitle(1).subscribe(a => { this.in.next(a); });
    this.productService.getProductByTitle(3).subscribe(a => { this.out.next(a); });
    this.productService.getProductByTitle(2).subscribe(a => { this.others.next(a); });
  }
}
