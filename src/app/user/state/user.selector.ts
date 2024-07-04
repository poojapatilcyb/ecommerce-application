import { createFeatureSelector, createSelector } from "@ngrx/store";
import { User, UserState } from "./user.state";

const getUserState = createFeatureSelector<UserState>('user');

export const getUserData = createSelector(getUserState, (state) =>{
    return state.user;
})
// export const getUserDataById = createSelector(getUserState, (state:any, props:any) =>{
//     return state.user[props.id];
// })
export const getUserDataById = (props: { id: string }) => 
    createSelector(
        getUserState,
      (state) => {
        return state.user.find(value => value.id === props.id);
           /// return state.user.filter(value => (value.id && props.id)  ? (value.id === props.id) : '' );
     }
  );