import { Col, Form, Input, Row, Select, Table } from "antd";

interface IOrderServiceProps {}
export const OrderService = (props: IOrderServiceProps) => {
    const columns = [
        {
            title: "Tên dịch vụ",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Nhà cung cấp",
            dataIndex: "age",
            key: "age",
        },
        {
            title: "Nhân viên sửa chữa",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Giá",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Thành tiền",
            dataIndex: "address",
            key: "address",
        },
    ];
    return (
        <>
            <h2>
                Quý khách vui lòng xác nhận thông tin đặt lịch hẹn dịch vụ dưới
                đây.
            </h2>
            <Table columns={columns} />
            <h3>THÔNG TIN KHÁCH HÀNG</h3>
            {/* <Form layout="vertical" onFinish={updateServiceModalAsync}>
                <Row gutter={20} style={{ marginTop: 20 }}>
                    <Col span={12}>
                        <Form.Item
                            label="Họ và tên"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Họ và tên",
                                },
                            ]}
                            initialValue={serviceUpdate?.name}
                        >
                            <Input placeholder="Nhập tên dịch vụ" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Loại"
                            name="type"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng chọn loại của dịch vụ",
                                },
                            ]}
                            initialValue={serviceUpdate?.type}
                        >
                            <Select placeholder="Chọn loại của dịch vụ">
                                <Select.Option value={ITypeService.MainTain}>
                                    Bảo dưỡng
                                </Select.Option>
                                <Select.Option value={ITypeService.Repair}>
                                    Sửa chữa
                                </Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20} style={{ marginTop: 20 }}>
                    <Col span={12}>
                        <Form.Item
                            label="Giá"
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập giá cho dịch vụ",
                                },
                            ]}
                            initialValue={serviceUpdate?.price}
                        >
                            <Input placeholder="Nhập giá dịch vụ" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Miêu tả"
                            name="desc"
                            initialValue={serviceUpdate?.desc}
                        >
                            <Input.TextArea
                                rows={4}
                                placeholder="Nhập miêu tả cho dịch vụ"
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <div className="button-wrap">
                    {buttonCancel()}
                    {buttonUpdate()}
                </div>
            </Form> */}
        </>
    );
};
