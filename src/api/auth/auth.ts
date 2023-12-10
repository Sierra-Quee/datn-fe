import {
    IAccount,
    IChangePassword,
    ILoginParams,
} from "../../core/reducers/authentication";
import { IRegisterParams } from "../../core/reducers/register";
import fetchHandler from "../axios";

export const signUpApi = (body: IRegisterParams) => {
    return fetchHandler.post("/auth/signup", body);
};
export const logInApi = (body: ILoginParams) => {
    return fetchHandler.post("/auth/signin", body);
};

export const updateTokenAPI = () => {
    return fetchHandler.post("/auth/updateRefreshToken");
};

export const resendOtpAPI = (phone: string, email: string) => {
    return fetchHandler.post("/auth/resendOtp", null, {
        params: {
            phone,
            email,
        },
    });
};

export const verifyOtpAPI = (otp: string, userId: string) => {
    return fetchHandler.post("/auth/verifyOtp", null, {
        params: {
            otp,
            userId,
        },
    });
};

export const getAccountAPI = () => {
    return fetchHandler.get("/auth/getProfile");
};

export const updateProfileAPI = (newProfile: IAccount) => {
    return fetchHandler.patch("/user/updateProfile", newProfile);
};

export const changePasswordAPI = (body: IChangePassword) => {
    return fetchHandler.patch("/user/changePassword", body);
};
