import {
    Button,
    Checkbox,
    Empty,
    Flex,
    Form,
    Input,
    Layout,
    Modal,
    Spin,
} from "antd";
import "./Address.scss";
import { Typography, Select } from "antd";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { IAddress } from "../../../utils/model";
import AddressCard from "./AddressCard";
import AddAddressPopup from "./AddAddressPopup";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import {
    clearAddressList,
    getAllAddressAsync,
} from "../../../core/reducers/address";
const { Header, Content } = Layout;

const { Title } = Typography;
type Props = {};

const Address = (props: Props) => {
    const dispatch = useAppDispatch();
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const { addressList, loadingAddress } = useAppSelector(
        (state) => state.address
    );

    if (loadingAddress) {
        console.log("loading");
    }

    console.log({ addressList });
    const handleOpenModal = () => {
        setIsOpenModal(true);
    };
    const handleCloseModal = () => {
        setIsOpenModal(false);
    };
    const handleAddAddress = () => {};

    const { account } = useAppSelector((state) => state.authentication);

    const handleGetAllAddress = async (userId: string) => {
        await dispatch(getAllAddressAsync(userId));
    };
    useEffect(() => {
        handleGetAllAddress(account.userId);
        return () => {
            dispatch(clearAddressList());
        };
    }, []);
    return (
        <Layout>
            <Header className="address-header">
                <Flex
                    className="address-header__content"
                    style={{ width: "100%", padding: "0 20px" }}
                >
                    <Title level={3}>Quản lý địa điểm</Title>
                    <div>
                        <Button
                            className="address-btn"
                            type="primary"
                            onClick={handleOpenModal}
                            icon={<PlusOutlined />}
                            style={{ background: "#435585" }}
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
                {addressList.length ? (
                    addressList.map((address) => (
                        <AddressCard
                            key={address.addressId}
                            address={address}
                        />
                    ))
                ) : (
                    <Empty />
                )}
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
