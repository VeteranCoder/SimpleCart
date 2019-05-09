import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-widget',
  templateUrl: './cart-widget.component.html',
  styleUrls: ['./cart-widget.component.css']
})
export class CartWidgetComponent implements OnInit {

  cartSize: number;
  subscription: Subscription;

  constructor(private orderService: OrderService) { 
    this.subscription = this.orderService.getOrder().getOrderSizeHandle().subscribe(cnt => {
      if (cnt) {
        console.debug(`Received new cart size of ${cnt}`)
        this.cartSize = cnt;
      }
    })
  }

  ngOnInit() {
    this.cartSize = this.orderService.getOrder().getOrderCount();
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
}
}
