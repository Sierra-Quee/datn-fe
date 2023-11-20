import { RoutePath } from "../routes";

export const ACCESS_TOKEN = "access_token";
export const REFRESH_TOKEN = "refresh_token";
export const FORMAT_DATE = "DD/MM/YYYY";
export const FORMAT_DATETIME = "HH:mm:ss DD/MM/YYYY";
export const SIDEBAR = [
    {
        path: RoutePath.Home,
        key: "1",
    },
    {
        path: RoutePath.Order,
        key: "3",
        openKey: "2",
    },
    {
        path: RoutePath.Comment,
        key: "4",
        openKey: "2",
    },
    {
        path: RoutePath.Skill,
        key: "6",
        openKey: "5",
    },
    {
        path: RoutePath.Service,
        key: "7",
        openKey: "5",
    },
    {
        path: RoutePath.Employee,
        key: "9",
        openKey: "8",
    },
    {
        path: RoutePath.Customer,
        key: "10",
        openKey: "8",
    },
];
export const ADDRESS_API = "https://vapi.vnappmob.com/api";
