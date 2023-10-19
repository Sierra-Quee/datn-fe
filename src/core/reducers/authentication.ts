import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logInApi } from "../../api/api";
import { setCookie } from "../../utils/cookies";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../utils/constants";

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

export interface IAccountParams {
    phone: string;
    password: string;
}

export interface IResponseToken {
    accessToken: string;
    refreshToken: string;
}

export interface IResponseError {
    message: string;
    error: string;
    statusCode: number;
}

export const login = createAsyncThunk(
    "authenticate/login",
    async (auth: IAccountParams) => {
        return (await logInApi(auth)).data;
    }
);

export const logout = createAsyncThunk(
    "authenticate/logout",
    async (auth: IAccountParams) => {}
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
                (state, action: PayloadAction<IResponseToken>) => {
                    state = {
                        ...state,
                        loginError: false,
                        loginSuccess: true,
                        isAuthenticated: true,
                    };
                    setCookie(ACCESS_TOKEN, action.payload.accessToken);
                    setCookie(REFRESH_TOKEN, action.payload.refreshToken);
                }
            )
            .addCase(login.rejected, (state, action) => {
                state = {
                    ...state,
                    loginSuccess: false,
                    loginError: true,
                    errorMessage: action.error.message as string,
                };
            })
            .addCase(logout.fulfilled, (state, action) => {})
            .addCase(logout.rejected, (state, action) => {});
    },
});

export default authenticationSlice.reducer;
