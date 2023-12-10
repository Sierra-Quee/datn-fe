import CustomerProfile from "../common/Account/Profile/CustomerProfile";
import Contact from "../common/Contact/Contact";
import HomePage from "../common/HomePage/HomePage";
import Introduce from "../common/Introduce/Introduce";
import IntroduceServices from "../common/IntroduceServices/IntroduceServices";
import LogIn from "../common/Login/LogIn";
import SignUp from "../common/Signup/SignUp";
import CustomerProfileLayout from "../layouts/CustomerLayout/CustomerProfileLayout";
import Public from "../layouts/Public/Public";
import { IRoutePath } from "../utils/model";
import CustomerPassword from "../common/Account/Password/CustomerPassword";
import Address from "../common/Account/Address/Address";
import Cart from "../common/Cart/Cart";
import DetailService from "../common/IntroduceServices/DetailService/DetailService";
import Checkout from "../common/Checkout/Checkout";
import CustomerOrder from "../common/CustomerOrder/CustomerOrder";
import OrderDetail from "../common/CustomerOrder/OrderDetail/OrderDetail";

export enum RoutePath {
    Home = "/home",
    IntroduceServices = "/introduce-services",
    Contact = "/contact",
    Introduce = "/introduction",
    Order = "/list-order",
    Comment = "list-order-comment",
    Skill = "/skill",
    Service = "/services",
    Employee = "/list-employee",
    Customer = "/list-customer",
    Login = "/login",
    SignUp = "/sign-up",
    Account = "/account",
    CustomerAccount = "/user/my-profile",
    CustomerPassword = "/user/password",
    CustomerAddress = "/user/address",
    CustomerCart = "/user/cart",
    Checkout = "/checkout",
    CustomerOrder = "/user/order",
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
];

export const AdminRoutes = [RoutePath.Skill];

export const EmployeeRoutes = [];

export const CustomerRoutes = [];
