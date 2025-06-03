import { Injectable } from '@angular/core';
import { SignUp } from '../../datatype';
import { log } from 'console';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  userSignupUrl= "http://localhost:3000/user"

  constructor(private http : HttpClient,private router: Router) { }
  userSignUp(data :SignUp){    
       this.http.post(this.userSignupUrl,data,{observe:'response'}).subscribe((result)=>{
        localStorage.setItem('user',JSON.stringify(result.body));
         this.router.navigate(['/']); 
      }) 
    


}
}
