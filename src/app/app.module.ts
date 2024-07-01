import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CategoryModule } from "./category/category.module";
import { FilterModule } from "./filter/filter.module";
import { ErrorHandlerInterceptor } from './service/interceptors/error-handler.service';
import { StoreModule } from '@ngrx/store';
import { CardModule } from './card/card.module';
import { counterReducer } from '../app/counter/counter.reducer';
import { EffectsModule } from '@ngrx/effects';
import { booksReducer } from './ngrx-books/state/books.reducer';
import { collectionReducer } from './ngrx-books/state/collection.reducer';
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    CategoryModule,
    CardModule,
    FilterModule,
    AppRoutingModule,
    StoreModule.forRoot(
      {
        count: counterReducer,
        books: booksReducer,
        collection: collectionReducer
      }
    ),
    EffectsModule.forRoot([])
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
