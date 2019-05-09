import { Product } from './product';

describe('Product', () => {
  it('should create an instance', () => {
    expect(new Product('name', 'description', 2.50, 1)).toBeTruthy();
  });
});
