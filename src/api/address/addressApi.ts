import { IAddress } from "../../utils/model";
import fetchHandler from "../axios";

export const getAllAddress = (userId: string) => {
    return fetchHandler.get(`address/getAllAddress/${userId}`);
};

export const createAddress = (address: IAddress) => {
    return fetchHandler.post(`address/createAddress`, address);
};

export const updateAddress = (address: IAddress) => {
    return fetchHandler.patch(`address/updateAddress`, address);
};

export const deleteAddress = (addressId: number) => {
    return fetchHandler.patch(`address/deleteAddress/${addressId}`);
};
