export enum RoutePath {
    Home = "/",
    Introduce = "/introduction",
    Order = "/list-order",
    Comment = "list-order-comment",
    Skill = "/skill",
    Service = "/service",
    Employee = "/list-employee",
    Customer = "/list-customer",
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
    RoutePath.Contact,
    RoutePath.HomeNews,
    RoutePath.Introduce,
    RoutePath.Introduce,
    RoutePath.Library,
    RoutePath.Login,
    RoutePath.News,
    RoutePath.SaleNew,
    RoutePath.Service,
    RoutePath.SignUp,
];

// Need sign in
export const PrivateRoutes = [
    RoutePath.Cart,
    RoutePath.Contact,
    RoutePath.HomeNews,
    RoutePath.Introduce,
    RoutePath.Introduce,
    RoutePath.Library,
    RoutePath.Login,
    RoutePath.News,
    RoutePath.SaleNew,
    RoutePath.Service,
    RoutePath.SignUp,
];
