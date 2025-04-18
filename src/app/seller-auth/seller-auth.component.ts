import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SellerService } from '../seller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent implements OnInit {
  signupform :  FormGroup;
  data: Object =" ";


  constructor(private fb : FormBuilder, private SellerService :SellerService, private router :Router){
    this.signupform = this.fb.group({
    username:['', Validators.required],
    email:['', Validators.required],
    password:['', Validators.required],

    })
  }

  ngOnInit(): void {            
  }
  signUp(data: any): void {
    this.SellerService.userSignUp(data).subscribe((result) => {
      console.log("Signup Result: ", result);
      if (result) {
        this.router.navigate(['/seller-home']);
      }
    });
  }
  
}
