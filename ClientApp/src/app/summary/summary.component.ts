import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { OrderService } from '../order.service';
import { Product } from '../product';
import { Order } from '../Order';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  // products: Product[];
  order: Order;

  constructor(private productService: ProductService, 
    private orderService: OrderService) {

     }

  ngOnInit() {
    this.order = this.orderService.getOrder();
    console.debug(this.order)
  }

}
