import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "../core/reducers/authentication";
import registerReducer from "../core/reducers/register";
import skillReducer from "../core/reducers/skill";
import serviceReducer from "../core/reducers/service";
import usersReducer from "../core/reducers/users";
import malfunctionReducer from "../core/reducers/malfunction";
import imageCloudReducer from "../core/reducers/image_cloud";
import addressReducer from "../core/reducers/address";
import cartReducer from "../core/reducers/cart";
import reviewReducer from "../core/reducers/review";
import orderReducer from "../core/reducers/order";
import notificationReducer from "../core/reducers/notification";
import systemConfigReducer from "../core/reducers/system-config";

export const store = configureStore({
    reducer: {
        systemConfig: systemConfigReducer,
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
        orders: orderReducer,
        malfunction: malfunctionReducer,
    },
});

// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
