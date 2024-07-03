import { Book } from '../model/book.model';

export interface BookState {
    books: ReadonlyArray<Book>;
    collection: ReadonlyArray<string>;
}