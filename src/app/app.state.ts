import { ProductState } from "./state/product.state";
import { CounterState } from './counter/state/counter.state';
import { counterReducer } from "./counter/state/counter.reducer";
import { booksReducer } from "./ngrx-books/state/books.reducer";
import { collectionReducer } from "./ngrx-books/state/collection.reducer";
import { productReducer } from "./state/product.reducer";
import { BookState } from "./ngrx-books/state/books.state";

export interface AppState {
    counter: CounterState;
    product: ProductState;
    bookState: BookState;
}

export const AppReducer = {
    count: counterReducer,
    books: booksReducer,
    collection: collectionReducer,
    product: productReducer
}