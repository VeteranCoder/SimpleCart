import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { OrderService } from '../order.service';
import { CartServerService as CartServerService } from '../data-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  myForm: FormGroup;

  constructor(private fb: FormBuilder, private orderService: OrderService, 
    private dataService: CartServerService, private router: Router) {

  }

  ngOnInit() {
    const order = this.orderService.getOrder();
    // this.cardNumber = order.paymentInfo.cardNumber;
    this.myForm = this.fb.group({
      'cardNumber': [order.paymentInfo.cardNumber],
      'name': [order.shippingInfo.name],
      'address1': [order.shippingInfo.address1],
      'address2': [order.shippingInfo.address2],
      'city': [order.shippingInfo.city],
      'state': [order.shippingInfo.state],
      'zip': [order.shippingInfo.zip]
    });
    console.debug(`card number =  ${this.myForm.controls['cardNumber'].value}`)
    // console.debug(`card number =  ${this.cardNumber}`)
  }
  onSubmit(value: string): void {
    //console.debug('submitted:', this.myForm);

    // map the data to the domain object for downstream work.
    const order = this.orderService.getOrder();
    order.paymentInfo.cardNumber = this.myForm.controls['cardNumber'].value;
    order.shippingInfo.name = this.myForm.controls['name'].value;
    order.shippingInfo.address1 = this.myForm.controls['address1'].value;
    order.shippingInfo.address2 = this.myForm.controls['address2'].value;
    order.shippingInfo.city = this.myForm.controls['city'].value;
    order.shippingInfo.state = this.myForm.controls['state'].value;
    order.shippingInfo.zip = this.myForm.controls['zip'].value;

    console.debug(order.getSerializableOrder());
    this.dataService.placeOrder(order.getSerializableOrder())
      .then( resp => {
        console.info(`Did it "save"? ---> ${JSON.stringify(resp)}`);
        
        // navigate to the summary page.
        this.router.navigateByUrl('/summary');
      })
  }
}
