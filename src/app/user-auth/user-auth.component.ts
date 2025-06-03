import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserserviceService } from '../userservices/userservice.service';
import { SignUp } from '../../datatype';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent implements OnInit {
  userSignupForm!:FormGroup;
constructor(private fb: FormBuilder , private userService :UserserviceService){
  this.userSignupForm = this.fb.group({
    username :['',Validators.required],
    email :['',[Validators.required, Validators.email]],
    password:[' ',Validators.required]
  })

}
  ngOnInit(): void {
  }
  SignUp(data:SignUp){
    this.userService.userSignUp(data);
}

}
