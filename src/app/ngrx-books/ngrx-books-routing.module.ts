import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookCollectionComponent } from './book-collection/book-collection.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookComponent } from './book/book.component';

const routes: Routes = [
  {
    path:'',
    component: BookComponent,
    children: [
      {
        path: 'collection',
        component: BookCollectionComponent
      },
      {
        path: 'list',
        component: BookListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NgrxBooksRoutingModule { }
