export interface ISkill {
    skillId: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    image?: string;
}
export interface IService {
    serviceId: number;
    name: string;
    type: number;
    price: number;
    rate: number;
    desc: string;
    createdAt: string;
    updatedAt: string;
    skillId: string;
    skill: ISkill;
    image?: string;
    // isActive: boolean;
}
export interface ICreateService {
    name: string;
    type: number;
    price: number;
    desc: string;
    skillId: string;
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
