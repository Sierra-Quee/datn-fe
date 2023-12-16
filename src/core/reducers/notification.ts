import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { INotification } from "../../utils/model";
import {
    getAllNotificationsApi,
    updateSeenNotificationApi,
} from "../../api/notification/notificationApi";

interface INotificationSlice {
    notificationList: INotification[];
    isLoadingNotificationList: boolean;
    updateSeenNotification: {
        isUpdatingNotification: boolean;
        updateNotificationStatus: "none" | "success" | "failed";
    };
}

const initialState: INotificationSlice = {
    notificationList: [],
    isLoadingNotificationList: false,
    updateSeenNotification: {
        isUpdatingNotification: false,
        updateNotificationStatus: "none",
    },
};

export const getAllNotificationsAsync = createAsyncThunk(
    "getAllNotification",
    async () => {
        const response = await getAllNotificationsApi();
        return response.data;
    }
);

export const updateSeenNotificationAsync = createAsyncThunk(
    "updateSeenNotification",
    async (notificationId: string) => {
        const response = await updateSeenNotificationApi(notificationId);
        return response.data;
    }
);

export const NotificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        reset: (state) => {
            return initialState;
        },
        setAllNotificationList: (state, action) => {
            state.notificationList = action.payload;
        },
        clearNotificationList: (state, action) => {
            state.notificationList = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllNotificationsAsync.pending, (state, action) => {
                state.isLoadingNotificationList = true;
            })
            .addCase(getAllNotificationsAsync.fulfilled, (state, action) => {
                state.isLoadingNotificationList = false;
                state.notificationList = action.payload;
            })
            .addCase(getAllNotificationsAsync.rejected, (state, action) => {
                state.isLoadingNotificationList = false;
            })
            .addCase(updateSeenNotificationAsync.pending, (state, action) => {
                state.updateSeenNotification.isUpdatingNotification = true;
            })
            .addCase(updateSeenNotificationAsync.fulfilled, (state, action) => {
                state.updateSeenNotification.isUpdatingNotification = false;
                state.updateSeenNotification.updateNotificationStatus =
                    "success";
            })
            .addCase(updateSeenNotificationAsync.rejected, (state, action) => {
                state.updateSeenNotification.isUpdatingNotification = false;
                state.updateSeenNotification.updateNotificationStatus =
                    "failed";
            });
    },
});

export default NotificationSlice.reducer;

export const { setAllNotificationList, clearNotificationList } =
    NotificationSlice.actions;
