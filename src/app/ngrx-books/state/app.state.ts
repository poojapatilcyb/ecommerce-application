import { Book } from '../model/book.model';

export interface AppState {
    books: ReadonlyArray<Book>;
    collection: ReadonlyArray<string>;
}