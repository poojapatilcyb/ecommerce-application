import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { addUser } from '../state/user.action';
import { User } from '../state/user.state';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
 
  constructor(
    private store: Store<AppState>
  ){}
  profileForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('')
  });

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
    if(this.profileForm?.value?.name && this.profileForm?.value?.email) {
    const user: User = {
      name: this.profileForm?.value?.name,
      email: this.profileForm?.value?.email
    }
      this.store.dispatch(addUser({user}))
  }
  }
}
