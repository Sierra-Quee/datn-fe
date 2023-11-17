import { Button, Checkbox, Flex, Form, Input, Layout, Modal } from "antd";
import "./Address.scss";
import { Typography, Select } from "antd";
import { useState } from "react";
const { Header, Content } = Layout;

const { Title } = Typography;
type Props = {};

const Address = (props: Props) => {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(true);
    const handleOpenModal = () => {
        setIsOpenModal(true);
    };
    const handleCloseModal = () => {
        setIsOpenModal(false);
    };
    const handleAddAddress = () => {};
    return (
        <Layout>
            <Header className="address-header">
                <Flex
                    className="address-header__content"
                    style={{ width: "100%" }}
                >
                    {/* <h3>Quản lý địa điểm</h3> */}
                    <Title level={3}>Quản lý địa điểm</Title>
                    <div>
                        <Button
                            className="address-btn"
                            type="primary"
                            onClick={handleOpenModal}
                        >
                            Thêm địa chỉ
                        </Button>
                    </div>
                </Flex>
            </Header>
            <Content>Hello</Content>
            <Modal
                title="Thêm địa chỉ"
                open={isOpenModal}
                onOk={handleAddAddress}
                onCancel={handleCloseModal}
                cancelText="Quay lại"
                okText="Thêm địa chỉ"
            >
                <Flex vertical gap={20} style={{ margin: "20px 0" }}>
                    <Flex justify="space-between">
                        <Select
                            showSearch
                            placeholder="Tỉnh/Thành phố"
                            optionFilterProp="children"
                            // onChange={onChange}
                            // onSearch={onSearch}
                            // filterOption={filterOption}
                            options={[
                                {
                                    value: "jack",
                                    label: "Jack",
                                },
                                {
                                    value: "lucy",
                                    label: "Lucy",
                                },
                                {
                                    value: "tom",
                                    label: "Tom",
                                },
                            ]}
                        />
                        <Select
                            showSearch
                            placeholder="Tỉnh/Thành phố"
                            optionFilterProp="children"
                            // onChange={onChange}
                            // onSearch={onSearch}
                            // filterOption={filterOption}
                            options={[
                                {
                                    value: "jack",
                                    label: "Jack",
                                },
                                {
                                    value: "lucy",
                                    label: "Lucy",
                                },
                                {
                                    value: "tom",
                                    label: "Tom",
                                },
                            ]}
                        />
                        <Select
                            showSearch
                            placeholder="Tỉnh/Thành phố"
                            optionFilterProp="children"
                            // onChange={onChange}
                            // onSearch={onSearch}
                            // filterOption={filterOption}
                            options={[
                                {
                                    value: "jack",
                                    label: "Jack",
                                },
                                {
                                    value: "lucy",
                                    label: "Lucy",
                                },
                                {
                                    value: "tom",
                                    label: "Tom",
                                },
                            ]}
                        />
                    </Flex>
                    <Input placeholder="Nhập địa chỉ chi tiết" />
                    <Title level={5}>Bản đồ</Title>
                    <div>
                        <iframe
                            title="google-map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.631019022368!2d105.83993977498018!3d21.007422880636508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab8a922653a9%3A0x6c2ec19683313eab!2zMSDEkOG6oWkgQ-G7kyBWaeG7h3QsIELDoWNoIEtob2EsIEhhaSBCw6AgVHLGsG5nLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1699550440346!5m2!1svi!2s"
                            style={{ border: 0, height: 200, width: "100%" }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                    <Checkbox>Địa chỉ mặc định</Checkbox>
                </Flex>
            </Modal>
        </Layout>
    );
};

export default Address;
