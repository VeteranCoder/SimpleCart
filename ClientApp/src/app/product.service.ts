import { Injectable } from '@angular/core';
import { CartServerService } from './data-service.service';
import { Product } from './product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productLst: Product[];

  constructor(private dataService: CartServerService) {


  }

  getProducts(): Promise<Product[]> {
    const response = this.dataService.getProducts();
    return response.then((products) => {
      console.debug(`Processing server response to product query`);
      this.setProducts(products);
      return products;
    });
  }
  setProducts(products: Product[]) {
    this.productLst = products;
    console.debug(`setProducts: product list length is ${products.length}`);
  }
}
