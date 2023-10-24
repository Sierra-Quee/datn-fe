import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAccountAPI, logInApi } from "../../api/auth/auth";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../utils/constants";
import { setCookie } from "../../utils/cookies";

export interface AuthenticationState {
    loading: boolean;
    isAuthenticated: boolean;
    loginSuccess: boolean;
    loginError: boolean; // Errors returned from server side
    account: IAccount;
    errorMessage: string[] | string; // Errors returned from server side
}

export const initialState: AuthenticationState = {
    loading: false,
    isAuthenticated: false,
    loginSuccess: false,
    loginError: false, // Errors returned from server side
    account: {} as any,
    errorMessage: [], // Errors returned from server side
};

export interface ILoginParams {
    phone: string;
    password: string;
}

export interface ILoginResponseToken {
    accessToken: string;
    refreshToken: string;
}

export interface IAccount {
    userId: string;
    accountName: string;
    firstName: string;
    lastName: string;
    dob: string;
    phone: string;
    email: string;
    imageUrl?: string;
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

export const authenticationSlice = createSlice({
    name: "authentication",
    initialState: initialState,
    reducers: {},
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
