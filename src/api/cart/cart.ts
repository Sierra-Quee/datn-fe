import { ICart, ICartItem } from "../../utils/model";
import fetchHandler from "../axios";

export const getCart = () => {
    return fetchHandler.get("/cart/getCart");
};

export const createCartItem = (cartItem: ICartItem) => {
    return fetchHandler.post("/cart/createCartItem", cartItem);
};

export const deleteCartItem = (cartItemId: string) => {
    return fetchHandler.delete(`/cart/deleteCartItem/${cartItemId}`);
};
