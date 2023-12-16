import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "../core/reducers/authentication";
import registerReducer from "../core/reducers/register";
import skillReducer from "../core/reducers/skill";
import serviceReducer from "../core/reducers/service";
import usersReducer from "../core/reducers/users";
import imageCloudReducer from "../core/reducers/image_cloud";
import addressReducer from "../core/reducers/address";
import cartReducer from "../core/reducers/cart";
import reviewReducer from "../core/reducers/review";
import orderReducer from "../core/reducers/order";
import notificationReducer from "../core/reducers/notification";

export const store = configureStore({
    reducer: {
        notification: notificationReducer,
        order: orderReducer,
        review: reviewReducer,
        cart: cartReducer,
        address: addressReducer,
        authentication: authenticationReducer,
        register: registerReducer,
        skill: skillReducer,
        service: serviceReducer,
        imageCloud: imageCloudReducer,
        users: usersReducer,
    },
});

// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
