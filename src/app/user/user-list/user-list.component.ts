import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { User } from '../state/user.state';
import { getUserData } from '../state/user.selector';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit{
 
  users: User[] = [];
  constructor(
    private store: Store<AppState>
  ){}

  ngOnInit(): void {
    this.store.select(getUserData).subscribe((data)=>{
      this.users = data;
    });
  }
}
