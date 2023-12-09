import "./UpdateUser.scss";

import { Button, Col, DatePicker, Form, Input, Modal, Row, Select } from "antd";
import { ValidateStatus } from "antd/es/form/FormItem";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Images from "../../../assets/Images";
import { Role } from "../../../core/auth/roles";
import {
    resetUploadImage,
    uploadImageCloud,
} from "../../../core/reducers/image_cloud";
import {
    clearUpdateUser,
    createUserAsync,
    updateUserAsync,
} from "../../../core/reducers/users";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { FORMAT_DATE } from "../../../utils/constants";
import { formatDate, getTitleRole } from "../../../utils/functions/utils";
import { IUser } from "../../../utils/model";

interface IUpdateUserProps {
    isCreate?: boolean;
    isOpenPanel: boolean;
    currentUser?: IUser | null | undefined;
    close: () => void;
    handleGetAllUser: () => void;
    roleUpdate?: Role;
}
const UpdateUser = ({
    isOpenPanel,
    currentUser,
    isCreate,
    close,
    handleGetAllUser,
    roleUpdate,
}: IUpdateUserProps) => {
    const [imageUser, setImageUser] = useState<string>("");
    const [imageCloud, setImageCloud] = useState<File>();
    const [validateStatusRePass, setValidateStatusRePass] =
        useState<ValidateStatus>();
    const [helpValidate, setHelpValidate] = useState<string | null>();
    const [skillOptions, setSkillOptions] = useState<any[]>([]);
    const [userInfo, setUserInfo] = useState<any>();

    const dispatch = useAppDispatch();
    const { listSkill } = useAppSelector((state) => state.skill);
    const { updateUserStatus } = useAppSelector(
        (state) => state.users.updateUser
    );

    const { uploadSuccess, image: imageCloudUpload } = useAppSelector(
        (state) => state.imageCloud
    );

    useEffect(() => {
        if (currentUser) {
            setImageUser(currentUser.imageUrl);
        }
    }, [currentUser]);

    useEffect(() => {
        setSkillOptions([...listSkill]);
    }, [listSkill]);

    useEffect(() => {
        if (updateUserStatus === "success") {
            toast.success(
                isCreate
                    ? "Thêm thông tin thành công"
                    : "Cập nhật thông tin thành công"
            );
            dispatch(clearUpdateUser());
            dispatch(resetUploadImage());
            handleGetAllUser();
            close();
        }
    }, [updateUserStatus, dispatch, isCreate]);

    useEffect(() => {
        if (
            uploadSuccess ||
            (userInfo &&
                ((isCreate && !imageUser) ||
                    (!isCreate && currentUser?.imageUrl === imageUser)))
        ) {
            const update = async () => {
                if (isCreate) {
                    await dispatch(
                        createUserAsync({
                            ...userInfo,
                            imageUrl: imageCloudUpload || imageUser || "",
                            role: roleUpdate,
                        } as IUser)
                    );
                } else {
                    await dispatch(
                        updateUserAsync({
                            ...userInfo,
                            imageUrl: imageCloudUpload || imageUser || "",
                            role: roleUpdate,
                            userId: currentUser?.userId,
                        })
                    );
                }
            };
            update();
        }
    }, [
        uploadSuccess,
        userInfo,
        dispatch,
        isCreate,
        imageUser,
        imageCloudUpload,
        currentUser?.imageUrl,
        roleUpdate,
    ]);

    // const handleGetAllSkillAsync = async () => {
    //     await dispatch(getAllSkillAsync());
    // };

    const buttonUpdate = () => {
        return (
            <Button key={2} type="primary" htmlType="submit">
                {isCreate ? "Thêm thông tin" : "Cập nhật"}
            </Button>
        );
    };

    const buttonCancel = () => {
        return (
            <Button key={1} onClick={close}>
                Hủy bỏ
            </Button>
        );
    };

    const handleSelectImage = (event: any) => {
        if (event && event.target.files) {
            setImageUser(URL.createObjectURL(event.target.files[0]));
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
                    display: "flex",
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

    const updateUserModalAsync = async (values: any) => {
        if (
            values.password &&
            values.rePassword &&
            values.password !== values.rePassword
        ) {
            setValidateStatusRePass("error");
            setHelpValidate("Mật khẩu nhập lại không đúng");
            return;
        } else {
            setUserInfo({ ...values, dob: formatDate(new Date(values.dob)) });
            if (
                (isCreate && imageUser) ||
                (!isCreate && imageUser !== currentUser?.imageUrl)
            ) {
                await handleUploadImageCloud();
            }
        }
    };

    const handleRePassChange = (e: any) => {
        if (e.target.value.trim()) {
            setValidateStatusRePass(undefined);
            setHelpValidate(null);
        }
    };

    return (
        <Modal
            maskClosable={false}
            closeIcon={false}
            open={isOpenPanel}
            width={800}
            onCancel={close}
            title={`${isCreate ? "Thêm" : "Cập nhật thông tin"} ${getTitleRole(
                roleUpdate as Role
            )}`}
            footer={[]}
            className="update-user-modal"
        >
            <Form layout="vertical" onFinish={updateUserModalAsync}>
                <div className="modal-update-user-wrap">
                    {buttonUploadImage()}
                    <img
                        className="image-skill"
                        src={imageUser || Images.no_image}
                        alt=""
                    />
                    <Row gutter={20} style={{ marginTop: 20 }}>
                        <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                            <Form.Item
                                label="Họ"
                                name="lastName"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Vui lòng nhập họ của người dùng",
                                    },
                                ]}
                                initialValue={currentUser?.lastName}
                            >
                                <Input placeholder="Nhập họ của người dùng" />
                            </Form.Item>
                        </Col>
                        <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                            <Form.Item
                                label="Tên"
                                name="firstName"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Vui lòng nhập tên của người dùng",
                                    },
                                ]}
                                initialValue={currentUser?.firstName}
                            >
                                <Input placeholder="Nhập tên của người dùng" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                            <Form.Item
                                label="Giới tính"
                                name="gender"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Vui lòng chọn giới tính của người dùng",
                                    },
                                ]}
                                initialValue={currentUser?.gender}
                            >
                                <Select placeholder="Chọn giới tính của bạn">
                                    <Select.Option value={true}>
                                        Nam
                                    </Select.Option>
                                    <Select.Option value={false}>
                                        Nữ
                                    </Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                            <Form.Item
                                label="Ngày tháng năm sinh"
                                name="dob"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Vui lòng chọn ngày tháng năm sinh của người dùng",
                                    },
                                ]}
                                initialValue={
                                    currentUser?.dob
                                        ? dayjs(currentUser?.dob, "DD/MM/YYYY")
                                        : null
                                }
                            >
                                <DatePicker
                                    allowClear={false}
                                    format={FORMAT_DATE}
                                    placeholder="Chọn ngày tháng năm sinh"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                            <Form.Item
                                label="Số điện thoại"
                                name="phone"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Vui lòng nhập số điện thoại của người dùng",
                                    },
                                ]}
                                initialValue={currentUser?.phone}
                            >
                                <Input placeholder="Nhập số điện thoại của người dùng" />
                            </Form.Item>
                        </Col>
                        <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Vui lòng nhập email của người dùng",
                                    },
                                ]}
                                initialValue={currentUser?.email}
                            >
                                <Input placeholder="Nhập email của người dùng" />
                            </Form.Item>
                        </Col>
                    </Row>
                    {roleUpdate === Role.ROLE_REPAIRMAN && (
                        <Form.Item
                            label="Kĩ năng nghề nghiệp"
                            name="skills"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Vui lòng lựa chọn ít nhất 1 kĩ năng nghề nghiệp",
                                },
                            ]}
                            initialValue={
                                currentUser?.skills.map(
                                    (skills) =>
                                        (skills as { skillId: number }).skillId
                                ) || []
                            }
                        >
                            <Select
                                mode="multiple"
                                placeholder="Chọn kĩ năng nghề nghiệp"
                                options={skillOptions?.map((item) => {
                                    return {
                                        value: item.skillId,
                                        label: item.name,
                                    };
                                })}
                                optionFilterProp="label"
                            />
                        </Form.Item>
                    )}
                    {isCreate && (
                        <>
                            <Form.Item
                                label="Mật khẩu"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Vui lòng nhập mật khẩu của bạn",
                                    },
                                ]}
                            >
                                <Input.Password placeholder="Nhập mật khẩu của bạn" />
                            </Form.Item>
                            <Form.Item
                                label="Nhập lại mật khẩu"
                                name="rePassword"
                                help={helpValidate}
                                validateStatus={validateStatusRePass}
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Vui lòng nhập lại mật khẩu của bạn",
                                    },
                                ]}
                            >
                                <Input.Password
                                    onChange={handleRePassChange}
                                    placeholder="Nhập lại mật khẩu của bạn"
                                />
                            </Form.Item>
                        </>
                    )}

                    <div className="button-wrap">
                        {buttonCancel()}
                        {buttonUpdate()}
                    </div>
                </div>
            </Form>
        </Modal>
    );
};

export default UpdateUser;
