import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "../core/reducers/authentication";
import registerReducer from "../core/reducers/register";
import skillReducer from "../core/reducers/skill";

export const store = configureStore({
    reducer: {
        authentication: authenticationReducer,
        register: registerReducer,
        skillAll: skillReducer,
    },
});

// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
