import { ProductState } from "./state/product.state";
import { CounterState } from './counter/counter.state';

export interface AppState {
    counter: CounterState,
    product: ProductState
}