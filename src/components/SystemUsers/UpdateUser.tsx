import { Button, Col, DatePicker, Form, Input, Modal, Radio, Row } from "antd";
import { useState } from "react";
import { IUser, defaultUser } from "../../utils/model";

interface IUpdateUserProps {
    isCreate?: boolean;
    isOpenPanel: boolean;
    currentUser: IUser;
}
export const UpdateUser = (props: IUpdateUserProps) => {
    const { isOpenPanel, currentUser, isCreate } = props;
    const [userInfo, setUserInfo] = useState<IUser>(defaultUser);

    const buttonUpdate = () => {
        return (
            <Button
                key={2}
                type="primary"
                htmlType="submit"
                // loading={loadingUpdateService || loadingUploadImage}
            >
                Cập nhật
            </Button>
        );
    };

    const buttonCancel = () => {
        return (
            <Button
                key={1}
                // disabled={loadingUpdateService || loadingUploadImage}
                onClick={close}
            >
                Hủy bỏ
            </Button>
        );
    };

    const close = () => {};

    const updateServiceModalAsync = async (value: any) => {
        // setServiceInfo({ ...value, desc: value.desc || "" });
        // if (
        //     (isCreate && imageService) ||
        //     (!isCreate && imageService !== serviceUpdate?.image)
        // ) {
        //     await handleUploadImageCloud();
        // }
    };
    return (
        <Modal
            maskClosable={false}
            closeIcon={false}
            open={isOpenPanel}
            width={800}
            onCancel={close}
            title={isCreate ? "Thêm tài khoản" : "Cập nhật thông tin tài khoản"}
            footer={[]}
            className="update-service-modal"
        >
            <Form layout="vertical" onFinish={updateServiceModalAsync}>
                {/* <div className="upload-service-wrap">
                    {buttonUploadImage()}
                    <img
                        className="image-service"
                        src={currentUser.imageUrl || Images.no_image}
                        alt="Error Image"
                    />
                </div> */}
                <Row gutter={20} style={{ marginTop: 20 }}>
                    <Col span={12}>
                        <Form.Item
                            label="Họ"
                            name="firstName"
                            rules={[
                                {
                                    required: true,
                                    message: "Họ",
                                },
                            ]}
                            initialValue={currentUser?.firstName}
                        >
                            <Input placeholder="Nhập họ của bạn:" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Tên"
                            name="lastName"
                            rules={[
                                {
                                    required: true,
                                    message: "Tên",
                                },
                            ]}
                            initialValue={currentUser?.firstName}
                        >
                            <Input placeholder="Nhập tên của bạn:" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Radio">
                            <Radio.Group>
                                <Radio value={currentUser.gender}> Nam </Radio>
                                <Radio value={currentUser.gender}> Nữ </Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Ngày/tháng/năm sinh"
                            name="type"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Hãy nhập ngày/tháng/năm sinh của bạn",
                                },
                            ]}
                            initialValue={currentUser?.dob || ""}
                        >
                            <DatePicker />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20} style={{ marginTop: 20 }}>
                    <Col span={12}>
                        <Form.Item
                            label="Địa chỉ"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập địa chỉ của bạn",
                                },
                            ]}
                            // initialValue={currentUser?.address}
                        >
                            <Input placeholder="Nhập địa chỉ của bạn" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20} style={{ marginTop: 20 }}>
                    <Col span={12}>
                        <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Vui lòng nhập số điện thoại của bạn",
                                },
                            ]}
                            initialValue={currentUser?.phone}
                        >
                            <Input placeholder="Nhập số điện thoại của bạn" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập email của bạn",
                                },
                            ]}
                            initialValue={currentUser?.email}
                        >
                            <Input placeholder="Nhập email của bạn" />
                        </Form.Item>
                    </Col>
                </Row>

                <div className="button-wrap">
                    {buttonCancel()}
                    {buttonUpdate()}
                </div>
            </Form>
        </Modal>
    );
};
