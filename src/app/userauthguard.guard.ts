import { CanActivateFn } from '@angular/router';
import { UserserviceService } from './userservices/userservice.service';
import { inject } from '@angular/core';

export const userauthguardGuard: CanActivateFn = (route, state) => {
 const userService = inject(UserserviceService); // --- to check user authentication   ---

  if (localStorage.getItem('user')) {
    return true;
  }
  return userService.isuserSignUp; 
  console.log("userauthguardGuard is working", userService.isuserSignUp);
  // This will return true if the user is logged in, otherwise false.
  
};
