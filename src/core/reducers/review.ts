import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IReview } from "../../utils/model";
import {
    createReviewApi,
    getReviewsApi,
    updateReviewApi,
    deleteReviewApi,
} from "../../api/Review/reviewAPI";
import { skillSlice } from "./skill";

interface IReviewSlice {
    reviewList: IReview[];
    isLoadingReviewList: boolean;
    updateReview: {
        isUpdatingReview: boolean;
        updateReviewStatus: "success" | "failed" | "none";
    };
}

const initialState: IReviewSlice = {
    reviewList: [],
    isLoadingReviewList: false,
    updateReview: {
        isUpdatingReview: false,
        updateReviewStatus: "none",
    },
};

export const getAllReviewAsync = createAsyncThunk(
    "getAllReview",
    async (serviceId: number) => {
        const response = await getReviewsApi(serviceId);
        return response.data;
    }
);

export const createReviewAsync = createAsyncThunk(
    "createReview",
    async (review: IReview) => {
        const response = await createReviewApi(review);
        return response.data;
    }
);

export const updateReviewAsync = createAsyncThunk(
    "updateReview",
    async (review: IReview) => {
        const response = await updateReviewApi(review);
        return response.data;
    }
);

export const deleteReviewAsync = createAsyncThunk(
    "deleteReview",
    async (reviewId: number) => {
        const response = await deleteReviewApi(reviewId);
        return response.data;
    }
);

export const reviewSlice = createSlice({
    name: "review",
    initialState,
    reducers: {
        reset: (state) => {
            return initialState;
        },
        setAllReview: (state, action) => {
            state.reviewList = action.payload;
        },
        clearReviewList: (state, action) => {
            state.reviewList = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllReviewAsync.pending, (state, action) => {
                state.isLoadingReviewList = true;
            })
            .addCase(getAllReviewAsync.fulfilled, (state, action) => {
                state.isLoadingReviewList = false;
                state.reviewList = action.payload;
            })
            .addCase(getAllReviewAsync.rejected, (state, action) => {
                state.isLoadingReviewList = false;
            })
            .addCase(createReviewAsync.pending, (state, action) => {
                state.updateReview.isUpdatingReview = true;
            })
            .addCase(createReviewAsync.fulfilled, (state, action) => {
                state.updateReview.isUpdatingReview = false;
                state.updateReview.updateReviewStatus = "success";
            })
            .addCase(createReviewAsync.rejected, (state, action) => {
                state.updateReview.isUpdatingReview = false;
                state.updateReview.updateReviewStatus = "failed";
            })
            .addCase(updateReviewAsync.pending, (state, action) => {
                state.updateReview.isUpdatingReview = true;
            })
            .addCase(updateReviewAsync.fulfilled, (state, action) => {
                state.isLoadingReviewList = false;
                state.reviewList = action.payload;
            })
            .addCase(updateReviewAsync.rejected, (state, action) => {
                state.updateReview.isUpdatingReview = false;
                state.updateReview.updateReviewStatus = "failed";
            })
            .addCase(deleteReviewAsync.pending, (state, action) => {
                state.updateReview.isUpdatingReview = true;
            })
            .addCase(deleteReviewAsync.fulfilled, (state, action) => {
                state.isLoadingReviewList = false;
                state.reviewList = action.payload;
            })
            .addCase(deleteReviewAsync.rejected, (state, action) => {
                state.updateReview.isUpdatingReview = false;
                state.updateReview.updateReviewStatus = "failed";
            });
    },
});

export default skillSlice.reducer;
export const { clearListSkill } = skillSlice.actions;
