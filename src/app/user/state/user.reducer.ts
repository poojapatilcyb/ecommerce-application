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
        post.id = (state.user.length + 1 ).toString();
        return {
            ...state,
            user: [...state.user, post]
        }
    }),

    on(userAction.updateUser, (state, action) => {
        const updatedPost = state.user.map((user)=> {
            return action.user.id === user.id ? action.user : user 
        })
        return {
            ...state,
            user: updatedPost
        }
    }),

    on(userAction.deleteUser, (state, action) => {
        const updatedPost = state.user.filter((user)=> user.id !== action.id)
        return {
            ...state,
            user: updatedPost
        }
    }),
)

export function userReducer(state: any, action: any) {
    return _userReducer(state, action);
}