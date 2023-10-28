import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
    changePasswordAPI,
    getAccountAPI,
    logInApi,
    updateProfileAPI,
} from "../../api/auth/auth";
import { uploadImageCloudAPI } from "../../api/cloud-dictionary/cloud";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../utils/constants";
import { setCookie } from "../../utils/functions/cookies";

export interface AuthenticationState {
    loading: boolean;
    isAuthenticated: boolean;
    loginSuccess: boolean;
    loginError: boolean; // Errors returned from server side
    account: IAccount;
    errorMessage: string[] | string; // Errors returned from server side
    uploadImage: IUploadImage;
    updateProfile: IUpdateProfile;
    updatePassword: IUpdatePassword;
}

export const initialState: AuthenticationState = {
    loading: false,
    isAuthenticated: false,
    loginSuccess: false,
    loginError: false, // Errors returned from server side
    account: {} as any,
    errorMessage: [], // Errors returned from server side
    uploadImage: {
        uploadFailed: false,
        uploadSuccess: false,
        errorMessageUpload: null,
    },
    updateProfile: {
        updateProfileSuccess: false,
        updateProfileFailed: false,
        errorMessageUpdate: null,
    },
    updatePassword: {
        updatePassFailed: false,
        updatePassSuccess: false,
        errorMessageUpdatePass: null,
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
    errorMessageUpload: string | null;
}

export interface IUpdatePassword {
    updatePassSuccess: boolean;
    updatePassFailed: boolean;
    errorMessageUpdatePass: string[] | null;
}

export interface IUpdateProfile {
    updateProfileSuccess: boolean;
    updateProfileFailed: boolean;
    errorMessageUpdate: string[] | null;
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
    async (auth: ILoginParams, { rejectWithValue }) => {
        try {
            var response = await logInApi(auth);
            return response.data;
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            return rejectWithValue(err.response.data);
        }
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
    async (newProfile: IAccount, { rejectWithValue }) => {
        try {
            return (await updateProfileAPI(newProfile)).data;
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            return rejectWithValue(err.response.data);
        }
    }
);

export const changePassword = createAsyncThunk(
    "authentication/changePassword",
    async (body: IChangePassword, { rejectWithValue }) => {
        try {
            var response = await changePasswordAPI(body);
            return response.data;
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            return rejectWithValue(err.response.data);
        }
    }
);

export const uploadImageCloud = createAsyncThunk(
    "authentication/uploadImageCloud",
    async (body: FormData, { rejectWithValue }) => {
        try {
            var response = await uploadImageCloudAPI(body);
            return response.data;
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            return rejectWithValue(err.response.data);
        }
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
        resetUploadImage: (state) => {
            return { ...state, uploadImage: initialState.uploadImage };
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
                    errorMessage: action.payload.message,
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
                    errorMessageUpdatePass: null,
                };
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.loading = false;
                state.updatePassword = {
                    updatePassFailed: true,
                    updatePassSuccess: false,
                    errorMessageUpdatePass: (action.payload as any).message,
                };
            })
            .addCase(updateProfile.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.account = { ...action.payload };
                state.loading = false;
                state.uploadImage = { ...initialState.uploadImage };
                state.updateProfile = {
                    updateProfileSuccess: true,
                    updateProfileFailed: false,
                    errorMessageUpdate: null,
                };
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.uploadImage = { ...initialState.uploadImage };
                state.updateProfile = {
                    updateProfileSuccess: false,
                    updateProfileFailed: true,
                    errorMessageUpdate: (action.payload as any).message,
                };
            })
            .addCase(uploadImageCloud.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(uploadImageCloud.fulfilled, (state, action) => {
                state.account.imageUrl = action.payload.url;
                state.uploadImage = {
                    uploadFailed: false,
                    uploadSuccess: true,
                    errorMessageUpload: null,
                };
            })
            .addCase(uploadImageCloud.rejected, (state, action) => {
                state.loading = false;
                state.uploadImage.uploadFailed = true;
                state.uploadImage.errorMessageUpload = action.payload as string;
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
                        errorMessage: [],
                    };
                }
            )
            .addCase(getAccount.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    isAuthenticated: false,
                    errorMessage: action.error.message as string,
                };
            });
    },
});

export default authenticationSlice.reducer;

export const { resetAuth, deleteAvatar, resetUploadImage, resetUpdateProfile } =
    authenticationSlice.actions;
