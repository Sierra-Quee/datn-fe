import axios from "axios";
import { clearCookie, getCookie } from "../utils/functions/cookies";
import { ACCESS_TOKEN } from "../utils/constants";
import { log } from "console";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
        config.headers.Authorization = getAuthorizationHeader();

        return config;
    },
    (err) => {
        console.log(err);
    }
);
export default fetchHandler;

fetchHandler.interceptors.response.use(
    (value) => {
        return value;
    },
    (err) => {
        if (err.response.status === 500) {
            clearCookie();
        }
        if (err.response.status !== 500 && err.response.status !== 401) {
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

        // return err;
    }
);
