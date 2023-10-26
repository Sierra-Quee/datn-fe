import { ILoginParams } from "../../core/reducers/authentication";
import { IRegisterParams } from "../../core/reducers/register";
import fetchHandler from "../axios";

export const signUpApi = (body: IRegisterParams) => {
    return fetchHandler.post("/auth/signup", body);
};
export const logInApi = (body: ILoginParams) => {
    return fetchHandler.post("/auth/signin", body);
};

export const updateToken = () => {
    return fetchHandler.post("/auth/updateRefreshToken");
};

export const getAccountAPI = () => {
    return fetchHandler.get("/auth/getProfile");
};

export const updateProfileAPI = () => {
    return fetchHandler.post("/user/updateProfile");
};
