import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signUpApi } from "../../api/auth/auth";

export interface RegisterState {
    loading: boolean;
    registrationSuccess: boolean;
    registrationFailure: boolean;
    errorMessage: string[];
}

export const initialState = {
    loading: false,
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
    async (info: IRegisterParams, { rejectWithValue }) => {
        try {
            var response = await signUpApi(info);
            return response.data;
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            return rejectWithValue(err.response.data);
        }
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
            .addCase(signUp.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                return {
                    loading: false,
                    registrationSuccess: true,
                    registrationFailure: false,
                    errorMessage: [],
                };
            })
            .addCase(signUp.rejected, (state, action: PayloadAction<any>) => {
                return {
                    loading: false,
                    registrationSuccess: false,
                    registrationFailure: true,
                    errorMessage: action.payload.message,
                };
            });
    },
});

export default registerSlice.reducer;

export const { reset } = registerSlice.actions;
