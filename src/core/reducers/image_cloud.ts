import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { uploadImageCloudAPI } from "../../api/cloud-dictionary/cloud";

export interface UploadImage {
    uploadSuccess: boolean;
    uploadFailed: boolean;
    image: string;
}

export const initialState: UploadImage = {
    uploadFailed: false,
    uploadSuccess: false,
    image: "",
};

export const uploadImageCloud = createAsyncThunk(
    "imageCloud/uploadImageCloud",
    async (body: FormData) => {
        var response = await uploadImageCloudAPI(body);
        return response.data;
    }
);

export const imageCloudSlice = createSlice({
    name: "imageCloud",
    initialState: initialState,
    reducers: {
        resetUploadImage: (state) => {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadImageCloud.pending, (state, action) => {})
            .addCase(uploadImageCloud.fulfilled, (state, action) => {
                return {
                    image: action.payload.url,
                    uploadFailed: false,
                    uploadSuccess: true,
                };
            })
            .addCase(uploadImageCloud.rejected, (state, action) => {
                return {
                    ...state,
                    uploadFailed: true,
                };
            });
    },
});

export default imageCloudSlice.reducer;

export const { resetUploadImage } = imageCloudSlice.actions;
