import { Injectable } from '@angular/core';
import { Product } from './product';
import { Order } from './Order';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private order: Order;

  constructor() {
    this.order = new Order();
    // this.order.add(new Product("dynamic", "this exists only here", 100, 100));
  }

  getOrder(): Order {
    return this.order;
  }
}

