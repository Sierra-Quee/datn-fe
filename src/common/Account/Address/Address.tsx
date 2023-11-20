import { Button, Checkbox, Flex, Form, Input, Layout, Modal } from "antd";
import "./Address.scss";
import { Typography, Select } from "antd";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { IAddress } from "../../../utils/model";
import AddressCard from "./AddressCard";
import AddAddressPopup from "./AddAddressPopup";
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
    const address: IAddress = {
        addressId: 12,
        address: "cụm 2/xã Duyên Thái, huyện Thường Tín, thành phố Hà Nội",
        userId: "a",
        latitude: 1,
        longitude: 1,
        isMainAddress: true,
    };
    return (
        <Layout>
            <Header className="address-header">
                <Flex
                    className="address-header__content"
                    style={{ width: "100%" }}
                >
                    <Title level={3}>Quản lý địa điểm</Title>
                    <div>
                        <Button
                            className="address-btn"
                            type="primary"
                            onClick={handleOpenModal}
                            icon={<PlusOutlined />}
                        >
                            Thêm địa chỉ
                        </Button>
                    </div>
                </Flex>
            </Header>
            <Content
                style={{
                    backgroundColor: "white",
                    padding: "10px",
                    overflow: "auto",
                    maxHeight: "450px",
                }}
            >
                <AddressCard address={address} />
                <AddressCard address={address} />
                <AddressCard address={address} />
                <AddressCard address={address} />
                <AddressCard address={address} />
            </Content>
            <AddAddressPopup
                isOpen={isOpenModal}
                close={handleCloseModal}
                open={handleOpenModal}
                submit={handleAddAddress}
            />
        </Layout>
    );
};

export default Address;
