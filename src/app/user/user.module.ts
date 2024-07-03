import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserListComponent,
    AddUserComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule
  ]
})
export class UserModule { }
