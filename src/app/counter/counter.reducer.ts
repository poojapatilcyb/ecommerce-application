import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset, customIncrement, updateUserName } from './counter.actions';
import { initialState } from './counter.state';


export const _counterReducer = createReducer(
  initialState,
  on(increment, (state) => {
    return {
      ...state,
      counter: state.counter + 1,
    }
  }),
  on(decrement, (state) => {
    return {
      ...state,
      counter: state.counter - 1,
    }
  }),
  on(reset, (state) => {
    return {
      ...state,
      counter: 0,
    }
  }),
  on(customIncrement, (state, action)=> {
    return {
      ...state,
      counter: state.counter + action.incrementCountValue
    }
  }),
  on(updateUserName, (state, action)=> {
    return {
      ...state,
      userName: action.updatedValue
    }
  })
);

export function counterReducer(state: any, action: any) {
  return _counterReducer(state, action);
}