import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAccountAPI, logInApi } from "../../api/auth/auth";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../utils/constants";
import { setCookie } from "../../utils/cookies";

export const initialState = {
    loading: false,
    isAuthenticated: false,
    loginSuccess: false,
    loginError: false, // Errors returned from server side
    account: {} as any,
    errorMessage: null as unknown as string, // Errors returned from server side
    redirectMessage: null as unknown as string,
    logoutUrl: null as unknown as string,
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
    imageUrl: string;
    role: number;
    gender: boolean;
    status: number;
    createdAt: string;
    updatedAt: string;
}

export const login = createAsyncThunk(
    "authenticate/login",
    async (auth: ILoginParams) => {
        return (await logInApi(auth)).data;
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
    reducers: {
        reset: () => {
            return initialState;
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
            .addCase(login.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    loginSuccess: false,
                    loginError: true,
                    errorMessage: action.error.message as string,
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

export const { reset } = authenticationSlice.actions;
