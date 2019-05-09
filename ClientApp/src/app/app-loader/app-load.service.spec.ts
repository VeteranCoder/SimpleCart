import { async, inject, TestBed } from '@angular/core/testing';
import { AppLoadService } from './app-load.service';
import { AppLoadModule } from './app-loader.module';


describe('AppLoadService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [AppLoadModule],
      providers: []
    })
    .compileComponents();
  }));

  it('should be created', inject([AppLoadService], (service: AppLoadService) => {
    expect(service).toBeTruthy();
  }));
});
