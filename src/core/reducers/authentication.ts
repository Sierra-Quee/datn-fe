import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

interface IAccountParams {
    phone: string;
    password: string;
}

export const login = createAsyncThunk(
    "authenticate/login",
    async (auth: IAccountParams) => {}
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
            .addCase(login.fulfilled, (state, action) => {})
            .addCase(login.rejected, (state, action) => {})
            .addCase(logout.fulfilled, (state, action) => {})
            .addCase(logout.rejected, (state, action) => {});
    },
});

export default authenticationSlice.reducer;
