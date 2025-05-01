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
   return  this.http.post(this.producturl,data);
  }
  productList(){
    return this.http.get<product[]>(this.producturl);
  }
  deleteProduct(id:number){
    return this.http.delete(`http://localhost:3000/products/${id}`)
  }
  editProduct(id:string){
    return this.http.get<product>(`http://localhost:3000/products/${id}`)
  }
  updateProduct(id :string ,product :product){
    return this.http.put<product>(`http://localhost:3000/products/${id}`,product)
  }
  
  
  
  
  }

