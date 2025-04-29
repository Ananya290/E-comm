import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { log } from 'console';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
menuType:string = 'default';
sellerName :string = "";
constructor(private router : Router){}

  ngOnInit(): void {
    this.router.events.subscribe((val:any)=>{
      if(val.url){
        if(localStorage.getItem('seller') && val.url.includes('seller')){
          this.menuType='seller';
          console.log(this.menuType)
             if(localStorage.getItem('seller')){
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
            
        }
      
          
        }
        else{
          this.menuType='default';
          // console.log("outside")

        }
      }
     
    })
  

   
  }
  logout(){
      localStorage.removeItem('seller')
      this.router.navigate(['/'])
  }

}
