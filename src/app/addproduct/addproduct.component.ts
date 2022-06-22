import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from '../model/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  constructor(public pService:ProductService) { 
  }
  ngOnInit(): void {
  }

  addProduct(productForm:NgForm,imageInput:any){
    //TODO Get product ID then call add product image ASYC
    var createdProduct:Product=new Product("1","test",23,"test","URL");
    const file: File = imageInput.files[0];
    console.log("addProduct"+productForm.value.name);
    this.pService.addProdImage(productForm.value.name,file);
    
     this.pService.addProduct(productForm.value.name,
                              productForm.value.price,
                              productForm.value.details).subscribe((resp)=>{
                                createdProduct=JSON.parse(JSON.stringify(resp));
                                console.log("addProduct-subscribe : "+JSON.stringify(resp) );
                                console.log("created PRoduct id: "+createdProduct._id); 
                              }); 
                              


}
}
