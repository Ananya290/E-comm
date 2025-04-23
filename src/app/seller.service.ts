import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUp } from '../datatype';
import { BehaviorSubject, observeOn } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService{
  isSellerLoggedIn = new BehaviorSubject<boolean>(false)
  sellerUrl="http://localhost:3000/seller"

  constructor(private http :HttpClient, private router : Router) { }


  userSignUp(data :SignUp){
    return this.http.post(this.sellerUrl,data,{observe :'response'}).subscribe((result)=>{
          this.isSellerLoggedIn.next(true);
          localStorage.setItem('seller',JSON.stringify(result.body))
          this.router.navigate(['seller-home']);
      
    })
  }

  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);


    }
    
  }
}
