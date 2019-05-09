import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { AppLoadModule } from './app-loader/app-loader.module';
import { AppLoadService } from './app-loader/app-load.service';
import { ConfigService } from './config.service';
import { ProductService } from './product.service';
import { OrderService } from './order.service';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { ViewCartModule } from './view-cart/view-cart.module';
import { CartWidgetComponent } from './cart-widget/cart-widget.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { CartServerService } from './data-service.service';
import { SummaryComponent } from './summary/summary.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    CartWidgetComponent,
    CheckOutComponent,
    SummaryComponent,
    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    ViewCartModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'view-cart', component: ViewCartComponent },
      { path: 'check-out', component: CheckOutComponent },
      { path: 'summary', component: SummaryComponent }
    ]),
    AppLoadModule
  ],
  providers: [AppLoadService, ConfigService, ProductService, OrderService, CartServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
