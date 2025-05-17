import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SellerService } from '../seller.service';
import { Router } from '@angular/router';
import { logIn, SignUp } from '../../datatype';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent implements OnInit {
  signupform :  FormGroup;
  loginform : FormGroup
  data: Object =" ";
  alreadyAccount = false;
  authError:undefined | string ;
  signupSuccess: undefined | string ;


  constructor(private fb : FormBuilder, private SellerService :SellerService, private router :Router){
    this.signupform = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.loginform = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
   
  

  ngOnInit(): void {  
    this.SellerService.reloadSeller();          
  }
  signUp(data:SignUp): void {
    this.SellerService.userSignUp(data)
if(data){
   this.signupSuccess = "SignUp Successfull";
}  
    setTimeout(()=>this.signupSuccess=undefined , 1000)
    this.signupform.reset();
  }
  OpenLogin(){
       this.alreadyAccount =true;
      }
   openSignup(){
        this.alreadyAccount=false;
      }
  login(data :logIn){
    this.SellerService.userLogin(data)
    this.SellerService.isLoginerror.subscribe((iserror)=>{
      if(iserror){
        this.authError = "Email or Password is incorrect !!!";
      }
    })
    setTimeout(()=>this.authError=undefined , 3000)
    this.SellerService.SellerDataError.subscribe((iserror)=>{
      if(iserror){
        this.authError = "Email or Password is missing !!!";
      }
    })

  }























    };
   
   
  

