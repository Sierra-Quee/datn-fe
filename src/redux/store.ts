import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "../core/reducers/authentication";
import registerReducer from "../core/reducers/register";
import skillReducer from "../core/reducers/skill";
import serviceReducer from "../core/reducers/service";
import imageCloudReducer from "../core/reducers/image_cloud";

export const store = configureStore({
    reducer: {
        authentication: authenticationReducer,
        register: registerReducer,
        skill: skillReducer,
        service: serviceReducer,
        imageCloud: imageCloudReducer,
    },
});

// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
