import "./Profile.scss";

import { CameraOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import dayjs from "dayjs";
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
import { FORMAT_DATE } from "../../../utils/constants";
import {
    compareObj,
    deepClone,
    formatDate,
} from "../../../utils/functions/utils";
import AvatarModal from "../AvatarModal/AvatarModal";

interface ProfileProps {
    account: IAccount;
}

const Profile = ({ account }: ProfileProps) => {
    const [accountDeep, setAccountDeep] = useState<IAccount>(account);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const { updateProfileSuccess } = useAppSelector(
        (state) => state.authentication.updateProfile
    );

    useEffect(() => {
        if (updateProfileSuccess) {
            toast.success("Cập nhật tài khoản thành công");
            dispatch(resetUpdateProfile());
        }
    }, [updateProfileSuccess, dispatch]);

    const changeAvatar = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const checkDisableButton = (): boolean => {
        const { imageUrl, updatedAt, ...deepAccount } = account;
        const {
            imageUrl: imageUrlDeep,
            updatedAt: updateAtDeep,
            ...deepAccountDeep
        } = accountDeep;

        return compareObj(deepAccount, deepAccountDeep);
    };

    const changeInputValue = (e: any) => {
        if (e.target.value?.trim()) {
            const cloneAccount: IAccount = deepClone(accountDeep);
            cloneAccount[e.target.name as keyof IAccount] = e.target
                .value as never;

            setAccountDeep({ ...cloneAccount });
        }
    };

    const selectChange = (value: boolean) => {
        setAccountDeep({ ...accountDeep, gender: value });
    };

    const selectDate = (value: any) => {
        setAccountDeep({
            ...accountDeep,
            dob: formatDate(new Date(value)),
        });
    };

    const onFinishUpdateProfile = async (value: any) => {
        await dispatch(updateProfile({ ...accountDeep }));
    };

    return (
        <div className="profile">
            <div className="avatar-wrap">
                <div className="avatar">
                    <img
                        className="avatar-content"
                        src={account.imageUrl ? account.imageUrl : Images.user}
                        alt="avatar"
                    />
                    <div className="avatar-camera" onClick={changeAvatar}>
                        <CameraOutlined
                            style={{ color: "white", fontSize: "25px" }}
                        />
                    </div>
                </div>
                <span className="avatar-name">{accountDeep.accountName}</span>
            </div>
            <div className="profile-content">
                <Form onFinish={onFinishUpdateProfile} layout="vertical">
                    <Form.Item
                        label="Tên tài khoản"
                        name="accountName"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập tên tài khoản",
                            },
                        ]}
                        initialValue={account.accountName}
                    >
                        <Input name="accountName" disabled />
                    </Form.Item>

                    <Row className="row-input" gutter={20}>
                        <Col span={12} className="col-input-left">
                            <Form.Item
                                label="Họ"
                                name="lastName"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập họ của bạn",
                                    },
                                ]}
                                initialValue={account.lastName}
                            >
                                <Input
                                    name="lastName"
                                    onChange={changeInputValue}
                                    placeholder="Nhập họ"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12} className="col-input-right">
                            <Form.Item
                                label="Tên"
                                name="firstName"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập tên của bạn",
                                    },
                                ]}
                                initialValue={account.firstName}
                            >
                                <Input
                                    name="firstName"
                                    onChange={changeInputValue}
                                    placeholder="Nhập tên"
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row className="row-input" gutter={20}>
                        <Col span={12} className="col-input-left">
                            <Form.Item
                                label="Giới tính"
                                name="gender"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Vui lòng chọn giới tính của bạn",
                                    },
                                ]}
                                initialValue={account.gender}
                            >
                                <Select
                                    placeholder="Chọn giới tính"
                                    onChange={selectChange}
                                >
                                    <Select.Option value={true}>
                                        Nam
                                    </Select.Option>
                                    <Select.Option value={false}>
                                        Nữ
                                    </Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12} className="col-input-right">
                            <Form.Item
                                label="Ngày tháng năm sinh"
                                name="dob"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Vui lòng chọn ngày tháng năm sinh bạn",
                                    },
                                ]}
                                initialValue={dayjs(account.dob, "DD/MM/YYYY")}
                            >
                                <DatePicker
                                    allowClear={false}
                                    format={FORMAT_DATE}
                                    placeholder="Chọn ngày tháng năm sinh"
                                    onChange={selectDate}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item style={{ float: "inline-end", margin: 0 }}>
                        <Button
                            disabled={checkDisableButton()}
                            type="primary"
                            htmlType="submit"
                            style={{ margin: 0, background: "#435585" }}
                        >
                            Lưu thay đổi
                        </Button>
                    </Form.Item>
                </Form>
            </div>

            {isOpen && (
                <ErrorBoundary>
                    <AvatarModal
                        isOpen={isOpen}
                        close={closeModal}
                        account={account}
                    />
                </ErrorBoundary>
            )}
        </div>
    );
};

export default Profile;
