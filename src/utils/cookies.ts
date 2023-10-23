import Cookies from "js-cookie";

export const setCookie = (key: string, value: string): void => {
    Cookies.set(key, value, { expires: 1 });
};

export const getCookie = (key: string): string | undefined => {
    return Cookies.get(key);
};

export const clearCookie = (): void => {};
