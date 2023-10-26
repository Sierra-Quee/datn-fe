import { Button, Modal } from "antd";
import { Cropper, ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { createRef, useState } from "react";

import "./CustomCropper.scss";
import ErrorBoundary from "../../../../core/errors/error-boundary";

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
    const [cropData, setCropData] = useState("#");

    const buttonCancel = () => {
        return <Button key={1}>Hủy bỏ</Button>;
    };

    const buttonSelect = () => {
        return (
            <Button key={2} type="primary">
                Lưu
            </Button>
        );
    };

    const getCropData = () => {
        if (typeof cropperRef.current?.cropper !== "undefined") {
            setCropData(
                cropperRef.current?.cropper.getCroppedCanvas().toDataURL()
            );
        }
    };

    return (
        <Modal
            open={isOpenCustom}
            onCancel={closeCropper}
            footer={[buttonCancel(), buttonSelect()]}
            width={700}
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
