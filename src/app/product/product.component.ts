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
    this.products.push(new Product(100,"Apple",250,"Healthy cotains vitamins","http://localhost:3000/images/prod.jpg"));
    this.products.push(new Product(200,"Tulsi",12,"Good for cough and cold","http://localhost:3000/images/wew.jpg"))
    this.pService.loadProuctInfo().subscribe(result=> {

      this.prodDb=result;
      console.log("result :" +this.prodDb );

    });
  }

    viewProducts(){
      this.products=this.prodDb;
      
    }

  addProduct(productForm:NgForm,imageInput:any){
  
    const file: File = imageInput.files[0];
    this.pService.addProdImage(productForm.value.name,file);
 
  }

  deleteProduct(){}


  



}
