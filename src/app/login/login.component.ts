import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  msg:string="";
  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  checkCredentials(loginInput:NgForm){
    let login=loginInput.value;
    console.log(`username is : ${login.userEmail} and password is ${login.userPass}`);
 
    if(true) {
      this.router.navigate(["products"]);  
    }  
    else{
      this.msg="Invalid login credentials";
    }   

  }

}
