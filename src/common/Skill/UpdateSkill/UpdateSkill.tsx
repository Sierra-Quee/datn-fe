import "./UpdateSkill.scss";

import { Button, Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Images from "../../../assets/Images";
import {
    resetUploadImage,
    uploadImageCloud,
} from "../../../core/reducers/image_cloud";
import {
    clearUpdateSkill,
    createSkillAsync,
    updateSkillAsync,
} from "../../../core/reducers/skill";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { ISkill } from "../../../utils/model";

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
    const [imageCloud, setImageCloud] = useState<File>();
    const [nameSkill, setNameSkill] = useState<string>("");
    const [imageSkill, setImageSkill] = useState<string>("");

    const dispatch = useAppDispatch();
    const { loadingUpdateSkill, updateSkillStatus } = useAppSelector(
        (state) => state.skill.updateSkill
    );
    const {
        uploadSuccess,
        loadingUploadImage,
        image: imageCloudUpload,
    } = useAppSelector((state) => state.imageCloud);

    useEffect(() => {
        if (skill) {
            setImageSkill(skill.image);
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
            dispatch(resetUploadImage());
            handleGetAllSkillAsync();
            close();
        }
    }, [updateSkillStatus, dispatch, isCreate]);

    useEffect(() => {
        if (
            uploadSuccess ||
            (nameSkill &&
                ((isCreate && !imageSkill) ||
                    (!isCreate && skill?.image === imageSkill)))
        ) {
            const update = async () => {
                if (isCreate) {
                    await dispatch(
                        createSkillAsync({
                            name: nameSkill,
                            image: imageCloudUpload || imageSkill,
                        } as ISkill)
                    );
                } else {
                    await dispatch(
                        updateSkillAsync({
                            name: nameSkill,
                            image: imageCloudUpload || imageSkill,
                        } as ISkill)
                    );
                }
            };
            update();
        }
    }, [
        uploadSuccess,
        nameSkill,
        dispatch,
        isCreate,
        imageSkill,
        skill?.image,
        imageCloudUpload,
    ]);

    const updateSkillModalAsync = async (value: any) => {
        setNameSkill(value.name);
        if (
            (isCreate && imageSkill) ||
            (!isCreate && imageSkill !== skill?.image)
        ) {
            await handleUploadImageCloud();
        }
    };

    const buttonUpdate = () => {
        return (
            <Button
                key={2}
                type="primary"
                htmlType="submit"
                loading={loadingUpdateSkill || loadingUploadImage}
            >
                Cập nhật
            </Button>
        );
    };

    const buttonCancel = () => {
        return (
            <Button
                key={1}
                disabled={loadingUpdateSkill || loadingUploadImage}
                onClick={close}
            >
                Hủy bỏ
            </Button>
        );
    };

    const handleSelectImage = (event: any) => {
        if (event && event.target.files) {
            setImageSkill(URL.createObjectURL(event.target.files[0]));
            setImageCloud(event.target.files[0]);
        }
    };

    const handleUploadImageCloud = async () => {
        const data = new FormData();
        data.append("file", imageCloud as File);
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
            footer={[]}
            className="update-skill-modal"
        >
            <Form layout="vertical" onFinish={updateSkillModalAsync}>
                <div className="modal-update-skill-wrap">
                    <Form.Item
                        label="Tên loại dịch vụ"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập tên loại dịch vụ",
                            },
                        ]}
                        initialValue={skill?.name}
                        style={{ width: "100%" }}
                    >
                        <Input
                            value={nameSkill}
                            placeholder="Nhập tên loại dịch vụ"
                        />
                    </Form.Item>

                    {buttonUploadImage()}
                    <img
                        className="image-skill"
                        src={imageSkill || Images.no_image}
                        alt=""
                    />
                </div>

                <div className="button-wrap">
                    {buttonCancel()}
                    {buttonUpdate()}
                </div>
            </Form>
        </Modal>
    );
};

export default UpdateSkill;
