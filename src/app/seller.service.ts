import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { logIn, SignUp } from '../datatype';
import { BehaviorSubject, observeOn } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService{
  isSellerLoggedIn = new BehaviorSubject<boolean>(false)
  sellerUrl="http://localhost:3000/seller";
  SellerDataError=new EventEmitter<boolean>(false)
  isLoginerror = new EventEmitter<boolean>(false)

  constructor(private http :HttpClient, private router : Router) { }
  userSignUp(data :SignUp){
    return this.http.post(this.sellerUrl,data,{observe :'response'}).subscribe((result)=>{
          this.isSellerLoggedIn.next(true);
          // localStorage.setItem('seller',JSON.stringify(result.body))
          // this.router.navigate(['seller-home']);
      
    })
  }

  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
      console.log("reload-seller");
      
    }  
  }

  userLogin(data : logIn){
    if (!data.email || !data.password) {
      this.SellerDataError.emit(true);
      console.warn("login failed: email or password missing");
      return;
    }
    return this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,{observe: 'response'}).subscribe((result:any)=>{
      if(result && result.body && result.body.length){
        localStorage.setItem('seller', JSON.stringify(result.body))
        this.router.navigate(['/seller-home']);  
        console.log("login success");
      }
      else{
        this.isLoginerror.emit(true)
        console.warn("login failed")
      }
    })
  }
  
























}
