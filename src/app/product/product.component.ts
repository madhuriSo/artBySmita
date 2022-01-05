import { Component, OnInit } from '@angular/core';
import { Product,ProductU } from '../model/product.model';
import { ProductService } from '../services/product.service';
import { Profile } from '../model/profile.model';
import {  FormGroup, FormControl, NgForm, NgModel } from "@angular/forms";

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products:Array<Product>=[];
  productsDb:Array<Product>=[];
  prodDb:Array<Product>=[];
  constructor(public pService:ProductService) { 

  }

  ngOnInit(): void {
    this.pService.loadProuctInfo().subscribe(result=> {
    this.prodDb=result;
    },()=>{},()=>{
      this.products=this.prodDb;
    });

  }

    viewProducts(){
      this.products=this.prodDb;
      
    }

  addProduct(productForm:NgForm,imageInput:any){
  
    const file: File = imageInput.files[0];
    console.log("addProduct"+productForm.value.name);
    this.pService.addProdImage(productForm.value.name,file);
    this.pService.addProduct(productForm.value.name,
                              productForm.value.price,
                              productForm.value.details);
 
  }

  deleteProduct(){}

}
