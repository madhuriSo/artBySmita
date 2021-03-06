import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { LoginComponent } from './login/login.component';
import { AddproductComponent } from './addproduct/addproduct.component';


const routes: Routes = [ 
  { path:"login",component:LoginComponent},
  { path :"products",component:ProductComponent},
  { path :"addproduct",component:AddproductComponent},
  { path:"",redirectTo:"login",pathMatch:"full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
