import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ConvertToSpace } from './shared/convert-to-space.pipe';
import { StarComponent } from './shared/star.component';
import { RouterModule } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductDetailsGuard } from './products-list/product-details.guard';
import { CustomerComponent } from './customer/customer.component';
@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ProductsListComponent,
    ConvertToSpace,
    StarComponent,
    ProductsListComponent,
    ProductDetailsComponent,
    CustomerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'products', component: ProductsListComponent },
      { path: 'customer', component: CustomerComponent },
      { path: 'index', component: IndexComponent },
      { path: 'products/:id', component: ProductDetailsComponent,canActivate : [ProductDetailsGuard] },
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      { path: '**', redirectTo: 'index', pathMatch: 'full' },
    ])

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
