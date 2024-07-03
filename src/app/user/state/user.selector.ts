import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.state";

const getUserState = createFeatureSelector<UserState>('user');

export const getUserData = createSelector(getUserState, (state) =>{
    return state.user;
})