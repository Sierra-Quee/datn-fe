import Cookies from "js-cookie";

export const setCookie = (key: string, value: string): void => {
    Cookies.set(key, value, { expires: 1 / 24 });
};

export const getCookie = (key: string): string | undefined => {
    return Cookies.get(key);
};

export const clearCookie = (): void => {
    Object.keys(Cookies.get()).forEach((cookieName: string) => {
        Cookies.remove(cookieName);
    });
};
