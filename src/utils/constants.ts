export enum RoutePath {
    Home = "/home",
    IntroduceServices = "/introduce-services",
    Contact = "/contact",
    Introduce = "/introduction",
    Order = "/list-order",
    Comment = "/list-order-comment",
    Skill = "/skill",
    Service = "/services",
    Malfunction = "/malfunction",
    Employee = "/list-employee",
    Customer = "/list-customer",
    Admin = "/list-admin",
    Login = "/login",
    SignUp = "/sign-up",
    Account = "/account",
    CustomerAccount = "/user/my-profile",
    CustomerPassword = "/user/password",
    CustomerAddress = "/user/address",
    CustomerCart = "/user/cart",
    Checkout = "/checkout",
    CustomerOrder = "/user/order",
    SystemConfig = "/system-config",
    Review = "/review",
    SearchService = "/search-service",
}

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
export enum OrderStatus {
    PENDING,
    REJECTED,
    FINDING,
    ACCEPTED,
    CHECKEDIN,
    UNPAID,
    COMPLETE,
}
export const XLSX_TYPE =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
export const XLS_TYPE = "application/vnd.ms-excel";
