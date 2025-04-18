import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header/header.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { HomeComponent } from './home/home.component';
import { PagenotFoundComponent } from './pagenot-found/pagenot-found.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'seller',component:SellerAuthComponent},
  {path: 'seller-home', component:SellerHomeComponent},
  {path: '**', component:PagenotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
