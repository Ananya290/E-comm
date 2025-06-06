import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../../datatype';
import { log } from 'console';
import { map } from 'rxjs/operators';

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
  popularProduct(){
    return this.http.get<product[]>(`http://localhost:3000/products?_limit=3`)
  }
  trendyProduct(){
    return this.http.get<product[]>(`http://localhost:3000/products?_limit=8`)
  }
  searchProducts(query: string) {
 
    return this.http.get<product[]>(this.producturl).pipe(map((products: product[]): product[] =>products.filter((p: product) =>
       p.productName?.toLowerCase().includes(query.toLowerCase())
      )
      )
    );
  }

  
  
  
  }

