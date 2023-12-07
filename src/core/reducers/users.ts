import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    createUserAPI,
    getAllUsersRole,
    getDetailUserAPI,
    updateStatusCustomerAPI,
    updateUserAPI,
} from "../../api/users/userAPI";
import { IUser, defaultUser } from "../../utils/model";
import { Role } from "../auth/roles";

export enum UserStatus {
    ACTIVE,
    BUSY,
    INACTIVE,
}

interface IUserSlice {
    repairList: IUser[];
    customerList: IUser[];
    adminList: IUser[];
    updateUser: {
        updateUserStatus: "success" | "failed" | "none";
    };
    updateStatusUser: {
        updateStatusUserStatus: "success" | "failed" | "none";
    };
    user: IUser;
}
const initialState: IUserSlice = {
    repairList: [],
    customerList: [],
    adminList: [],
    updateUser: {
        updateUserStatus: "none",
    },
    updateStatusUser: {
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
        const res = await updateStatusCustomerAPI(userId);
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
        clearListAdmin: (state) => {
            state.adminList = [];
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
            .addCase(getAllUserRoleAsync.pending, (state, action) => {})
            .addCase(getAllUserRoleAsync.fulfilled, (state, action) => {
                if (action.payload.role === Role.ROLE_USER) {
                    state.customerList = action.payload.data;
                } else if (action.payload.role === Role.ROLE_REPAIRMAN) {
                    state.repairList = action.payload.data;
                } else {
                    state.adminList = action.payload.data;
                }
            })
            .addCase(getAllUserRoleAsync.rejected, (state, action) => {})
            .addCase(getDetailUserAsync.pending, (state, action) => {})
            .addCase(getDetailUserAsync.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(getDetailUserAsync.rejected, (state, action) => {})
            .addCase(createUserAsync.pending, (state, action) => {})
            .addCase(createUserAsync.fulfilled, (state, action) => {
                state.updateUser.updateUserStatus = "success";
            })
            .addCase(createUserAsync.rejected, (state, action) => {
                state.updateUser.updateUserStatus = "failed";
            })
            .addCase(updateUserAsync.pending, (state, action) => {})
            .addCase(updateUserAsync.fulfilled, (state, action) => {
                state.updateUser.updateUserStatus = "success";
            })
            .addCase(updateUserAsync.rejected, (state, action) => {
                state.updateUser.updateUserStatus = "failed";
            })
            .addCase(updateStatusUserAsync.pending, (state, action) => {})
            .addCase(updateStatusUserAsync.fulfilled, (state, action) => {
                state.updateStatusUser.updateStatusUserStatus = "success";
            })
            .addCase(updateStatusUserAsync.rejected, (state, action) => {
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
    clearListAdmin,
    clearUpdateUser,
    clearUpdateStatusUser,
} = userSlice.actions;
