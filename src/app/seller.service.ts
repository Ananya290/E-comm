import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  sellerUrl="http://localhost:3000/seller"

  constructor(private http :HttpClient) { }

  userSignUp(data : any){
    return this.http.post(this.sellerUrl,data);
  }
}
