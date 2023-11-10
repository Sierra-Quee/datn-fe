import Contact from "../common/Contact/Contact";
import HomePage from "../common/HomePage/HomePage";
import Introduce from "../common/Introduce/Introduce";
import IntroduceServices from "../common/IntroduceServices/IntroduceServices";
import LogIn from "../common/Login/LogIn";
import SignUp from "../common/Signup/SignUp";
import Public from "../layouts/Public/Public";
import { IRoutePath } from "../utils/model";

export enum RoutePath {
    Home = "/home",
    IntroduceServices = "/introduce-services",
    Contact = "/contact",
    Introduce = "/introduction",
    Order = "/list-order",
    Comment = "list-order-comment",
    Skill = "/skill",
    Service = "/service",
    Employee = "/list-employee",
    Customer = "/list-customer",
    Login = "/login",
    SignUp = "/sign-up",
    Account = "/account",
}

export const PublicRoutes: IRoutePath[] = [
    {
        path: "",
        component: HomePage,
        layout: Public,
    },
    {
        path: RoutePath.Contact,
        component: Contact,
        layout: Public,
    },
    {
        path: RoutePath.Introduce,
        component: Introduce,
        layout: Public,
    },
    {
        path: `${RoutePath.IntroduceServices}/:skillId`,
        component: IntroduceServices,
        layout: Public,
    },
    {
        path: RoutePath.Login,
        component: LogIn,
    },
    {
        path: RoutePath.SignUp,
        component: SignUp,
    },
];

export const AdminRoutes = [RoutePath.Skill];

export const EmployeeRoutes = [];

export const CustomerRoutes = [];
