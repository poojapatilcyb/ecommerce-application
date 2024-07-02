import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, of } from 'rxjs';
import { increment, decrement, reset } from '../counter.actions';
import { CounterState } from '../counter.state';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent implements OnInit, OnDestroy{
  count$: Observable<{counter: number}> = of({counter: 0});
  // counterSubscription: Subscription |undefined;
  constructor(private store: Store<{ count: CounterState}>) {

  }
  ngOnInit(): void {
    // this is how you can subscribe to store and get the value
    // this.counterSubscription = this.store.select('count').subscribe((count) => {
    //   this.count = count.counter;
    // });
    // this is another way you can get the value from store
    this.count$ = this.store.select('count');
  }
  ngOnDestroy(): void {
    // if(this.counterSubscription) {
    //   this.counterSubscription.unsubscribe();
    // }
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }
}
