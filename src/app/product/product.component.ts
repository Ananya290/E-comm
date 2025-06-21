import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ProductServiceService } from '../services/product-service.service';
import { cart, product } from '../../datatype';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  productData: undefined | product;
  quantity: number = 1;
  removeCart = false;

  constructor(
    private activRoute: ActivatedRoute,
    private productservice: ProductServiceService
  ) {}
  ngOnInit(): void {
    this.activRoute.paramMap.subscribe((result) => {
      let productID = result.get('query');
      console.log(productID);
      productID &&
        this.productservice.editProduct(productID).subscribe((data) => {
          console.log(data);
          console.log(data.productName);
          this.productData = data;
        });
      let cartData = localStorage.getItem('localCart');
      if (productID && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter(
          (item: product) => productID == item.id.toString()
        );
        if (items.length) {
          this.removeCart = true;
        } else {
          this.removeCart = false;
        }
      }
    });
  }

  min() {
    if (this.quantity > 1) {
      this.quantity -= 1;
    }
  }
  add() {
    if (this.quantity < 20) {
      this.quantity += 1;
    }
  }
  AddToCart() {
    if (this.productData) {
      this.productData.productquantity = this.quantity;
      if (!localStorage.getItem('user')) {
        this.productservice.localAddToCart(this.productData);
        this.removeCart = true;
      } else {
        let user = localStorage.getItem('user');
        let parsedUser = user && JSON.parse(user);
        console.log('Parsed user:', parsedUser);
        let userId = parsedUser && parsedUser[0] && parsedUser[0].id;
        console.log('User ID:', userId);
        let cartData:cart={
          ...this.productData,userId,productId:this.productData.id    
           }
        delete (cartData as any).id;
        console.warn(cartData)
        this.productservice.addToCart(cartData).subscribe((result)=>{
          console.log("addToCArt result ",result)
          if(result){
            alert('product is added in cart')
          }
        })
       
        
      }
    }
  }
  RemoveFromCart(productID: number) {
    this.productservice.removeItemFromCart(productID);
    this.removeCart = false;
  }
}
