import { Button, Image, Input, Modal } from "antd";
import { ISkill } from "../../../utils/model";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import "./UpdateSkill.scss";
import {
    clearUpdateSkill,
    createSkillAsync,
    updateSkillAsync,
} from "../../../core/reducers/skill";
import { useEffect, useState } from "react";
import Images from "../../../assets/Images";
import { toast } from "react-toastify";

interface IUpdateSkillProps {
    isOpen: boolean;
    close: () => void;
    skill?: ISkill | null | undefined;
    isCreate: boolean;
    handleGetAllSkillAsync: () => void;
}

const UpdateSkill = ({
    isOpen,
    close,
    skill,
    isCreate = false,
    handleGetAllSkillAsync,
}: IUpdateSkillProps) => {
    const dispatch = useAppDispatch();
    const { loadingUpdateSkill, updateSkillStatus } = useAppSelector(
        (state) => state.skill.updateSkill
    );
    const [nameSkill, setNameSkill] = useState<string>("");
    const [imageSkill, setImageSkill] = useState<string>("");

    useEffect(() => {
        if (skill) {
            setNameSkill(skill.name);
            setImageSkill(skill.imageUrl);
        }
    }, [skill]);

    useEffect(() => {
        if (updateSkillStatus === "success") {
            toast.success(
                isCreate
                    ? "Thêm loại dịch vụ thành công"
                    : "Cập nhật thông tin loại dịch vụ thành công"
            );
            dispatch(clearUpdateSkill());
            handleGetAllSkillAsync();
            close();
        }
    }, [updateSkillStatus]);

    const updateSkillModalAsync = async () => {
        if (isCreate) {
            await dispatch(
                createSkillAsync({ name: nameSkill, imageUrl: imageSkill })
            );
        } else {
            await dispatch(
                updateSkillAsync({
                    ...skill,
                    name: nameSkill,
                    imageUrl: imageSkill,
                })
            );
        }
    };

    const buttonUpdate = () => {
        return (
            <Button
                key={2}
                type="primary"
                onClick={updateSkillModalAsync}
                loading={loadingUpdateSkill}
            >
                Cập nhật
            </Button>
        );
    };

    const buttonCancel = () => {
        return (
            <Button key={1} disabled={loadingUpdateSkill} onClick={close}>
                Hủy bỏ
            </Button>
        );
    };

    const handleSelectImage = (event: any) => {
        if (event && event.target.files) {
            setImageSkill(URL.createObjectURL(event.target.files[0]));
        }
    };

    const buttonUploadImage = () => {
        return (
            <span
                style={{
                    boxSizing: "border-box",
                    marginTop: "20px",
                    marginBottom: "20px",
                }}
            >
                <label className="btn-upload-image" htmlFor="btn-upload-image">
                    Thay đổi ảnh
                </label>
                <input
                    id="btn-upload-image"
                    style={{ display: "none" }}
                    type="file"
                    onChange={handleSelectImage}
                    onClick={(event: any) => (event.target.value = null)}
                />
            </span>
        );
    };

    return (
        <Modal
            maskClosable={false}
            closeIcon={false}
            open={isOpen}
            onCancel={close}
            width={500}
            title={
                isCreate
                    ? "Thêm loại dịch vụ"
                    : "Cập nhật thông tin loại dịch vụ"
            }
            footer={[buttonCancel(), buttonUpdate()]}
            className="update-skill-modal"
        >
            <div className="modal-update-skill-wrap">
                <Input
                    value={nameSkill}
                    placeholder="Nhập tên loại dịch vụ"
                    onChange={(e: any) => {
                        setNameSkill(e.target.value);
                    }}
                />
                {buttonUploadImage()}
                <img
                    className="image-skill"
                    src={imageSkill || Images.no_image}
                />
            </div>
        </Modal>
    );
};

export default UpdateSkill;
