import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/Product';
import {apiUrlImages} from '../global';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService) { }

  products: Product[];
  in: Product[];
  out: Product[];
  others: Product[];
  url:String=apiUrlImages;

  ngOnInit() {
  
    this.productService.getProducts().subscribe(x => {this.products = x;});
    this.productService.getProductByTitle(0).subscribe(a=>{this.in=a});
    this.productService.getProductByTitle(1).subscribe(a=>{this.out=a});
    this.productService.getProductByTitle(2).subscribe(a=>{this.others=a});


 
  }

}
