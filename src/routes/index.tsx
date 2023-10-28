export enum RoutePath {
    Home = "/",
    Introduce = "/gioithieu",
    Service = "/dichvu",
    HomeServices = "/dichvu/homeservices",
    SolarServices = "/dichvu/solarservices",
    OperationServices = "/dichvu/operationservices",
    ITServices = "/dichvu/itservices",
    ComboService = "/dichvu/combo",
    News = "/tintuc",
    HomeNews = "/tintuc/meovatgiadinh",
    SaleNew = "/tintuc/chuongtrinhkhuyenmai",
    Cart = "/giohang",
    Library = "/thuvien",
    Contact = "/lienhe",
    Login = "/login",
    SignUp = "/sign-up",
    Account = "/account",
}

// Dont need sign in
export const PublicRoutes = [
    RoutePath.Cart,
    RoutePath.ComboService,
    RoutePath.Contact,
    RoutePath.HomeNews,
    RoutePath.ITServices,
    RoutePath.Introduce,
    RoutePath.Introduce,
    RoutePath.Library,
    RoutePath.Login,
    RoutePath.News,
    RoutePath.OperationServices,
    RoutePath.SaleNew,
    RoutePath.Service,
    RoutePath.SignUp,
    RoutePath.SolarServices,
];

// Need sign in
export const PrivateRoutes = [
    RoutePath.Cart,
    RoutePath.ComboService,
    RoutePath.Contact,
    RoutePath.HomeNews,
    RoutePath.ITServices,
    RoutePath.Introduce,
    RoutePath.Introduce,
    RoutePath.Library,
    RoutePath.Login,
    RoutePath.News,
    RoutePath.OperationServices,
    RoutePath.SaleNew,
    RoutePath.Service,
    RoutePath.SignUp,
    RoutePath.SolarServices,
];
