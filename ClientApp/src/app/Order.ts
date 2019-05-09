import { Observable, Subject } from 'rxjs';
import { CartItem } from './CartItem';
import { Product } from './product';

export class Order {
  cart: CartItem[];
  shippingInfo: ShippingInfo;
  paymentInfo: PaymentInfo;

  private subject = new Subject<any>();


  constructor() {
    this.cart = [];
    this.paymentInfo = new PaymentInfo();
    this.shippingInfo = new ShippingInfo();
  }
  add(product: Product, amount: number = 1): CartItem {
    console.debug(`adding ${product.name} to the order ${amount} times. Count = ${this.getOrderCount()}`);
    let items = this.cart.filter(element => element.product.name === product.name);
    let returnValue: CartItem = null;
    if (items === undefined || items.length === 0) {
      const item = new CartItem(product, amount, this.productChangeHandler)
      this.cart.push(item);
      returnValue = item;
    } else {
      items[0].quantity = items[0].quantity + amount;
      returnValue = items[0];
    }
    this.raiseOrderSizeEvent();
    return returnValue;
  }
  remove(product: Product, amount: number = 1) {
    let item = this.cart.find(item => item.product === product);
    if (item === undefined)   {return;}

    if (item.quantity <= amount) {
      const index = this.cart.indexOf(item);
      if (index > -1) {
        this.cart.splice(index, 1);
      }
    } else {
      item.quantity = item.quantity - 1;
    }
    this.raiseOrderSizeEvent();
  }
  getOrderCount() {
    // alternatively, could do a reduce() here.
    let total: number = 0;
    this.cart.forEach(element => {
      total = total + element.quantity;
    });
    return total;
  }
  getTotalCost() {
    let totl = this.cart.reduce((priorSum, item) => priorSum + (item.quantity), 0);
    return totl;
  }
  getSerializableOrder() {
    return { cart: this.cart, paymentInfo: this.paymentInfo, shippingInfo: this.shippingInfo }
  }

  raiseOrderSizeEvent: () => void = () => {
    this.subject.next(this.getOrderCount());
  }
  productChangeHandler: (item: CartItem) => void = (item) => {
    this.raiseOrderSizeEvent();

  }

  getOrderSizeHandle(): Observable<any> {
    return this.subject.asObservable();
  }
}

export class ShippingInfo {

  name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;

  constructor() { }
}
export class PaymentInfo {

  cardNumber: string;

  constructor() {
    console.debug('initializing payment info')
    this.cardNumber = 'empty number'
  }
}