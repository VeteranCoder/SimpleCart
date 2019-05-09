import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewCartComponent } from './view-cart.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ViewCartComponent],
  imports: [
    CommonModule, RouterModule
  ],
  exports: [ViewCartComponent]
})
export class ViewCartModule { }
