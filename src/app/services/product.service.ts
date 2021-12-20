import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';
import { Subject } from "rxjs";
import { ProdImage } from '../model/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    // API url
    baseApiUrl = "https://file.io"
    private proImages: ProdImage[] = [];
  private proImages$ = new Subject<ProdImage[]>();
  private products:Product[]=[];
  private products$=new Subject<Product[]>();

  readonly url = "http://localhost:3000/api/profiles";

  readonly prodUrl="http://localhost:3000/api/profiles/products";
  constructor(public http:HttpClient) { }

  /*loadProuctInfo(): Observable<Product[]> {
    return this.http.get<Product[]>("http://localhost:9090/api/product/getProductInfo");
   db.products.insert({_id:400,name:"Orange",price:50,description:"Contains vitamin C",url:"https://media.gettyimages.com/photos/orange-picture-id185284489?k=20&m=185284489&s=612x612&w=0&h=LLY2os0YTG2uAzpBKpQZOAC4DGiXBt1jJrltErTJTKI="});
  
  }*/

  getProductsAvailable():Product[]{
    return this.products;
  }

  getProducts(){

    this.http.get<{products:Product[]}>(this.prodUrl)
    .pipe(
      map((profileData) => {
        console.log(profileData);
        console.log(profileData.products);
        return profileData.products;
      })
    )
    .subscribe((products) => {
      this.products = products;
      this.products$.next(this.products);
    });
  }

  getProfiles() {
    this.http
      .get<{ proImages: ProdImage[] }>(this.url)
      .pipe(
        map((profileData) => {
          return profileData.proImages;
        })
      )
      .subscribe((profiles) => {
        this.proImages = profiles;
        this.proImages$.next(this.proImages);
      });
  }

  getProfilesStream() {
    return this.proImages$.asObservable();
  }



  addProdImage(name: string, image: File): void {
    const profileData = new FormData();
    var blob = new Blob([image], { type: "image/jpg"});
    profileData.append("productId","12");
    profileData.append("name", name);
    profileData.append("image", blob, name);
    this.http
      .post<{ prodImg: ProdImage }>(this.url, profileData)
      .subscribe((profileData) => {
        const prodImg: ProdImage = {
          productId: "",
          name: name,
          imagePath: "",
          _id: ''
        };
        this.proImages.push(prodImg);
        this.proImages$.next(this.proImages);
      });
  }
}
