import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ILogIn, ISignUp } from "./model";
import { logInApi, signUpApi } from "../../api/api";

interface IAuthSlice {
    signUp: ISignUp;
    logIn: ILogIn;
}
const initialState = {
    signUp: {
        firstName: "",
        lastName: "",
        dob: "",
        phone: "",
        email: "",
        gender: true,
        password: "",
    },
    logIn: {
        phone: "",
        password: "",
    },
};
export const signUpAsync = createAsyncThunk(
    "/auth/postSignUp",
    async (user: ISignUp) => {
        const reponse = await signUpApi(user);
        return reponse.data;
    }
);
export const logInAsync = createAsyncThunk(
    "/auth/postLogIn",
    async (user: ILogIn) => {
        const reponse = await logInApi(user);
        return reponse.data;
    }
);

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {},
    // extraReducers: (builder) => {
    //     .addCase(signUpAsync.fulfilled,(state,action) => {
    //         const{data} = action.payload;
    //         const{}
    //     })
    // }
});

export default authSlice.reducer;
