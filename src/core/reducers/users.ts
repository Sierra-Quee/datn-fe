import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    createUserAPI,
    getAllUsersRole,
    getDetailUserAPI,
    updateUserAPI,
} from "../../api/users/userAPI";
import { IUser, defaultUser } from "../../utils/model";

interface IUserSlice {
    usersList: IUser[];
    repairList: IUser[];
    customerList: IUser[];
    loadingUser: boolean;
    loadingDetailUser: boolean;
    loadingUpdatelUser: boolean;
    user: IUser;
}
const initialState: IUserSlice = {
    usersList: [],
    repairList: [],
    customerList: [],
    loadingUser: false,
    loadingDetailUser: false,
    loadingUpdatelUser: false,
    user: defaultUser,
};

export const getAllUserRoleAsync = createAsyncThunk(
    "getUser/role",
    async (role: number) => {
        const res = await getAllUsersRole(role);
        return res.data;
    }
);
export const getDetailUserAsync = createAsyncThunk(
    "getDetailUser/role",
    async (userId: string) => {
        const res = await getDetailUserAPI(userId);
        return res.data;
    }
);
export const createUserAsync = createAsyncThunk(
    "createUser",
    async (user: IUser) => {
        const res = await createUserAPI(user);
        return res.data;
    }
);
export const updateUserAsync = createAsyncThunk(
    "updateUser",
    async (user: IUser) => {
        const res = await updateUserAPI(user);
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
        setUser: (state, action) => {
            state.user = action.payload;
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
            })
            .addCase(createUserAsync.pending, (state, action) => {
                state.loadingUpdatelUser = true;
            })
            .addCase(createUserAsync.fulfilled, (state, action) => {
                state.loadingUpdatelUser = false;
                state.user = action.payload;
            })
            .addCase(createUserAsync.rejected, (state, action) => {
                state.loadingUpdatelUser = false;
            })
            .addCase(updateUserAsync.pending, (state, action) => {
                state.loadingUpdatelUser = true;
            })
            .addCase(updateUserAsync.fulfilled, (state, action) => {
                state.loadingUpdatelUser = false;
                state.user = action.payload;
            })
            .addCase(updateUserAsync.rejected, (state, action) => {
                state.loadingUpdatelUser = false;
            });
    },
});
export default userSlice.reducer;
export const { resetUser, setRepairList, setCustomerList, setUser } =
    userSlice.actions;
