import "./AvatarModal.scss";

import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Images from "../../../assets/Images";
import ErrorBoundary from "../../../core/errors/error-boundary";
import {
    IAccount,
    resetUpdateProfile,
    updateProfile,
} from "../../../core/reducers/authentication";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import CustomCropper from "./CustomCropper/CustomCropper";
import { resetUploadImage } from "../../../core/reducers/image_cloud";

interface AvatarModalProps {
    isOpen: boolean;
    close: () => void;
    account: IAccount;
}

const AvatarModal = ({ isOpen, close, account }: AvatarModalProps) => {
    const [isOpenCrop, setIsOpenCrop] = useState<boolean>(false);
    const [image, setImage] = useState<string>("");
    const dispatch = useAppDispatch();

    const { updateProfileSuccess } = useAppSelector(
        (state) => state.authentication.updateProfile
    );

    useEffect(() => {
        if (updateProfileSuccess) {
            close();
        }
    }, [updateProfileSuccess, close, dispatch]);

    const deleteAvatarAction = async () => {
        await dispatch(updateProfile({ ...account, imageUrl: "" }));
    };

    const buttonDeleteAvatar = () => {
        return (
            <Button onClick={deleteAvatarAction} key={1}>
                Xóa
            </Button>
        );
    };

    const handleSelectAvatar = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            const avaFile = event.target.files[0];

            if (
                avaFile.type === "image/png" ||
                avaFile.type === "image/jpg" ||
                avaFile.type === "image/jpeg"
            ) {
                let reader = new FileReader();
                reader.onload = (e: any) => {
                    setImage(e.target.result);
                    setIsOpenCrop(!isOpenCrop);
                };
                reader.readAsDataURL(event.target.files[0]);
                return;
            }

            toast.error(
                "Bạn không thể upload file khác định dạng jpg/png/jpeg"
            );
            return;
        }
    };

    const buttonChangeAvatar = () => {
        return (
            <span key={2}>
                <label className="btn-upload-image" htmlFor="btn-upload-image">
                    Thay đổi
                </label>
                <input
                    id="btn-upload-image"
                    style={{ display: "none" }}
                    type="file"
                    onChange={handleSelectAvatar}
                    onClick={(event: any) => (event.target.value = null)}
                />
            </span>
        );
    };

    return (
        <Modal
            open={isOpen}
            onCancel={close}
            title="Thay đổi ảnh đại diện"
            width={350}
            maskClosable={false}
            footer={[buttonDeleteAvatar(), buttonChangeAvatar()]}
            className="avatar-modal"
        >
            <div className="modal-avatar-wrap">
                <div className="modal-avatar">
                    <img
                        className="modal-avatar-content"
                        src={account.imageUrl ? account.imageUrl : Images.user}
                        alt="avatar"
                    />
                </div>
            </div>
            {isOpenCrop && (
                <ErrorBoundary>
                    <CustomCropper
                        isOpenCustom={isOpenCrop}
                        closeCropper={() => setIsOpenCrop(!isOpenCrop)}
                        image={image}
                    />
                </ErrorBoundary>
            )}
        </Modal>
    );
};

export default AvatarModal;
