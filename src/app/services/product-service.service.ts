import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../../datatype';
import { log } from 'console';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  producturl ="http://localhost:3000/products";
  constructor(private http :HttpClient) {

   }

  addProductService(data :product){
   return  this.http.post(this.producturl,data);}
  
  
  
  
  
  
  }

