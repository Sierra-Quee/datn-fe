import { IReview } from "../../utils/model";
import fetchHandler from "../axios";

export const getReviewsApi = async (serviceId: number) => {
    return fetchHandler.get(`/review/getAllByServiceId/${serviceId}`);
};

export const createReviewApi = async (review: IReview) => {
    return fetchHandler.post("/review/createReview", review);
};

export const updateReviewApi = async (review: IReview) => {
    return fetchHandler.patch("/review/updateReview", review);
};

export const deleteReviewApi = async (reviewId: number) => {
    return fetchHandler.delete(`/review/deleteReview/${reviewId}`);
};
