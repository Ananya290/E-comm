import { EventEmitter, Injectable } from '@angular/core';
import { cart, logIn, SignUp } from '../../datatype';
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
  userDataError = new EventEmitter<boolean>(false)
  isLoginerror =new BehaviorSubject<boolean>(false)

  constructor(private http : HttpClient,private router: Router) { }
  userSignUp(data :SignUp){    
       this.http.post(this.userSignupUrl,data,{observe:'response'}).subscribe((result)=>{
        this.isuserSignUp.next(true);
        console.log(result);
        localStorage.setItem('user',JSON.stringify(result.body));
         this.router.navigate(['/']); 
      }) 
}
userLogin(data : logIn){
   if (!data.email || !data.password) {
      this.userDataError.emit(true);
      console.warn("login failed: email or password missing");
      return;
    }
  return  this.http.get(`http://localhost:3000/user?email=${data.email}&password=${data.password}`,{observe:"response"}).subscribe((result:any)=>{
 if(result && result.body && result.body.length ){
        localStorage.setItem('user', JSON.stringify(result.body))
        this.router.navigate(['/']);  
        console.log("login success");
      }
      else{
        this.isLoginerror.next(true)
        console.warn("login failed")
      }
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
