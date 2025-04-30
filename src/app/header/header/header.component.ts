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
send_date = new Date();
formattedDate:string|undefined
constructor(private router : Router){}

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

}
