import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterState } from '../counter.state';
import { customIncrement } from '../counter.actions';

@Component({
  selector: 'app-custom-counter',
  templateUrl: './custom-counter.component.html',
  styleUrl: './custom-counter.component.scss'
})
export class CustomCounterComponent {
  value: number = 0;
  constructor(private store: Store<{ count: CounterState}>){}
  add() {
    this.store.dispatch(customIncrement({incrementCountValue: +this.value}))
  }
}
