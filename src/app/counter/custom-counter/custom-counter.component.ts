import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterState } from '../state/counter.state';
import { customIncrement } from '../state/counter.actions';
import { getUserName } from '../state/counter.selector';
import * as counterActions from '../state/counter.actions'
import { AppState } from '../../app.state';
@Component({
  selector: 'app-custom-counter',
  templateUrl: './custom-counter.component.html',
  styleUrl: './custom-counter.component.scss'
})
export class CustomCounterComponent implements OnInit{
  value: number = 0;
  username: string = '';
  uservalue: string = '';
  constructor(private store: Store<AppState>){}

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
