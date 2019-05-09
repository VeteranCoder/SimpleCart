import { Product } from './product';
import { Subject } from 'rxjs';
import { OnDestroy, Input } from '@angular/core';
export class CartItem implements OnDestroy {
  private subject = new Subject<any>();
  private _quantity: number = 0;
  public get quantity(): number {
    return this._quantity;
  }
//   @Input("quantity")
  public set quantity(qty: number) {
    this._quantity = +qty;
    // this.raiseQuantityEvent();
    this.cartChangeHandler(this);
  }
  constructor(public readonly product: Product, quantity: number, private cartChangeHandler: (CartItem) => void = null) {
    this.quantity = quantity;
  }
  // add(amount: number = 1) {
  //   this.quantity = this.quantity + amount;
  //   this.raiseQuantityEvent();
  // }
  // remove(amount: number = 1) {
  //   this.quantity = this.quantity - amount;
  //   this.raiseQuantityEvent();
  // }
//   private raiseQuantityEvent() {
//     if (this.quantity === undefined || this.quantity == NaN || this.quantity === null)
//       return;
//     console.debug(`${this.product.name} is raising a quantity change event with quantity = ${this.quantity}.`);
//     this.subject.next(this);
//     // this.subject.next(this.quantity);
//     this.cartChangeHandler(this);
//   }
  getCountHandle() {
    return this.subject.asObservable();
  }
  ngOnDestroy() {
    console.debug(`${this.product.name} in cart is being destroyed.`);
    this.subject.next(0);
  }
}
