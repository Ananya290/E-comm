import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserserviceService } from '../userservices/userservice.service';
import { cart, logIn, product, SignUp } from '../../datatype';
import { ProductServiceService } from '../services/product-service.service';

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
  authError : string = " ";

  constructor(private fb: FormBuilder , private userService :UserserviceService, private productService :ProductServiceService){
    
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
    this.userService.isLoginerror.subscribe((result)=>{
      console.warn(result);
      if(result){
        this.authError="User Not Found"
      }else{
        this.localCartToRemoteCart()
      }
      
    })
    
  }
  hideLogin(){
    this.isuseraccount=false;
  }
  hideSignUp(){
    this.isuseraccount=true;
  }
  localCartToRemoteCart(){
    let data = localStorage.getItem('localCart');
    if(data){
      let cardDataList:product[] = JSON.parse(data);
      let user = localStorage.getItem('user');
      let userparse = user && JSON.parse(user)
      let userId = userparse && userparse[0].id;
      
      cardDataList.forEach((productData :product,index)=>{
        let cartData : cart={
          ...productData,
          productId:productData.id,
          userId
        };
        delete (cartData as any).id;
       setTimeout(()=>{
          this.productService.addToCart(cartData).subscribe((result)=>{
          if(result){
            console.warn("Item stored in DB");
          }
        })
        if(cardDataList.length === index+1){
          localStorage.removeItem('localCart')
        }
       },500)
      })
    }

  }

}
