import { CanActivateFn } from '@angular/router';
import { SellerService } from './seller.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const sellerService = inject(SellerService); 
  //this gives you the service instance
  if(localStorage.getItem('seller')){
    return true
  }
  return sellerService.isSellerLoggedIn;


  
  

};

