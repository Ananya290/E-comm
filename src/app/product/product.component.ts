import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ProductServiceService } from '../services/product-service.service';
import { product } from '../../datatype';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
 productData : undefined | product
 quantity: number = 1;

  constructor(private activRoute :ActivatedRoute, private productservice :ProductServiceService){}
  ngOnInit(): void {
   this.activRoute.paramMap.subscribe((result)=>{
     const productID = result.get('query');
     console.log(productID)
     productID && this.productservice.editProduct(productID).subscribe((data)=>{
      console.log(data);
      console.log(data.productName);
      this.productData = data;
      
      
  })

   })
  
  }

  min(){
    if(this.quantity > 1){
      this.quantity -= 1;
    }

  }
  add(){
    if(this.quantity < 20){
    this.quantity += 1;
  }

}
}
