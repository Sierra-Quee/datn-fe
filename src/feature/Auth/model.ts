export enum UserRole {
    Customer = 0,
    Engineer = 1,
    Admin = 2,
    Guest = 3,
}

export interface ISignUp {
    firstName: string;
    lastName: string;
    dob: string;
    phone: string;
    email: string;
    gender: true;
    password: string;
}

export interface ILogIn {
    phone: string;
    password: string;
}

export interface IAccountUser {
    firstName: string;
    lastName: string;
    dob: string;
    phone: string;
    email: string;
    role: string;
}
