import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
    changePasswordAPI,
    getAccountAPI,
    logInApi,
    updateProfileAPI,
} from "../../api/auth/auth";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../utils/constants";
import { clearCookie, setCookie } from "../../utils/functions/cookies";

export interface AuthenticationState {
    loading: boolean;
    isAuthenticated: boolean;
    loginSuccess: boolean;
    loginError: boolean; // Errors returned from server side
    account: IAccount;
    updateProfile: IUpdateProfile;
    updatePassword: IUpdatePassword;
}

export const initialState: AuthenticationState = {
    loading: false,
    isAuthenticated: false,
    loginSuccess: false,
    loginError: false, // Errors returned from server side
    account: {} as any,
    updateProfile: {
        updateProfileSuccess: false,
        updateProfileFailed: false,
    },
    updatePassword: {
        updatePassFailed: false,
        updatePassSuccess: false,
    },
};

export interface ILoginParams {
    phone: string;
    password: string;
}

export interface ILoginResponseToken {
    accessToken: string;
    refreshToken: string;
}

export interface IUploadImage {
    uploadSuccess: boolean;
    uploadFailed: boolean;
}

export interface IUpdatePassword {
    updatePassSuccess: boolean;
    updatePassFailed: boolean;
}

export interface IUpdateProfile {
    updateProfileSuccess: boolean;
    updateProfileFailed: boolean;
}

export interface IChangePassword {
    oldPassword: string;
    newPassword: string;
}

export interface IAccount {
    userId: string;
    accountName: string;
    firstName: string;
    lastName: string;
    dob: string;
    phone: string;
    email: string;
    imageUrl?: string | null;
    role: number;
    gender: boolean;
    status: number;
    createdAt: string;
    updatedAt: string;
}

export const login = createAsyncThunk(
    "authenticate/login",
    async (auth: ILoginParams) => {
        var response = await logInApi(auth);
        return response.data;
    }
);

export const logout = createAsyncThunk("authenticate/logout", async () => {});

export const getAccount = createAsyncThunk(
    "authentication/getAccount",
    async () => {
        return (await getAccountAPI()).data;
    }
);

export const updateProfile = createAsyncThunk(
    "authentication/updateProfile",
    async (newProfile: IAccount) => {
        return (await updateProfileAPI(newProfile)).data;
    }
);

export const changePassword = createAsyncThunk(
    "authentication/changePassword",
    async (body: IChangePassword) => {
        var response = await changePasswordAPI(body);
        return response.data;
    }
);

export const authenticationSlice = createSlice({
    name: "authentication",
    initialState: initialState,
    reducers: {
        resetAuth: (state) => {
            return initialState;
        },
        deleteAvatar: (state) => {
            state.account.imageUrl = null;
        },
        resetUpdateProfile: (state) => {
            return { ...state, updateProfile: initialState.updateProfile };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(
                login.fulfilled,
                (state, action: PayloadAction<ILoginResponseToken>) => {
                    setCookie(ACCESS_TOKEN, action.payload.accessToken);
                    setCookie(REFRESH_TOKEN, action.payload.refreshToken);
                    return {
                        ...state,
                        loading: false,
                        loginError: false,
                        loginSuccess: true,
                        isAuthenticated: true,
                    };
                }
            )
            .addCase(login.rejected, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    loading: false,
                    loginSuccess: false,
                    loginError: true,
                };
            })
            .addCase(logout.pending, (state, action) => {})
            .addCase(logout.fulfilled, (state, action) => {})
            .addCase(logout.rejected, (state, action) => {})
            .addCase(changePassword.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.loading = false;
                state.updatePassword = {
                    updatePassFailed: false,
                    updatePassSuccess: true,
                };
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.loading = false;
                state.updatePassword = {
                    updatePassFailed: true,
                    updatePassSuccess: false,
                };
            })
            .addCase(updateProfile.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.account = { ...action.payload };
                state.loading = false;
                state.updateProfile = {
                    updateProfileSuccess: true,
                    updateProfileFailed: false,
                };
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.updateProfile = {
                    updateProfileSuccess: false,
                    updateProfileFailed: true,
                };
            })

            .addCase(getAccount.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(
                getAccount.fulfilled,
                (state, action: PayloadAction<IAccount>) => {
                    return {
                        ...state,
                        loading: false,
                        isAuthenticated: true,
                        account: action.payload,
                    };
                }
            )
            .addCase(getAccount.rejected, (state, action) => {
                clearCookie();
                return {
                    ...state,
                    loading: false,
                    isAuthenticated: false,
                };
            });
    },
});

export default authenticationSlice.reducer;

export const { resetAuth, deleteAvatar, resetUpdateProfile } =
    authenticationSlice.actions;
