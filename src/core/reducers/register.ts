import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signUpApi } from "../../api/auth/auth";

export interface RegisterState {
    registrationSuccess: boolean;
    registrationFailure: boolean;
    errorMessage: string[];
}

export const initialState = {
    registrationSuccess: false,
    registrationFailure: false,
    errorMessage: [],
};

export interface IRegisterParams {
    firstName: string;
    lastName: string;
    dobObj: any;
    dob: string;
    phone: string;
    email: string;
    gender: boolean;
    password: string;
    rePassword: string;
}

export const signUp = createAsyncThunk(
    "register/signUp",
    async (info: IRegisterParams) => {
        var response = await signUpApi(info);
        return response.data;
    }
);

export const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
        reset: (state) => {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUp.pending, (state, action) => {})
            .addCase(signUp.fulfilled, (state, action) => {
                return {
                    registrationSuccess: true,
                    registrationFailure: false,
                    errorMessage: [],
                };
            })
            .addCase(signUp.rejected, (state, action) => {
                console.log(action);

                return {
                    registrationSuccess: false,
                    registrationFailure: true,
                    errorMessage: [],
                };
            });
    },
});

export default registerSlice.reducer;

export const { reset } = registerSlice.actions;
