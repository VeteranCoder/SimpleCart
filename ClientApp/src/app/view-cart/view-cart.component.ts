import { Component, OnInit, OnChanges } from '@angular/core';
import { OrderService } from '../order.service';
import { Observable } from 'rxjs';
import { CartItem } from "../CartItem";

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {

  cart: CartItem[] = [];
  _orderCost: number;

  public get orderCost(): number {
    return this.getOrderCost();
  }

  constructor(private orderService: OrderService) {

  }
  getCartItemHandle(productName: string): Observable<number> {
    let cart = this.orderService.getOrder().cart;
    let items = cart.filter(element => element.product.name === productName);
    if (items === undefined || items.length === 0) {
      // add product not found error message somewhere :)
      return null;
    }
    return items[0].getCountHandle();
  }
  getOrderCost(): number {
    return this.orderService.getOrder().getTotalCost();
  }
  
  ngOnInit() {
    this.cart = this.orderService.getOrder().cart;
    console.debug(`In ViewCart, cart has ${this.cart.length} items.`);
  }


}
