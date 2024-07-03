import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CounterRoutingModule } from './counter-routing.module';
import { CounterComponent } from './counter/counter.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './state/counter.reducer';
import { CustomCounterComponent } from './custom-counter/custom-counter.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CounterComponent,
    CustomCounterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    // StoreModule.forRoot({ count: counterReducer }),
    CounterRoutingModule
  ]
})
export class CounterModule { }
