import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, product } from '../../datatype';
import { log } from 'console';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  cartData = new EventEmitter<product[] | []>();

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

  localAddToCart(data:product){
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if(!localCart){
      localStorage.setItem('localCart',JSON.stringify([data]))
    }else{
      cartData = JSON.parse(localCart);
      if (!Array.isArray(cartData)) {
        cartData = [cartData];
      }
      cartData.push(data)
      localStorage.setItem('localCart',JSON.stringify(cartData))
    }
    this.cartData.emit(cartData);
  }
  removeItemFromCart(productID:number){
    
   let cartData = localStorage.getItem('localCart');
   if(cartData){
   let items : product[] = JSON.parse(cartData);
  items = items.filter((item:product)=>productID !== item.id);
  localStorage.setItem('localCart',JSON.stringify(items));
  console.warn(items)
   this.cartData.emit(items);
   
   }}
  addToCart(cartData:cart){
 return this.http.post('http://localhost:3000/cart',cartData);
}
   }

  


  
  
  
  

