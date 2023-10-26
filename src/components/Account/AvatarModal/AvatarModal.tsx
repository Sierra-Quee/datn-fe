import { Button, Modal } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";

import "./AvatarModal.scss";
import Images from "../../../assets/Images";
import { deleteAvatar, IAccount } from "../../../core/reducers/authentication";
import { useAppDispatch } from "../../../redux/hook";
import { isNullOrEmpty } from "../../../utils/functions/utils";
import CustomCropper from "./CustomCropper/CustomCropper";
import ErrorBoundary from "../../../core/errors/error-boundary";

interface AvatarModalProps {
    isOpen: boolean;
    close: () => void;
    account: IAccount;
}

const AvatarModal = ({ isOpen, close, account }: AvatarModalProps) => {
    const [isOpenCrop, setIsOpenCrop] = useState<boolean>(false);
    const [image, setImage] = useState<string>("");
    const dispatch = useAppDispatch();

    const deleteAvatarAction = () => {
        if (isNullOrEmpty(account.imageUrl)) dispatch(deleteAvatar());
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
            console.log(avaFile.type);

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
            <ErrorBoundary>
                <CustomCropper
                    isOpenCustom={isOpenCrop}
                    closeCropper={() => setIsOpenCrop(!isOpenCrop)}
                    image={image}
                />
            </ErrorBoundary>
        </Modal>
    );
};

export default AvatarModal;
