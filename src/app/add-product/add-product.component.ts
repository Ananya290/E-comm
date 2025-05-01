import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductServiceService } from '../services/product-service.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { product } from '../../datatype';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit{
  addProductForm!:FormGroup;
  addProductMssg:string|undefined;
  productData : product | undefined;
  productId :string | null | undefined;
  constructor(private fb :FormBuilder,private productservice : ProductServiceService,private route :ActivatedRoute,private router :Router){
    this.addProductForm = this.fb.group({
      productName :['',Validators.required],
      productPrice:['',Validators.required],
      productColor:['',Validators.required],
      productDescription:['',Validators.required],
      productImg:['']

  
    })
  }

  ngOnInit(): void {
   this.productId= this.route.snapshot.paramMap.get('id')
    console.log(this.productId);
    this.productId && this.productservice.editProduct(this.productId).subscribe((result)=>{
     this.productData = result;
    this.addProductForm.patchValue(result);

    })
    

  }
  


 onsubmit(data :any){
if(this.productId){
  this.productservice.updateProduct(this.productId,data).subscribe((result)=>{
   this.addProductMssg = "Product Updated Successfully !!"
   this.addProductForm.reset();
  })
  setTimeout(()=> this.addProductMssg=undefined,3000)
  this.router.navigate(['/seller-home'])
}
else{
  this.productservice.addProductService(data).subscribe((result)=>{
    if(result){
      this.addProductMssg = "Product is added Successfully!"
       this.addProductForm.reset();
    }
    setTimeout(()=>this.addProductMssg = undefined,3000)  
    })
     this.router.navigate(['/seller-home'])

}

  }
}

