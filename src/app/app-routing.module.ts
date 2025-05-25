import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header/header.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { HomeComponent } from './home/home.component';
import { PagenotFoundComponent } from './pagenot-found/pagenot-found.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { authGuard } from './auth.guard';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SeacrhComponent } from './seacrh/seacrh.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'seller',component:SellerAuthComponent},
  {path: 'seller-home', component:SellerHomeComponent,canActivate:[authGuard]},
  {path:'seller-add-product',component:AddProductComponent,canActivate:[authGuard]},
  {path:'seller-product-list',component:ProductListComponent,canActivate:[authGuard]},
  {path:'seller-add-product/:id',component:AddProductComponent,canActivate:[authGuard]},
  {path:'search/:query',component:SeacrhComponent},
  {path: '**', component:PagenotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
