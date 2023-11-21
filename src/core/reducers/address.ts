import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAddress } from "../../utils/model";
import {
    getAllAddress,
    createAddress,
    updateAddress,
    deleteAddress,
} from "../../api/address/addressApi";

interface IAddressSlice {
    addressList: IAddress[];
    loadingAddress: boolean;
    address: IAddress | null | undefined;
    updateAddress: {
        loadingUpdateAddress: boolean;
        updateAddress: "success" | "failed" | "none";
    };
}

const initialState: IAddressSlice = {
    addressList: [],
    loadingAddress: false,
    address: null,
    updateAddress: {
        loadingUpdateAddress: false,
        updateAddress: "none",
    },
};

export const getAllAddressAsync = createAsyncThunk(
    "getAllAddress",
    async (userId: string) => {
        const response = await getAllAddress(userId);
        return response.data;
    }
);

export const createAddressAsync = createAsyncThunk(
    "createAddress",
    async (address: IAddress) => {
        return (await createAddress(address)).data;
    }
);

export const updateAddressAsync = createAsyncThunk(
    "updateAddress",
    async (address: IAddress) => {
        return (await updateAddress(address)).data;
    }
);

export const deleteAddressAsync = createAsyncThunk(
    "deleteAddress",
    async (addressId: number) => {
        return await deleteAddress(addressId);
    }
);

export const addressSlice = createSlice({
    name: "addressSlice",
    initialState,
    reducers: {
        reset: (state) => {
            return initialState;
        },
        setAllAddress: (state, action) => {
            state.addressList = action.payload;
        },
        clearUpdateAddress: (state) => {
            return { ...state, updateAddress: initialState.updateAddress };
        },
        clearAddress: (state) => {
            return { ...state, address: initialState.address };
        },
        clearAddressList: (state) => {
            state.addressList = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllAddressAsync.pending, (state, action) => {
                state.loadingAddress = true;
            })
            .addCase(getAllAddressAsync.fulfilled, (state, action) => {
                state.addressList = action.payload;
                state.loadingAddress = false;
            })
            .addCase(getAllAddressAsync.rejected, (state, action) => {
                state.loadingAddress = false;
            })
            .addCase(createAddressAsync.pending, (state, action) => {
                state.updateAddress.loadingUpdateAddress = true;
            })
            .addCase(createAddressAsync.fulfilled, (state, action) => {
                state.updateAddress.loadingUpdateAddress = false;
                state.updateAddress.updateAddress = "success";
            })
            .addCase(createAddressAsync.rejected, (state, action) => {
                state.updateAddress.loadingUpdateAddress = false;
                state.updateAddress.updateAddress = "failed";
            })
            .addCase(updateAddressAsync.pending, (state, action) => {
                state.updateAddress.loadingUpdateAddress = true;
            })
            .addCase(updateAddressAsync.fulfilled, (state, action) => {
                state.updateAddress.loadingUpdateAddress = false;
                state.updateAddress.updateAddress = "success";
            })
            .addCase(updateAddressAsync.rejected, (state, action) => {
                state.updateAddress.loadingUpdateAddress = false;
                state.updateAddress.updateAddress = "failed";
            })
            .addCase(deleteAddressAsync.pending, (state, action) => {
                state.updateAddress.loadingUpdateAddress = true;
            })
            .addCase(deleteAddressAsync.fulfilled, (state, action) => {
                state.updateAddress.loadingUpdateAddress = false;
                state.updateAddress.updateAddress = "success";
            })
            .addCase(deleteAddressAsync.rejected, (state, action) => {
                state.updateAddress.loadingUpdateAddress = false;
                state.updateAddress.updateAddress = "failed";
            });
    },
});

export default addressSlice.reducer;

export const {
    setAllAddress,
    clearAddress,
    clearAddressList,
    clearUpdateAddress,
} = addressSlice.actions;
