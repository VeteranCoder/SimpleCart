import { TestBed, async } from '@angular/core/testing';

import { OrderService } from './order.service';
import { HttpClientModule } from '@angular/common/http';
import { AppLoadService } from './app-loader/app-load.service';
import { ConfigService } from './config.service';
import { ProductService } from './product.service';
import { CartServerService } from './data-service.service';
import { FormsModule } from '@angular/forms';
import { Product } from './product';

describe('OrderService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule],
      providers: [AppLoadService, ConfigService, ProductService, OrderService, CartServerService]
    });
  }));


  it('should be created with initialized order.', () => {
    const service: OrderService = TestBed.get(OrderService);
    expect(service).toBeTruthy();
    expect(service.getOrder()).not.toBeUndefined();
  });


  describe(': Order', () => {
    let service: OrderService;
    beforeEach(async(() => {
      service = TestBed.get(OrderService);
    }));

    it('properties should be initialized', () => {

      const order = service.getOrder();
      expect(order.cart).toEqual([]);
      expect(order.paymentInfo).toBeDefined();
      expect(order.shippingInfo).toBeDefined();
    });

    it('should add a product array element once and only once.', () => {
      const order = service.getOrder();
      let prod1 = new Product("prod 1", "prod 1", 1, 1000);
      order.add(prod1, 1);
      expect(order.cart.length).toBe(1);
      expect(order.cart[0].quantity).toBe(1);
      order.add(prod1, 1);
      expect(order.cart.length).toBe(1);
      expect(order.cart[0].quantity).toBe(2);

    });
    it('should remove a product array element when quantity reaches zero.', () => {
      const order = service.getOrder();
      let prod1 = new Product("prod 1", "prod 1", 1, 1000);
      order.add(prod1, 1);
      order.add(prod1, 1);
      expect(order.cart.length).toBe(1);
      expect(order.cart[0].quantity).toBe(2);

      order.remove(prod1, 1);
      expect(order.cart.length).toBe(1);
      expect(order.cart[0].quantity).toBe(1);

      order.remove(prod1, 1);
      expect(order.cart.length).toBe(0);
    });

    it('should raise an order size event.', (done) => {
      const order = service.getOrder();
      let evtcount = 0;
      let evtHandle = order.getOrderSizeHandle();
      evtHandle.subscribe(val => {
        console.debug(`event triggered`);
        evtcount++;
        expect(true).toBe(true);
        done();
      });
      let prod1 = new Product("prod 1", "prod 1", 1, 1000);
      order.add(prod1, 1);
      // if the event isn't being called, there will be a timeout error.
    });
  });
});
