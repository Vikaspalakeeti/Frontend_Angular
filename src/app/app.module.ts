import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';

import {HttpClientModule} from '@angular/common/http';
import { RouterModule,Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SecurityComponent } from './component/security/security.component';
import { MenuComponent } from './component/menu/menu.component';
import { RestaurantComponent } from './component/restaurant/restaurant.component';
import { CartComponent } from './component/cart/cart.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { CustomerComponent } from './component/customer/customer.component';
import { OrdersComponent } from './component/orders/orders.component';
import { AdmindashboardComponent } from './component/admindashboard/admindashboard.component';
import { CustomerdashboardComponent } from './component/customerdashboard/customerdashboard.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SecurityComponent,
    MenuComponent,
    RestaurantComponent,
    CartComponent,
    NotFoundComponent,
    CustomerComponent,
    OrdersComponent,
    AdmindashboardComponent,
    CustomerdashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
