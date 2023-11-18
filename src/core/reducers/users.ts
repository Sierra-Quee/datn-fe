import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    createUserAPI,
    getAllUsersRole,
    getDetailUserAPI,
    updateStatusUserAPI,
    updateUserAPI,
} from "../../api/users/userAPI";
import { IUser, defaultUser } from "../../utils/model";
import { Role } from "../auth/roles";

interface IUserSlice {
    repairList: IUser[];
    customerList: IUser[];
    loadingUser: boolean;
    loadingDetailUser: boolean;
    updateUser: {
        loadingUpdateUser: boolean;
        updateUserStatus: "success" | "failed" | "none";
    };
    updateStatusUser: {
        loadingUpdateUserStatus: boolean;
        updateStatusUserStatus: "success" | "failed" | "none";
    };
    user: IUser;
}
const initialState: IUserSlice = {
    repairList: [],
    customerList: [],
    loadingUser: false,
    loadingDetailUser: false,
    updateUser: {
        loadingUpdateUser: false,
        updateUserStatus: "none",
    },
    updateStatusUser: {
        loadingUpdateUserStatus: false,
        updateStatusUserStatus: "none",
    },
    user: defaultUser,
};

export const getAllUserRoleAsync = createAsyncThunk(
    "getUser/role",
    async (role: Role) => {
        const res = await getAllUsersRole(role);
        return { data: res.data, role };
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

export const updateStatusUserAsync = createAsyncThunk(
    "updateStatusUser",
    async (userId: string) => {
        const res = await updateStatusUserAPI(userId);
        return res.data;
    }
);

export const userSlice = createSlice({
    name: "userAll",
    initialState,
    reducers: {
        reset: (state) => {
            return initialState;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearListRepair: (state) => {
            state.repairList = [];
        },
        clearListCustomer: (state) => {
            state.customerList = [];
        },
        clearUpdateUser: (state) => {
            return { ...state, updateUser: initialState.updateUser };
        },
        clearUpdateStatusUser: (state) => {
            return {
                ...state,
                updateStatusUser: initialState.updateStatusUser,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUserRoleAsync.pending, (state, action) => {
                state.loadingUser = true;
            })
            .addCase(getAllUserRoleAsync.fulfilled, (state, action) => {
                state.loadingUser = false;
                if (action.payload.role === Role.ROLE_USER) {
                    state.customerList = action.payload.data;
                } else {
                    state.repairList = action.payload.data;
                }
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
                state.updateUser.loadingUpdateUser = true;
            })
            .addCase(createUserAsync.fulfilled, (state, action) => {
                state.updateUser.loadingUpdateUser = false;
                state.updateUser.updateUserStatus = "success";
            })
            .addCase(createUserAsync.rejected, (state, action) => {
                state.updateUser.loadingUpdateUser = false;
                state.updateUser.updateUserStatus = "failed";
            })
            .addCase(updateUserAsync.pending, (state, action) => {
                state.updateUser.loadingUpdateUser = true;
            })
            .addCase(updateUserAsync.fulfilled, (state, action) => {
                state.updateUser.loadingUpdateUser = false;
                state.updateUser.updateUserStatus = "success";
            })
            .addCase(updateUserAsync.rejected, (state, action) => {
                state.updateUser.loadingUpdateUser = false;
                state.updateUser.updateUserStatus = "failed";
            })
            .addCase(updateStatusUserAsync.pending, (state, action) => {
                state.updateStatusUser.loadingUpdateUserStatus = true;
            })
            .addCase(updateStatusUserAsync.fulfilled, (state, action) => {
                state.updateStatusUser.loadingUpdateUserStatus = false;
                state.updateStatusUser.updateStatusUserStatus = "success";
            })
            .addCase(updateStatusUserAsync.rejected, (state, action) => {
                state.updateStatusUser.loadingUpdateUserStatus = false;
                state.updateStatusUser.updateStatusUserStatus = "failed";
            });
    },
});
export default userSlice.reducer;
export const {
    reset,
    setUser,
    clearListRepair,
    clearListCustomer,
    clearUpdateUser,
    clearUpdateStatusUser,
} = userSlice.actions;
