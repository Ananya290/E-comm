import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { log } from 'console';
import { ProductServiceService } from '../../services/product-service.service';
import { product } from '../../../datatype';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
menuType:string = 'default';
sellerName :string = "";
send_date = new Date();
formattedDate:string|undefined;
searchResult : undefined |product[] 
constructor(private router : Router,private productService :ProductServiceService){}

  ngOnInit(): void {
    this.send_date.setMonth(this.send_date.getMonth());
    this.formattedDate=this.send_date.toISOString().slice(0,10); 
    this.router.events.subscribe((val:any)=>{
      if(val.url){
        if(localStorage.getItem('seller') && val.url.includes('seller')){
          this.menuType='seller';
          console.log(this.menuType)
             if(localStorage.getItem('seller')){
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.username;
             
        }   
        }
        else{
          this.menuType='default';
        }
      }
     
    })   
  }
  
  logout(){
      localStorage.removeItem('seller')
      this.router.navigate(['/'])
  }
  searchProduct(e: KeyboardEvent) {
    if (e) {
      let element = e.target as HTMLInputElement;
      console.log(element.value);
      this.productService.searchProducts(element.value).subscribe((result) => {
        // Show only 5 most matching elements
        this.searchResult = result.slice(0, 5);
        console.log(this.searchResult);
      });
    }
  }
   hideAutoSuggestion(){
    this.searchResult = undefined;
  }
  searchItem(val: string) {
    console.log(val);
    this.router.navigate(['/search', val])
  }
}