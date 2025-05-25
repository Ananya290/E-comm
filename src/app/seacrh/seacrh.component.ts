import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { log } from 'console';
import { ProductServiceService } from '../services/product-service.service';
import { product } from '../../datatype';

@Component({
  selector: 'app-seacrh',
  templateUrl: './seacrh.component.html',
  styleUrl: './seacrh.component.css'
})
export class SeacrhComponent implements OnInit {
  searchResult :undefined | product[]

  constructor(private activeRoute :ActivatedRoute , private productService : ProductServiceService) { }

  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query')
    console.log(query);
     if (query) {
      this.productService.searchProducts(query).subscribe((result)=>{
        this.searchResult = result;
        console.log(this.searchResult , "search result");
      })
    }


}
}
  // This component is used to display search results based on the query parameter
  // You can implement the logic to fetch and display products based on the search query here
  // For example, you can use a service to fetch products from an API based on the query parameter
