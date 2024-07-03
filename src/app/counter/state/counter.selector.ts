import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CounterState } from "./counter.state";

const getCounterState = createFeatureSelector<CounterState>('count');

export const getCounter = createSelector(getCounterState, state => {
    return state.counter;
});

export const getUserName = createSelector(getCounterState, state => {
    return state.userName;
});