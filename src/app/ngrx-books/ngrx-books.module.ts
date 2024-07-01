import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgrxBooksRoutingModule } from './ngrx-books-routing.module';
import { BookCollectionComponent } from './book-collection/book-collection.component';
import { BookListComponent } from './book-list/book-list.component';
import { StoreModule } from '@ngrx/store';
import { booksReducer } from './state/books.reducer';
import { collectionReducer } from './state/collection.reducer';
import { BookComponent } from './book/book.component';


@NgModule({
  declarations: [
    BookCollectionComponent,
    BookListComponent,
    BookComponent
  ],
  imports: [
    CommonModule,
    // StoreModule.forRoot({ books: booksReducer, collection: collectionReducer }),
    NgrxBooksRoutingModule
  ]
})
export class NgrxBooksModule { }
