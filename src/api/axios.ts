import axios from "axios";
import { toast } from "react-toastify";

import { ACCESS_TOKEN } from "../utils/constants";
import { clearCookie, getCookie } from "../utils/functions/cookies";

export const getAuthorizationHeader = () => `Bearer ${getCookie(ACCESS_TOKEN)}`;

const fetchHandler = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 30000,
    headers: {
        Authorization: getAuthorizationHeader(),
        "Cache-Control": "no-cache",
    },
});

fetchHandler.interceptors.request.use(
    (config) => {
        // spinning start to show
        // UPDATE: Add this code to show global loading indicator
        document.body.classList.add("loading-indicator");

        config.headers.Authorization = getAuthorizationHeader();

        return config;
    },
    (err) => {
        console.log(err);

        return Promise.reject(err);
    }
);
export default fetchHandler;

fetchHandler.interceptors.response.use(
    (value) => {
        // spinning hide
        // UPDATE: Add this code to hide global loading indicator
        document.body.classList.remove("loading-indicator");
        return value;
    },
    (err) => {
        // spinning hide
        // UPDATE: Add this code to hide global loading indicator
        document.body.classList.remove("loading-indicator");

        if (err.response.status === 401) {
            clearCookie();
        }
        if (err.response.status !== 401) {
            toast.error(err.message);
            if (err.response.data && err.response.data.message) {
                if (Array.isArray(err.response.data.message)) {
                    err.response.data.message.forEach((mess: string) =>
                        toast.error(mess)
                    );
                } else {
                    toast.error(err.response.data.message);
                }
            }
        }
        return Promise.reject(err);
        // return err;
    }
);
