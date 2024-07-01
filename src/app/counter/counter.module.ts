import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CounterRoutingModule } from './counter-routing.module';
import { CounterComponent } from './counter/counter.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './counter.reducer';


@NgModule({
  declarations: [
    CounterComponent
  ],
  imports: [
    CommonModule,
    // StoreModule.forRoot({ count: counterReducer }),
    CounterRoutingModule
  ]
})
export class CounterModule { }
