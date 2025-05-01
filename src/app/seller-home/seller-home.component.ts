import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';
import { product } from '../../datatype';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent implements OnInit{
productLists :product[]| undefined;
deleteMssg:string |undefined;
  constructor(private productService :ProductServiceService){}
  ngOnInit(): void {
  this.list();

  }

 list(){
  this.productService.productList().subscribe((result)=>{
    this.productLists=result;
   })
 } 
 deleteProducts(id:number){
  this.productService.deleteProduct(id).subscribe((result)=>{
    if(result){
      this.deleteMssg ="Product Deleted Succesfully!"
      this.list();
    }
    setTimeout(()=>this.deleteMssg=undefined , 3000)
  })
 }
 editProduct(id:number){
 console.log(id)
 }

}
