import { HttpClientModule } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { CartServerService } from './data-service.service';
import { Product } from './product';


describe('ProductService', () => {

  let dataService: CartServerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientModule],
      providers: []
    }).compileComponents();
    dataService = TestBed.get(CartServerService);
  }));

  it('should be created', () => {
    const service: ProductService = TestBed.get(ProductService);
    expect(service).toBeTruthy();
  });

  it('should call dataservice for product list', (done) => {
    const service: ProductService = TestBed.get(ProductService);
    const expectedList = [new Product('1', '2', 3, 4)];
    let dataSpy = spyOn(dataService, 'getProducts')
      .and.returnValue(Promise.resolve(expectedList));

    service.getProducts().then((prods) => {
      expect(prods).toEqual(expectedList);
      expect(dataSpy).toHaveBeenCalled();
      done();
    })
      .catch(err => { fail(err); done(); });

  });
});
