import axios from "axios";

export const uploadImageCloudAPI = (body: FormData) => {
    return axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        body
    );
};
