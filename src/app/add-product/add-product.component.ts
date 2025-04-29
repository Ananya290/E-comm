import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductServiceService } from '../services/product-service.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit{
  addProductForm!:FormGroup;
  addProductMssg:string|undefined;

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  constructor(private fb :FormBuilder,private productservice : ProductServiceService){
    this.addProductForm = this.fb.group({
      productName :['',Validators.required],
      productPrice:['',Validators.required],
      productColor:['',Validators.required],
      productDescription:['',Validators.required],
      productImg:['']

  
    })
  }


 onsubmit(data :any){
  this.productservice.addProductService(data).subscribe((result)=>{
    if(result){
      this.addProductMssg = "Product is added Successfully!"
    }
    setTimeout(()=>this.addProductMssg = undefined,3000)
    
    })
  }
}

