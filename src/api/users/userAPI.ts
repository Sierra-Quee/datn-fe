import { IUser, IUserAPI } from "../../utils/model";
import fetchHandler from "../axios";

export const getAllUsersRole = (role: number) => {
    return fetchHandler.get(`/user/getAll?role=${role}`);
};
export const getAllUsersName = (name: string) => {
    return fetchHandler.get(`/user/getAll?name=${name}`);
};
export const getAllUsersStatus = (status: number) => {
    return fetchHandler.get(`/user/getAll?status=${status}`);
};
export const filterUsers = (body: IUserAPI) => {
    return fetchHandler.get(
        `/user/getAll?name=${body.name}&&role=${body.role}&&status=${body.status}`
    );
};
export const getDetailUserAPI = (userId: string) => {
    return fetchHandler.get(`/user/${userId}`);
};
export const createUserAPI = (user: IUser) => {
    return fetchHandler.post(`user/createUser`, user);
};
export const updateUserAPI = (user: IUser) => {
    return fetchHandler.patch(`user/updateUser`, user);
};
export const updateStatusCustomerAPI = (userId: string) => {
    return fetchHandler.patch(`user/switchUserActiveStatus/${userId}`);
};
