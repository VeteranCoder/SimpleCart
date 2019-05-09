import { Injectable } from '@angular/core';

import { Product } from './product';
import { HttpClient } from '@angular/common/http';
import { Order } from './Order';

@Injectable({
  providedIn: 'root'
})
export class CartServerService {


  constructor(private http: HttpClient) {

  }

  getProducts() : Promise<Product[]>{
     // TODO: move this to the server, retrieve it from there.

     let resp = this.http.get('https://localhost:5001/ShoppingCart/product').toPromise();
    //  let resp = this.http.post('https://localhost:5001/product', criteria, { withCredentials: true }).toPromise();
    return resp.then((response: any) =>{
      if (response.StatusCode > 200) {
        throw new Error("unexpected response");
      }
      console.debug("product response: " + JSON.stringify(response));
      return response.content;
    })

  }
  placeOrder(order: any): Promise<any> {

    // console.info(`The Order: ${JSON.stringify(order)}`);
    return this.http.post("https://localhost:5001/ShoppingCart/order", order).toPromise()
      .then( resp => {
        console.info(`The response: ${JSON.stringify(resp)}`);
        return resp;
      })
      .catch((err)=> {
        console.error(err);
      });
  }
}