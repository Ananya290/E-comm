import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  productImages: string[] = [];

 productImgUrl :string |undefined;
 productImgUrl2 :string |undefined;
 productImgUrl3 :string |undefined;

  constructor(private productService : ProductServiceService){}
  ngOnInit(): void {
    this.productService.productList().subscribe((res) => {
      console.log(res);  
      if (res.length >= 3) {
        this.productImages = res.map((product: any) => product.productImg);
      } else {
        console.warn("Not enough products returned from API.");
        this.productImages = res.map((product: any) => product.productImg); 
      }
    });
  }
  


}
