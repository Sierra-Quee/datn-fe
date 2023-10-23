import axios from "axios";
import { getCookie } from "../utils/cookies";
import { ACCESS_TOKEN } from "../utils/constants";

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
    function (config) {
        config.headers.Authorization = getAuthorizationHeader();

        return config;
    },
    (err) => {
        console.log(err);
    }
);
export default fetchHandler;
