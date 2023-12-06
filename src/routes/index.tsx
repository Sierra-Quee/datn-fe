import Order from "../admin/Order/Order";
import Skill from "../admin/Skill/Skill";
import SystemCustomer from "../admin/User/SystemCustomer/SystemCustomer";
import SystemRepairment from "../admin/User/SystemRepairment/SystemRepairment";
import Contact from "../common/Contact/Contact";
import Home from "../common/Home/Home";
import HomePage from "../common/HomePage/HomePage";
import Introduce from "../common/Introduce/Introduce";
import IntroduceServices from "../common/IntroduceServices/IntroduceServices";
import LogIn from "../common/Login/LogIn";
import SignUp from "../common/Signup/SignUp";
import Public from "../layouts/Public/Public";
import { IRoutePath } from "../utils/model";
import AdminServiceRoute from "./adminServiceRoute";

export enum RoutePath {
    Home = "/home",
    IntroduceServices = "/introduce-services",
    Contact = "/contact",
    Introduce = "/introduction",
    Order = "/list-order",
    Comment = "/list-order-comment",
    Skill = "/skill",
    Service = "/services",
    Employee = "/list-employee",
    Customer = "/list-customer",
    Admin = "/list-admin",
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

export const AdminAccessRoutes: IRoutePath[] = [
    {
        path: RoutePath.Home,
        component: Home,
    },
    { path: RoutePath.Order, component: Order },
    {
        path: RoutePath.Skill,
        component: Skill,
    },
    { path: `${RoutePath.Service}/*`, component: AdminServiceRoute },
    { path: RoutePath.Employee, component: SystemRepairment },
    { path: RoutePath.Customer, component: SystemCustomer },
];

export const EmployeeRoutes = [];

export const CustomerRoutes = [];
