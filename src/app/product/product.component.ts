import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products:Array<Product>=[];
  productsDb:Array<Product>=[];
  constructor(public pService:ProductService) { }

  ngOnInit(): void {
    this.products.push(new Product(100,"Apple",250,"Healthy cotains vitamins","https://media.gettyimages.com/photos/delicious-red-apples-on-retail-display-at-supermarket-picture-id1152067772?k=20&m=1152067772&s=612x612&w=0&h=lNBDiN6OQu_JP6NexV2y8XnaE4Seo5ZB-YUMj3WQC44="));
    this.products.push(new Product(200,"Tulsi",12,"Good for cough and cold","https://media.gettyimages.com/photos/holy-basil-or-tulsi-plant-picture-id1193749521?s=2048x2048"))
    this.pService.loadProuctInfo().subscribe(result=> {
      this.productsDb=result;
    })
  }

}
