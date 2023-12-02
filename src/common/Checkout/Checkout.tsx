import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import cart from "../../core/reducers/cart";
import { Button, Flex, Layout, Table, theme, Typography } from "antd";
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
    const handleGetAddressList = async () => {
        if (account) {
            await dispatch(getAllAddressAsync(account.userId));
        }
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
    console.log({ addedInfoList1: addedInfoList });
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
                            <Flex align="center">
                                <Text>{address.address}</Text>
                                {address.isMainAddress && (
                                    <Button danger>Mặc định</Button>
                                )}
                                <Button
                                    size="small"
                                    style={{ maxWidth: "100px" }}
                                    type="primary"
                                >
                                    Thay đổi
                                </Button>
                            </Flex>
                        )}
                    </Flex>
                    <Flex className="checkoutServices" vertical>
                        <Title level={3}>Danh sách dịch vụ</Title>
                        <Flex vertical>
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
                    <Flex>{}</Flex>
                </Flex>
            </Layout>
        </>
    );
};

export default Checkout;
