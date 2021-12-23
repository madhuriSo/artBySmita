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

loadProuctInfo(): Observable<Product[]> {
    return this.http.get<Product[]>("http://localhost:3000/api/profiles/products");
  }

  getProductsAvailable():Product[]{
    return this.products;
  }

  getProducts(){
    this.http.get<{products:Product[]}>(this.prodUrl)
    .pipe(
      map((fileData) => {
        console.log(fileData); //Data available here
        console.log(fileData.products); // Need to get from here to component
        return fileData.products;
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
