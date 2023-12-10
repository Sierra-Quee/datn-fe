import { ReactElement, ReactNode } from "react";
import { UserStatus } from "../core/reducers/users";

export interface IChildRoutePath {
    children: ReactNode;
}

export interface IRoutePath {
    path: string;
    component: () => ReactElement;
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
    skill?: ISkill;
    image?: string;
    isActive: boolean;
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
    id: number;
    isChoosen: boolean;
    cartId: string;
    serviceId: string;
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

export interface IOrder {
    orderId: number;
    code: string;
    status: number;
    expectDate: string;
    repairmanId: string;
    addressId: number;
    incurredCost: number;
    incurredCostReason: string;
    orderDetail: string[];
}
export const defaultOrder = {
    orderId: 0,
    code: "",
    status: 0,
    expectDate: "",
    repairmanId: "",
    addressId: 0,
    incurredCost: 0,
    incurredCostReason: "",
    orderDetail: [],
};

export interface IMalfunction {
    malFuncId: number;
    name: string;
    price: number;
    serviceId: number;
    service: any;
}
