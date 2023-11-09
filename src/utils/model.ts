import { ReactElement, ReactNode } from "react";
import { PublicProps } from "../layouts/Public/Public";

export interface IRoutePath {
    path: string;
    component: () => ReactElement;
    layout?: (children: PublicProps) => ReactElement;
}

export interface ISkill {
    skillId?: number;
    name: string;
    createdAt?: string;
    updatedAt?: string;
    imageUrl: string;
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
