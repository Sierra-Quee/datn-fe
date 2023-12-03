import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import cart from "../../core/reducers/cart";
import {
    Button,
    DatePicker,
    Flex,
    Layout,
    Modal,
    Radio,
    RadioChangeEvent,
    Space,
    Table,
    theme,
    Typography,
} from "antd";
import { getAllAddressAsync } from "../../core/reducers/address";
import { IAddress, ICartItem } from "../../utils/model";
import "./Checkout.scss";
import CheckoutItem, { IAddedInfo } from "./CheckoutItem/CheckoutItem";
const { Title, Text } = Typography;
type Props = {};

const Checkout = (props: Props) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const dispatch = useAppDispatch();
    const { cartItemForCheckout } = useAppSelector((state) => state.cart);
    const { addressList } = useAppSelector((state) => state.address);
    const { account } = useAppSelector((state) => state.authentication);
    const [addedInfoList, setAddedInfoList] = useState<IAddedInfo[]>([]);
    const [isOpenAddressModal, setIsOpenAddressModal] =
        useState<boolean>(false);
    const [selectedAddress, setSelectedAddress] = useState<number>(0);
    const [expectedDate, setExpectedDate] = useState<string>("");
    const handleGetAddressList = async () => {
        if (account) {
            await dispatch(getAllAddressAsync(account.userId));
        }
    };
    const handleOpenAddressModal = () => {
        setIsOpenAddressModal(true);
    };
    const handleCloseAddressModal = () => {
        setIsOpenAddressModal(false);
    };
    const handleChangeAddress = (e: RadioChangeEvent) => {
        setSelectedAddress(e.target.value);
    };
    useEffect(() => {
        handleGetAddressList();
    }, [account]);
    useEffect(() => {
        if (
            Array.isArray(cartItemForCheckout) &&
            cartItemForCheckout.length > 0
        ) {
            setAddedInfoList(new Array(cartItemForCheckout.length).fill({}));
        }
    }, [cartItemForCheckout]);
    const address =
        addressList.filter((add: IAddress) => add.isMainAddress)[0] ||
        addressList[0];
    console.log({ addedInfoList1: addedInfoList, addressList });
    return (
        <>
            <Layout
                style={{
                    padding: "24px 0",
                    background: colorBgContainer,
                    width: "60%",
                    margin: "auto",
                    borderRadius: "5px",
                    minHeight: "80vh",
                }}
                className="checkoutLayout"
            >
                <Flex vertical gap={20}>
                    <Flex className="checkoutAddress" vertical>
                        <Title level={3}>Địa chỉ sửa chữa</Title>
                        {addressList.length === 0 ? (
                            <Flex>
                                <Text>Chưa có địa chỉ</Text>
                                <Button>Thêm địa chỉ</Button>
                            </Flex>
                        ) : (
                            <Flex gap={20}>
                                <Text>{address.address}</Text>
                                {address.isMainAddress && (
                                    <Button danger>Mặc định</Button>
                                )}
                                <Button
                                    size="small"
                                    style={{ maxWidth: "100px" }}
                                    type="primary"
                                    onClick={handleOpenAddressModal}
                                >
                                    Thay đổi
                                </Button>
                            </Flex>
                        )}
                    </Flex>
                    <Flex className="checkoutServices" vertical gap={10}>
                        <Title level={3}>Danh sách dịch vụ</Title>
                        <Flex style={{ padding: "10px" }}>
                            <Title
                                style={{
                                    width: "10%",
                                    margin: 0,
                                    textAlign: "center",
                                }}
                                level={5}
                            >
                                Mã dịch vụ
                            </Title>
                            <Title
                                style={{
                                    width: "50%",
                                    margin: 0,
                                    textAlign: "center",
                                }}
                                level={5}
                            >
                                Tên dịch vụ
                            </Title>
                            <Title
                                style={{
                                    width: "20%",
                                    margin: 0,
                                    textAlign: "center",
                                }}
                                level={5}
                            >
                                Giá từ
                            </Title>
                        </Flex>
                        <Flex vertical gap={20}>
                            {cartItemForCheckout.map(
                                (item: ICartItem, index: number) => (
                                    <CheckoutItem
                                        service={item.service}
                                        key={item.id}
                                        index={index}
                                        addedInfoList={addedInfoList}
                                        setAddedInfoList={setAddedInfoList}
                                    />
                                )
                            )}
                        </Flex>
                    </Flex>
                    <Flex
                        className="checkoutAdditiveInfo"
                        justify="space-between"
                        align="start"
                    >
                        <Space>
                            <Title level={3}>Thông tin bổ sung</Title>
                        </Space>
                        <Flex vertical gap={10}>
                            <Flex gap={50}>
                                <Title level={5}>Ngày sửa chữa mong muốn</Title>
                                <Space>
                                    <DatePicker showTime />
                                </Space>
                            </Flex>
                            <Flex justify="space-between">
                                <Title level={5}>Tổng tiền dự kiến</Title>
                                <Title level={4}>
                                    {cartItemForCheckout
                                        ? cartItemForCheckout.reduce(
                                              (total, item) =>
                                                  (total += parseInt(
                                                      item.service.price
                                                  )),
                                              0
                                          )
                                        : 0}
                                </Title>
                            </Flex>
                            <Button type="primary">Đặt dịch vụ</Button>
                        </Flex>
                    </Flex>
                </Flex>
            </Layout>
            <Modal
                open={isOpenAddressModal}
                onCancel={handleCloseAddressModal}
                onOk={handleCloseAddressModal}
            >
                <Flex vertical>
                    <Title level={3} style={{ margin: 0 }}>
                        Địa chỉ giao hàng
                    </Title>
                    <Space direction="vertical">
                        <Radio.Group
                            value={selectedAddress}
                            onChange={handleChangeAddress}
                        >
                            {addressList.map((address, index) => (
                                <Radio value={index}>{address.address}</Radio>
                            ))}
                        </Radio.Group>
                    </Space>
                </Flex>
            </Modal>
        </>
    );
};

export default Checkout;
