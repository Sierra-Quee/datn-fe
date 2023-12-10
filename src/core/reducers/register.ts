import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { resendOtpAPI, signUpApi, verifyOtpAPI } from "../../api/auth/auth";
import { deepClone } from "../../utils/functions/utils";
import { defaultUser, IUser } from "../../utils/model";

export interface RegisterState {
    registrationSuccess: boolean;
    registrationFailure: boolean;
    verifyOtpStatus: "success" | "failed" | "none";
    resendOtpStatus: "success" | "failed" | "none";
    errorMessage: string[];
    user: IUser;
}

export const initialState: RegisterState = {
    registrationSuccess: false,
    registrationFailure: false,
    verifyOtpStatus: "none",
    resendOtpStatus: "none",
    errorMessage: [],
    user: defaultUser,
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

export const resendOtp = createAsyncThunk(
    "register/resendOtp",
    async (body: { phone: string; email: string }) => {
        var response = await resendOtpAPI(body.phone, body.email);
        return response.data;
    }
);

export const verifyOtp = createAsyncThunk(
    "register/verifyOtp",
    async (body: { otp: string; userId: string }) => {
        var response = await verifyOtpAPI(body.otp, body.userId);
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
        clearVerify: (state) => {
            state.verifyOtpStatus = "none";
        },
        clearResend: (state) => {
            state.resendOtpStatus = "none";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUp.pending, (state, action) => {})
            .addCase(signUp.fulfilled, (state, action) => {
                return {
                    ...state,
                    registrationSuccess: true,
                    registrationFailure: false,
                    errorMessage: [],
                    user: deepClone(action.payload),
                };
            })
            .addCase(signUp.rejected, (state, action) => {
                console.log(action);

                return {
                    ...state,
                    registrationSuccess: false,
                    registrationFailure: true,
                    errorMessage: [],
                };
            })
            .addCase(resendOtp.pending, (state, action) => {})
            .addCase(resendOtp.fulfilled, (state, action) => {
                state.resendOtpStatus = "success";
            })
            .addCase(resendOtp.rejected, (state, action) => {
                state.resendOtpStatus = "failed";
            })
            .addCase(verifyOtp.pending, (state, action) => {})
            .addCase(verifyOtp.fulfilled, (state, action) => {
                state.verifyOtpStatus = "success";
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.verifyOtpStatus = "failed";
            });
    },
});

export default registerSlice.reducer;

export const { reset, clearResend, clearVerify } = registerSlice.actions;
