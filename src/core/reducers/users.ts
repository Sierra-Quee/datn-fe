import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../utils/model";
import { getAllUsersRole } from "../../api/users/userAPI";

interface IUserSlice {
    usersList: IUser[];
    repairList: IUser[];
    customerList: IUser[];
    loadingUser: boolean;
    loadingDetailUser: boolean;
    user: IUser;
}
const initialState: IUserSlice = {
    usersList: [],
    repairList: [],
    customerList: [],
    loadingUser: false,
    loadingDetailUser: false,
    user: {
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
    },
};

export const getAllUserRoleAsync = createAsyncThunk(
    "getUser/role",
    async (role: number) => {
        const res = await getAllUsersRole(role);
        return res.data;
    }
);
export const getDetailUserAsync = createAsyncThunk(
    "getUser/role",
    async (userId: number) => {
        const res = await getAllUsersRole(userId);
        return res.data;
    }
);
export const userSlice = createSlice({
    name: "userAll",
    initialState,
    reducers: {
        resetUser: (state) => {
            state.usersList = initialState.usersList;
        },
        setRepairList: (state, action) => {
            state.repairList = action.payload;
        },
        setCustomerList: (state, action) => {
            state.customerList = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUserRoleAsync.pending, (state, action) => {
                state.loadingUser = true;
            })
            .addCase(getAllUserRoleAsync.fulfilled, (state, action) => {
                state.loadingUser = false;
                state.usersList = action.payload;
            })
            .addCase(getAllUserRoleAsync.rejected, (state, action) => {
                state.loadingUser = false;
            })
            .addCase(getDetailUserAsync.pending, (state, action) => {
                state.loadingDetailUser = true;
            })
            .addCase(getDetailUserAsync.fulfilled, (state, action) => {
                state.loadingDetailUser = false;
                state.user = action.payload;
            })
            .addCase(getDetailUserAsync.rejected, (state, action) => {
                state.loadingDetailUser = false;
            });
    },
});
export default userSlice.reducer;
export const { resetUser, setRepairList, setCustomerList } = userSlice.actions;
