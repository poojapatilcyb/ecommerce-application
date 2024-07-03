import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterState } from '../counter.state';
import { customIncrement } from '../counter.actions';
import { getUserName } from '../counter.selector';
import * as counterActions from '../counter.actions'
@Component({
  selector: 'app-custom-counter',
  templateUrl: './custom-counter.component.html',
  styleUrl: './custom-counter.component.scss'
})
export class CustomCounterComponent implements OnInit{
  value: number = 0;
  username: string = '';
  uservalue: string = '';
  constructor(private store: Store<{ count: CounterState}>){}

  ngOnInit(): void {
    this.store.select(getUserName).subscribe((data)=> {
      this.username= data;
    })
  }
  add() {
    this.store.dispatch(customIncrement({incrementCountValue: +this.value}))
  }
  changeName(){
    this.store.dispatch(counterActions.updateUserName({updatedValue: this.uservalue}))
  }
}
