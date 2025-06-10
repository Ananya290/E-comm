import { Injectable } from '@angular/core';
import { SignUp } from '../../datatype';
import { log } from 'console';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  userSignupUrl= "http://localhost:3000/user"
  isuserSignUp = new BehaviorSubject<boolean>(false)

  constructor(private http : HttpClient,private router: Router) { }
  userSignUp(data :SignUp){    
       this.http.post(this.userSignupUrl,data,{observe:'response'}).subscribe((result)=>{
        this.isuserSignUp.next(true);
        console.log(result);
        localStorage.setItem('user',JSON.stringify(result.body));
         this.router.navigate(['/']); 
      }) 
}
reloaduser(){
  if(localStorage.getItem('user')) {
    console.log("user is logged in----service");
    // this.isuserSignUp.next(true);
    this.router.navigate(['/']);
  }
}
}
