import { createAction, props } from "@ngrx/store";
import { User } from "./user.state";

export const loadUser = createAction('[User Component] loadUser');
export const addUser = createAction('[User Component] addUser',
    props<{user: User}>()
);