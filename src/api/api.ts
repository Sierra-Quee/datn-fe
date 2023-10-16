import { ILogIn, ISignUp } from "../feature/Auth/model";
import fetchHandler from "./axios";

export const signUpApi = (body: ISignUp) => {
    return fetchHandler.post("/auth/signup", body);
};
export const logInApi = (body: ILogIn) => {
    return fetchHandler.post("/auth/signin", body);
};
export const updateToken = () => {
    return fetchHandler.post("/auth/updateRefreshToken");
};
