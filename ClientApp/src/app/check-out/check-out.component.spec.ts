import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOutComponent } from './check-out.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

describe('CheckOutComponent', () => {
  let component: CheckOutComponent;
  let fixture: ComponentFixture<CheckOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckOutComponent],
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule, 
        RouterModule.forRoot([
          { path: 'check-out', component: CheckOutComponent }
        ])],
      providers: [{ provide: Router,  useClass: class { navigate = jasmine.createSpy("navigate"); }}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
