import Order from "../admin/Order/Order";
import Skill from "../admin/Skill/Skill";
import Malfunction from "../admin/SystemService/Malfunction/Malfunction";
import SystemCustomer from "../admin/User/SystemCustomer/SystemCustomer";
import SystemRepairment from "../admin/User/SystemRepairment/SystemRepairment";
import Address from "../common/Account/Address/Address";
import CustomerPassword from "../common/Account/Password/CustomerPassword";
import CustomerProfile from "../common/Account/Profile/CustomerProfile";
import Cart from "../common/Cart/Cart";
import Checkout from "../common/Checkout/Checkout";
import Contact from "../common/Contact/Contact";
import CustomerOrder from "../common/CustomerOrder/CustomerOrder";
import OrderDetail from "../common/CustomerOrder/OrderDetail/OrderDetail";
import Home from "../common/Home/Home";
import HomePage from "../common/HomePage/HomePage";
import Introduce from "../common/Introduce/Introduce";
import DetailService from "../common/IntroduceServices/DetailService/DetailService";
import IntroduceServices from "../common/IntroduceServices/IntroduceServices";
import LogIn from "../common/Login/LogIn";
import SignUp from "../common/Signup/SignUp";
import CustomerProfileLayout from "../layouts/CustomerLayout/CustomerProfileLayout";
import Public from "../layouts/Public/Public";
import { IRoutePath } from "../utils/model";
import AdminServiceRoute from "./adminServiceRoute";
import { RoutePath } from "../utils/constants";
import SystemConfig from "../admin/SystemConfig/SystemConfig";
import Notification from "../common/Notification/Notification";
import Review from "../admin/Review/Review";
import SearchService from "../common/IntroduceServices/SearchService/SearchService";
// export enum RoutePath {
//     Home = "/home",
//     IntroduceServices = "/introduce-services",
//     Contact = "/contact",
//     Introduce = "/introduction",
//     Order = "/list-order",
//     Comment = "/list-order-comment",
//     Skill = "/skill",
//     Service = "/services",
//     Malfunction = "/malfunction",
//     Employee = "/list-employee",
//     Customer = "/list-customer",
//     Admin = "/list-admin",
//     Login = "/login",
//     SignUp = "/sign-up",
//     Account = "/account",
//     CustomerAccount = "/user/my-profile",
//     CustomerPassword = "/user/password",
//     CustomerAddress = "/user/address",
//     CustomerCart = "/user/cart",
//     Checkout = "/checkout",
//     CustomerOrder = "/user/order",
// }

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
    {
        path: RoutePath.CustomerAccount,
        component: CustomerProfile,
        layout: CustomerProfileLayout,
    },
    {
        path: RoutePath.CustomerPassword,
        component: CustomerPassword,
        layout: CustomerProfileLayout,
    },
    {
        path: RoutePath.CustomerAddress,
        component: Address,
        layout: CustomerProfileLayout,
    },
    {
        path: RoutePath.CustomerCart,
        component: Cart,
        layout: Public,
    },
    {
        path: `${RoutePath.IntroduceServices}/:skillId/:serviceId`,
        component: DetailService,
        layout: Public,
    },
    {
        path: RoutePath.Checkout,
        component: Checkout,
        layout: Public,
    },
    {
        path: RoutePath.CustomerOrder,
        component: CustomerOrder,
        layout: CustomerProfileLayout,
    },
    {
        path: `${RoutePath.CustomerOrder}/:orderId`,
        component: OrderDetail,
        layout: Public,
    },
    {
        path: "user/notifications",
        component: Notification,
        layout: CustomerProfileLayout,
    },
    {
        path: RoutePath.SearchService,
        component: SearchService,
        layout: Public,
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
    {
        path: `${RoutePath.Malfunction}/:serviceId`,
        component: Malfunction,
    },
    {
        path: RoutePath.SystemConfig,
        component: SystemConfig,
    },
    {
        path: `${RoutePath.Order}/:orderId`,
        component: OrderDetail,
    },
    {
        path: RoutePath.Review,
        component: Review,
    },
];

export const EmployeeRoutes = [];

export const CustomerRoutes = [];
