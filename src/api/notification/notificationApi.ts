import fetchHandler from "../axios";

export const getAllNotificationsApi = () => {
    return fetchHandler.get("/notification/getAllNotification");
};

export const updateSeenNotificationApi = (notificationId: string) => {
    return fetchHandler.patch(`/notification/updateSeen/${notificationId}`);
};
