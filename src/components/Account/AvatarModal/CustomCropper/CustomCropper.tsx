import "./CustomCropper.scss";
import "cropperjs/dist/cropper.css";

import { Button, Modal, Spin } from "antd";
import { createRef, useEffect } from "react";
import { Cropper, ReactCropperElement } from "react-cropper";
import { toast } from "react-toastify";

import ErrorBoundary from "../../../../core/errors/error-boundary";
import {
    updateProfile,
    uploadImageCloud,
} from "../../../../core/reducers/authentication";
import { useAppDispatch, useAppSelector } from "../../../../redux/hook";

interface CustomCropperProps {
    isOpenCustom: boolean;
    closeCropper: () => void;
    image: string;
}

const CustomCropper = ({
    isOpenCustom,
    closeCropper,
    image,
}: CustomCropperProps) => {
    const cropperRef = createRef<ReactCropperElement>();
    const dispatch = useAppDispatch();

    const { updateProfileSuccess } = useAppSelector(
        (state) => state.authentication.updateProfile
    );

    const { account, loading } = useAppSelector(
        (state) => state.authentication
    );

    const { uploadFailed, uploadSuccess, errorMessageUpload } = useAppSelector(
        (state) => state.authentication.uploadImage
    );

    useEffect(() => {
        if (updateProfileSuccess) {
            closeCropper();
        }
    }, [updateProfileSuccess, closeCropper]);

    useEffect(() => {
        if (uploadFailed && errorMessageUpload) {
            toast.error(errorMessageUpload);
        } else if (uploadSuccess) {
            const update = async () => {
                await dispatch(updateProfile(account));
            };
            update();
        }
    }, [uploadFailed, uploadSuccess, errorMessageUpload, account, dispatch]);

    const buttonCancel = () => {
        return (
            <Button key={1} disabled={loading}>
                Hủy bỏ
            </Button>
        );
    };

    const buttonSelect = () => {
        return (
            <Button
                key={2}
                type="primary"
                onClick={getCropData}
                loading={loading}
            >
                Lưu
            </Button>
        );
    };

    const getCropData = async () => {
        if (typeof cropperRef.current?.cropper !== "undefined") {
            const image = cropperRef.current?.cropper
                .getCroppedCanvas()
                .toDataURL();
            const data = new FormData();
            data.append("file", image);
            data.append(
                "upload_preset",
                process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET as string
            );
            data.append(
                "cloud_name",
                process.env.REACT_APP_CLOUDINARY_CLOUD_NAME as string
            );
            data.append("folder", "DATN-FE");
            await dispatch(uploadImageCloud(data));
        }
    };

    return (
        <Modal
            open={isOpenCustom}
            onCancel={closeCropper}
            footer={[buttonCancel(), buttonSelect()]}
            width={700}
            closeIcon={false}
            maskClosable={false}
            className="modal-custom-cropper-wrap"
        >
            <ErrorBoundary>
                <Cropper
                    ref={cropperRef}
                    zoomTo={0.6}
                    viewMode={1}
                    src={image}
                    initialAspectRatio={1}
                    dragMode="move"
                    background={false}
                    responsive={true}
                    autoCropArea={0.6}
                    cropBoxResizable={false}
                    cropBoxMovable={false}
                    checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                    guides={false}
                    rotatable={false}
                    scalable={false}
                    zoomable={false}
                />
            </ErrorBoundary>
        </Modal>
    );
};
export default CustomCropper;
