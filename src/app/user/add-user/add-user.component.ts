import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { addUser, updateUser } from '../state/user.action';
import { User } from '../state/user.state';
import { ActivatedRoute } from '@angular/router';
import { getUserDataById } from '../state/user.selector';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent implements OnInit {
 
  isEdit: boolean = false;
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
  ){}
  profileForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl('')
  });

  ngOnInit(): void {
        // Check if the 'categoryId' parameter is present in the route
        this.route.paramMap.subscribe({
          next: (params) => { 
            const id = params.get('id');
            if (id) {
              this.isEdit = true;
              this.store.select(getUserDataById({id: id})).subscribe((user)=> {
                this.profileForm.patchValue({
                  id: user?.id,
                  name: user?. name,
                  email: user?.email
                })
              })
            } 
           },
          error: (error: string) => { console.log(error) },
          complete: () => { console.log('complete getProducts Observable')}
        });
  }
  onSubmit() {
    if(this.profileForm?.value?.name && this.profileForm?.value?.email) {
      let user: User;
      if(this.isEdit && this.profileForm.value.id){
        user = {
          id: this.profileForm.value.id,
          name: this.profileForm?.value?.name,
          email: this.profileForm?.value?.email
        }
        this.store.dispatch(updateUser({user}));
      }else{
        user = {
          name: this.profileForm?.value?.name,
          email: this.profileForm?.value?.email
        }
        this.store.dispatch(addUser({user}));
      }
    }
  }
}
