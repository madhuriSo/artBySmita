import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map } from "rxjs/operators";
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

  readonly url = "http://localhost:3000/api";

  readonly productUrl="http://localhost:3000/api/products/";
   
  constructor(public http:HttpClient) { }

loadProuctInfo(): Observable<Product[]> {
    return this.http.get<Product[]>("http://localhost:3000/api/products");
  }

  getProductsAvailable():Product[]{
    return this.products;
  }


  getProducts(){
    this.http.get<{products:Product[]}>(this.productUrl)
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

   addProduct(name:string,price:string,description:string):Observable<any>{
      const productData=new FormData();
      productData.append("name",name);
      productData.append("price",price);
      productData.append("description",description);
      console.log("Productservice :"+productData);
      return this.http.post<{prod:Product}>(this.productUrl,productData);
     
      
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

  deleteProduct(_id: string):Observable<any> {
    console.log("deleteProduct ->");
    const httpOptions: any = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
 
    httpOptions.body = {
      _id: _id,
     
    };
    
   /* let paramst=new HttpParams().set('_id',_id);
    const options= {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'}),
      params:paramst  
      }*/

      return this.http.delete(`${this.productUrl}/${_id}`, { responseType: 'text' });
   // return this.http.request<string>('delete',this.productUrl,httpOptions);
    

  }
}
