import { Component } from '@angular/core';
import { ProductService } from "../product.service";
import { Product } from '../product';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  protected products: Product[];

  constructor(private productService: ProductService, private orderService: OrderService) {
    this.productService.getProducts()
      .then(response => this.products = response);
  }
  addToCart(product: Product) {
    this.orderService.getOrder().add(product)
  }

}
