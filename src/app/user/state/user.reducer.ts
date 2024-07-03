import { createReducer, on } from "@ngrx/store";
import { userInitialState } from "./user.state";
import * as userAction from "./user.action";

export const _userReducer = createReducer(
    userInitialState,
    on(userAction.loadUser, (state) => {
        return {
            ...state,
            user: state.user
        }
    }),

    on(userAction.addUser, (state, action) => {

        let post = {...action.user};
        // post.id = (state.user.length +1 ).toString();
        return {
            ...state,
            user: [...state.user, post]
        }
    }),
)

export function userReducer(state: any, action: any) {
    return _userReducer(state, action);
}