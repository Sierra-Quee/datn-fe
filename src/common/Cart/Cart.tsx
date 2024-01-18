import { Button, Flex, Layout, Space, Table, theme, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { ICartItem } from "../../utils/model";
import type { ColumnsType } from "antd/es/table";
import type { TableRowSelection } from "antd/es/table/interface";
import {
    deleteCartItemAsync,
    getCartAsync,
    removeItemToCheckout,
    setItemsForCheckout,
} from "../../core/reducers/cart";
import { DeleteOutlined } from "@ant-design/icons";
import "./Cart.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { formatCurrency } from "../../utils/functions/formation";
import fetchHandler from "../../api/axios";
import { getCart } from "../../api/cart/cart";
const { Text, Title } = Typography;
type Props = {};
interface DataType {
    key: React.Key;
    serviceId: number;
    name: string;
    price: number | string;
    isChoosen: boolean;
    delete: ReactNode;
}
const columns: ColumnsType<DataType> = [
    {
        title: "Mã dịch vụ",
        dataIndex: "serviceId",
    },
    {
        title: "Tên dịch vụ",
        dataIndex: "name",
    },
    {
        title: "Giá dịch vụ",
        dataIndex: "price",
    },
    {
        title: "Xóa",
        dataIndex: "delete",
    },
];
const Cart = (props: Props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const { cartItemList, cartItemForCheckout } = useAppSelector(
        (state) => state.cart
    );
    const [cartData, setCartData] = useState<DataType[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const onSelectChange = async (newSelectedRowKeys: React.Key[]) => {
        const selectedItem = newSelectedRowKeys.map(
            (val) => cartData[parseInt(val.toString())]
        );
        const selected = selectedItem.map(
            (val) => cartItemList[parseInt(val.key.toString())]
        );
        const selectedId = selected.map((val) => val.id);
        console.log({ selectedId });
        await Promise.all(
            cartItemList.map(async (val) => {
                if (selectedId.includes(val.id) && val.isChoosen === false) {
                    console.log(val.id);
                    await handleChooseCartItem(val.id);
                    return;
                }
                if (!selectedId.includes(val.id) && val.isChoosen === true) {
                    await handleChooseCartItem(val.id);
                }
            })
        );
        dispatch(setItemsForCheckout(selected));
        setSelectedRowKeys(newSelectedRowKeys);
        await dispatch(getCartAsync());
    };
    const handleDeleteItem = async (cartItem: ICartItem) => {
        try {
            dispatch(removeItemToCheckout(cartItem));
            if (cartItem.id) {
                await dispatch(deleteCartItemAsync(cartItem.id.toString()));
                await dispatch(getCartAsync());
            }
            // dispatch(getCartAsync());
        } catch (error) {}
    };
    const rowSelection: TableRowSelection<DataType> = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
            {
                key: "odd",
                text: "Select Odd Row",
                onSelect: (changeableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changeableRowKeys.filter(
                        (_, index) => {
                            if (index % 2 !== 0) {
                                return false;
                            }
                            return true;
                        }
                    );
                    setSelectedRowKeys(newSelectedRowKeys);
                },
            },
            {
                key: "even",
                text: "Select Even Row",
                onSelect: (changeableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changeableRowKeys.filter(
                        (_, index) => {
                            if (index % 2 !== 0) {
                                return true;
                            }
                            return false;
                        }
                    );
                    setSelectedRowKeys(newSelectedRowKeys);
                },
            },
        ],
    };
    useEffect(() => {
        if (Array.isArray(cartItemList)) {
            const data = cartItemList.map((item: ICartItem, index: number) => {
                const formattedData: DataType = {
                    key: index,
                    serviceId: item.service.serviceId,
                    name: item.service.name,
                    price: formatCurrency(item.service.price),
                    isChoosen: item.isChoosen,
                    delete: (
                        <DeleteOutlined
                            style={{
                                fontSize: "20px",
                                color: "red",
                                cursor: "pointer",
                            }}
                            onClick={async () => await handleDeleteItem(item)}
                        />
                    ),
                };
                if (item.isChoosen) {
                    setSelectedRowKeys([...selectedRowKeys, index]);
                }
                return formattedData;
            });
            setCartData(data);
        }
    }, [cartItemList]);
    const handleForwardToCheckout = () => {
        if (cartItemForCheckout.length > 0) {
            navigate("/checkout");
        } else {
            toast.error("Bạn chưa chọn dịch vụ để đặt");
        }
    };
    const handleChooseCartItem = async (cartItemId?: number) => {
        if (!cartItemId) return;
        try {
            await fetchHandler.patch(`/cart/chooseCartItem/${cartItemId}`);
        } catch (error) {
            toast.error("Đã có lỗi xảy ra");
            throw error;
        }
    };
    console.log({ cartItemForCheckout });
    return (
        <Layout
            style={{
                padding: "24px 0",
                background: colorBgContainer,
                width: "80%",
                margin: "50px auto",
                borderRadius: "5px",
                minHeight: "80vh",
            }}
            className="cartLayout"
        >
            <Flex vertical className="cartContainer">
                <Title level={3} style={{ textAlign: "center" }}>
                    Giỏ hàng
                </Title>
                <Table
                    columns={columns}
                    dataSource={cartData}
                    style={{ width: "100%" }}
                    rowSelection={rowSelection}
                />
                <Flex justify="space-between">
                    <Text className="priceLabel">
                        Giá từ:{" "}
                        <Text className="priceValue">
                            {Array.isArray(cartItemForCheckout) &&
                                cartItemForCheckout.reduce(
                                    (total, item) =>
                                        (total += parseInt(item.service.price)),
                                    0
                                )}
                        </Text>
                    </Text>
                    <Button
                        type="primary"
                        onClick={handleForwardToCheckout}
                        style={{ background: "#435585", maxWidth: "200px" }}
                    >
                        Đặt dịch vụ
                    </Button>
                </Flex>
            </Flex>
        </Layout>
    );
};

export default Cart;
