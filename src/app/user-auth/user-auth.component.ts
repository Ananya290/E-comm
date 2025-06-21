import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserserviceService } from '../userservices/userservice.service';
import { logIn, SignUp } from '../../datatype';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent implements OnInit {
  userSignupForm!:FormGroup;
  userLoginForm!:FormGroup;
  includeNumbers: boolean = true;
  includeCharacters: boolean = true;
  isuseraccount :boolean =false;

  constructor(private fb: FormBuilder , private userService :UserserviceService){
    
  }

  ngOnInit(): void {
    this.userSignupForm = this.fb.group({
      username :['',Validators.required],
      email :['',[Validators.required, Validators.email]],
      password:['',Validators.required]
    })
    this.userLoginForm = this.fb.group({
      email :['' ,[ Validators.required, Validators.email]],
      password:['', Validators.required]
    })
    this.userService.reloaduser();
    this.generateAndSetPassword();
  }

  generateAndSetPassword() {
    const password = this.generatePassword(7, this.includeNumbers, this.includeCharacters);
    this.userSignupForm.patchValue({ password });
  }

  generatePassword(length: number, includeNumbers: boolean, includeCharacters: boolean): string {
    
     let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeCharacters) chars += '!@#$%^&*()_+{}:"<>?';
    if (includeNumbers) chars += '0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }

  onIncludeNumbersChange(checked: boolean) {
    this.includeNumbers = checked;
    this.generateAndSetPassword();
  }

  onIncludeCharactersChange(checked: boolean) {
    this.includeCharacters = checked;
    this.generateAndSetPassword();
  }

  handleIncludeNumbersChange(event: Event) {
    const checked = (event.target as HTMLInputElement)?.checked;
    this.onIncludeNumbersChange(!!checked);
  }

  handleIncludeCharactersChange(event: Event) {
    const checked = (event.target as HTMLInputElement)?.checked;
    this.onIncludeCharactersChange(!!checked);
  }

  SignUp(data:SignUp){
    this.userService.userSignUp(data);
  }
  userlogin(data :logIn){
    this.userService.userLogin(data);
    console.log("userlogin");
    
  }
  hideLogin(){
    this.isuseraccount=false;
  }
  hideSignUp(){
    this.isuseraccount=true;
  }

}
