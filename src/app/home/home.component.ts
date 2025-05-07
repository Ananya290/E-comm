import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';
import { product } from '../../datatype';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  productImages: string[] = [];
  populerproduct : product[] |undefined;
  trendyProduct!:product[];


  constructor(private productService : ProductServiceService){}
  ngOnInit(): void {
    this.productService.popularProduct().subscribe((result)=>{
      this.populerproduct = result;
      // this.productImages = result.map((product: any) => product.productImg)
    this.productService.trendyProduct().subscribe((result)=>{
      this.trendyProduct = result;
    })
    })

  }
  


}
