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
  /*form!: FormGroup;
  profile!: Profile;
  imageData!: string;
  imageDetails!:string;
  prodForm!:FormGroup;
   productData !:ProductU; */
  constructor(public pService:ProductService) { 

  }
  

  ngOnInit(): void {
    this.products.push(new Product(100,"Apple",250,"Healthy cotains vitamins","http://localhost:3000/images/prod.jpg"));
    this.products.push(new Product(200,"Tulsi",12,"Good for cough and cold","http://localhost:3000/images/wew.jpg"))
    this.pService.loadProuctInfo().subscribe(result=> {
      this.productsDb=result;

    })
    /*
    this.form = new FormGroup({
      name: new FormControl(null),
      image: new FormControl(null),
    });

    this.prodForm=new FormGroup({
      name:new FormControl(null),
      price:new FormControl(null),
      details:new FormControl(null),
      pImg:new FormControl(null)
    }); */

    

  }
/*
  onFileSelect(event: Event) {
    if((event.target as HTMLInputElement !=null)){
      const file = event.target as HTMLInputElement;
      if(file.files!=null){
        this.form.patchValue({ image: file.files[0] });
      }
      const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (file && allowedMimeTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageData = reader.result as string;
        };
        if(file.files!=null){
          reader.readAsDataURL(file.files[0]);
        }
        
      }
    }
  
  }

  onSubmit() {
    console.log(" onSubmit");
    this.pService.addProfile(this.form.value.name, this.form.value.image);
    this.form.reset();
    
  }

  afterFileSelect(event: Event,imageInput:any){

    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    console.log("Here");
    if((event.target as HTMLInputElement !=null)){
      const file = event.target as HTMLInputElement;
      if(file.files!=null){
      
        this.productData.image=file.files[0];
       // this.form.patchValue({ image: file.files[0] });
      }
      const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (file && allowedMimeTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = () => {
          if(reader.result!=null){
            this.imageDetails = reader.result as string;
          }
         
        };
        if(file.files!=null){
          reader.readAsDataURL(file.files[0]);
        }
        
      }
    }
  } */
  addProduct(productForm:NgForm,imageInput:any){
   

    const file: File = imageInput.files[0];

   

    this.pService.addProdImage(productForm.value.name,file);
 


  }

  deleteProduct(){}


  



}
