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

  constructor(private _productService: ProductService, private _alertifyService: AlertifyService) { }

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
  goTrash(id){
    this._productService.moveTrashOrMain(id).subscribe(x=>{
      if(x!=null)
      {
        this._alertifyService.success("Çöp Kutusuna Gönderildi.")
      }else{
        this._alertifyService.error("Çöp Kutusuna Gönderilemedi.")
      }
    this.getProducts();
    });
     
  }


  getProducts(){
    this._productService.getProducts().subscribe(x => { this.products.next(x); });
    this._productService.getProductByTitle(1).subscribe(a => { this.in.next(a); });
    this._productService.getProductByTitle(3).subscribe(a => { this.out.next(a); });
    this._productService.getProductByTitle(2).subscribe(a => { this.others.next(a); });
  }
}
