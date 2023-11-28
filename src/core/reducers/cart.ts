import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCart, createCartItem, deleteCartItem } from "../../api/cart/cart";
import { ICartItem } from "../../utils/model";

interface ICartSlice {
    cartItemList: ICartItem[];
    cartItemForCheckout: ICartItem[];
    loadingCart: boolean;
    cartItemQuantity: number;
    createCartItemStatus: "success" | "failed" | "none";
    loadingCreateCartItem: boolean;
    cartId: number;
}

const initialState: ICartSlice = {
    cartItemList: [],
    cartItemForCheckout: [],
    loadingCart: false,
    cartItemQuantity: 0,
    createCartItemStatus: "none",
    loadingCreateCartItem: false,
    cartId: 0,
};

export const getCartAsync = createAsyncThunk("getCart", async () => {
    const response = await getCart();
    return response.data;
});

export const createCartItemAsync = createAsyncThunk(
    "createCartItem",
    async (cartItem: ICartItem) => {
        const response = await createCartItem(cartItem);
        return response.data;
    }
);

export const deleteCartItemAsync = createAsyncThunk(
    "updateCartItem",
    async (cartItemId: string) => {
        const response = await deleteCartItem(cartItemId);
        return response.data;
    }
);

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        reset: (state) => {
            return initialState;
        },
        setCart: (state, action) => {
            state.cartItemList = action.payload;
            state.cartItemQuantity = state.cartItemList.length;
        },
        setItemsForCheckout: (state, action) => {
            state.cartItemForCheckout = action.payload;
        },
        addItemToCheckout: (state, action) => {
            state.cartItemForCheckout = [
                ...state.cartItemForCheckout,
                action.payload,
            ];
        },
        removeItemToCheckout: (state, action) => {
            const cloneCheckoutList = [...state.cartItemForCheckout];
            const removedItem = action.payload;
            const removedList = cloneCheckoutList.filter(
                (item) => item.id !== removedItem.id
            );
            return { ...state, cartItemForCheckout: removedList };
        },
        deleteItemFromCart: (state, action) => {
            const cloneCart = [...state.cartItemList];
            const removedItem = action.payload;
            const removedList = cloneCart.filter(
                (item) => item.id !== removedItem.id
            );
            return {
                ...state,
                cartItemList: removedList,
                cartItemQuantity: removedList.length,
            };
        },
        clearCart: (state) => {
            state.cartItemList = [];
            state.cartItemQuantity = 0;
        },
        clearCheckoutList: (state) => {
            state.cartItemForCheckout = [];
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(getCartAsync.pending, (state, action) => {
                state.loadingCart = true;
            })
            .addCase(getCartAsync.fulfilled, (state, action) => {
                state.cartItemList = action.payload.cartItems;
                state.cartId = action.payload.cartId;
                state.loadingCart = false;
                state.cartItemQuantity = action.payload.cartItems.length;
            })
            .addCase(getCartAsync.rejected, (state, action) => {
                state.loadingCart = false;
            })
            .addCase(createCartItemAsync.pending, (state, action) => {
                state.loadingCreateCartItem = true;
            })
            .addCase(createCartItemAsync.fulfilled, (state, action) => {
                state.loadingCreateCartItem = false;
                state.createCartItemStatus = "success";
            })
            .addCase(createCartItemAsync.rejected, (state, action) => {
                state.loadingCreateCartItem = false;
                state.createCartItemStatus = "failed";
            })
            .addCase(deleteCartItemAsync.pending, (state, action) => {
                state.loadingCreateCartItem = true;
            })
            .addCase(deleteCartItemAsync.fulfilled, (state, action) => {
                state.loadingCreateCartItem = false;
                state.createCartItemStatus = "success";
            })
            .addCase(deleteCartItemAsync.rejected, (state, action) => {
                state.loadingCreateCartItem = false;
                state.createCartItemStatus = "failed";
            });
    },
});

export default cartSlice.reducer;

export const {
    setCart,
    addItemToCheckout,
    removeItemToCheckout,
    deleteItemFromCart,
    clearCart,
    clearCheckoutList,
    setItemsForCheckout,
} = cartSlice.actions;
