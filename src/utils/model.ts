import { ReactElement, ReactNode } from "react";
import { UserStatus } from "../core/reducers/users";

export interface IChildRoutePath {
    children: ReactNode;
    breadcrumb?: string[];
}

export interface IRoutePath {
    path: string;
    component: (props: any) => ReactElement;
    layout?: ({ children }: IChildRoutePath) => ReactElement;
}

export interface ISkill {
    skillId?: number;
    name: string;
    createdAt?: string;
    updatedAt?: string;
    image: string;
    isActive?: boolean;
}
export interface IService {
    serviceId: string;
    name: string;
    type: ITypeService | string;
    price: number;
    rate: number;
    desc: string;
    createdAt: string;
    updatedAt: string;
    skillId: number;
    skill?: ISkill[];
    image?: string;
    isActive: boolean;
    malfunctions?: IMalfunction;
}

export enum ITypeService {
    MainTain = 1,
    Repair = 2,
}

export interface ICreateService {
    name: string;
    type: ITypeService;
    price: number;
    desc: string;
    skillId: number;
}

export interface ICartItem {
    id?: number;
    isChoosen: boolean;
    cartId: string | number;
    serviceId: string;
    service?: any;
}

export interface ICart {
    cartId: number;
    updatedAt: string;
    userId: string;
}

export interface IUserAPI {
    name?: string;
    role: number;
    status?: number;
}
export interface IUser {
    userId: string;
    accountName: string;
    firstName: string;
    lastName: string;
    dob: string;
    phone: string;
    email: string;
    imageUrl?: string;
    role: number;
    gender: boolean | string;
    createdAt: string;
    updatedAt: string;
    status: UserStatus;
    // address: IAddress[];
    skills?: string[] | { skillId: number }[];
}
export const defaultUser = {
    userId: "",
    accountName: "",
    firstName: "",
    lastName: "",
    dob: "",
    phone: "",
    email: "",
    imageUrl: "",
    role: -1,
    gender: false,
    createdAt: "",
    updatedAt: "",
    status: -1,
    skills: [],
    address: [],
};
export interface IAddress {
    addressId?: number;
    userId: string;
    address: string;
    isMainAddress: boolean;
    longitude?: number;
    latitude?: number;
    isActive?: boolean;
}

export interface IReview {
    reviewId?: number;
    rate: number;
    content: string;
    userId: string;
    serviceId?: number;
    createdAt?: string;
    updatedAt?: string;
    user?: IUser;
}

export interface IOrderMedia {
    orderMediaId?: number | string;
    orderDetailId?: number | string;
    mediaType: number;
    url: string;
    alt?: string;
}
export interface IDetailOrder {
    orderDetailId?: number | string;
    orderId?: number | string;
    serviceId: string;
    desc?: string;
    media?: IOrderMedia[];
    service?: IService;
    diagnosis?: IDiagnosis[];
}
export interface IOrder {
    orderId?: number | string;
    code?: string;
    status?: number;
    expectedDate: string;
    repairmanId?: string;
    addressId: number;
    inccuredCost?: number;
    inccuredCostReason?: string;
    orderDetails?: IDetailOrder[];
    orderDetail?: IDetailOrder[];
    createdAt?: string;
    updatedAt?: string;
    address?: IAddress;
    components?: IComponent;
    repairman?: IUser;
    user?: IUser;
}

export interface IDiagnosis {
    diagnosisId: string;
    orderDetailId: string;
    malfuncId: string;
    isAccepted: boolean;
    malfunction: IMalfunction;
}

export interface IComponent {
    componentId: string;
    name: string;
    quantity: number;
    unit: string;
    pricePerUnit: number;
    brand: string;
    model: string;
    supplier: string;
    orderId: string;
}
export interface INotification {
    userId: string;
    isSeen: boolean;
    content: string;
    notificationId: string;
    createdAt: string;
}

export interface IMalfunction {
    malFuncId: number;
    name: string;
    price: number;
    serviceId: number;
    service?: any;
}
export const defaultMalfunction = {
    malFuncId: -1,
    name: "",
    price: -1,
    serviceId: -1,
    service: {},
};
export interface ISystemConfig {
    id: number;
    assignOrderInterval: number;
    distanceToAssignOrder: number;
    switchRepairmanStatusPeriod: number;
}
