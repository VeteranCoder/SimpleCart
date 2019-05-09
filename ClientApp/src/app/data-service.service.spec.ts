import { TestBed } from '@angular/core/testing';

import { CartServerService } from './data-service.service';
import { HttpClientModule } from '@angular/common/http';

describe('DataServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [ ],
    imports: [ HttpClientModule ]
  }));

  it('should be created', () => {
    const service: CartServerService = TestBed.get(CartServerService);
    expect(service).toBeTruthy();
  });
});
