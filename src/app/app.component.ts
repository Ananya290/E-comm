import { Component, OnInit } from '@angular/core';
import { SellerService } from './seller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private sellerservice : SellerService){}
  ngOnInit(): void {
    
  }
  title = 'E-comm';
}
