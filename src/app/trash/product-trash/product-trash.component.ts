import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-product-trash',
  templateUrl: './product-trash.component.html',
  styleUrls: ['./product-trash.component.css']
})
export class ProductTrashComponent implements OnInit {

  constructor(private _productService:ProductService,private _alertifyService:AlertifyService) { }
  public products: BehaviorSubject<Product[]> = new BehaviorSubject(null);

  ngOnInit() {
    this.getTrashProduct();
  }

  getTrashProduct(){
    this._productService.getProductByTrush().subscribe(x=>{
      this.products.next(x);
    });
  }

  getBack(id){
    this._productService.moveTrashOrMain(id).subscribe(x=>{
      if(x!=null)
      {
        this._alertifyService.success("Ürünlere Gönderildi")
      }else{
        this._alertifyService.error("Ürünlere Gönderilemedi.")
      }
    this.getTrashProduct();

    });
  }

  deleteProduct(id: number) {
    this._productService.deleteProduct(id).subscribe(x => {
      if (x) {
        this._alertifyService.success("Silme İşlemi Başarılı");
        this.getTrashProduct();
      }
    });
  }

}
