import { Button, Flex, Layout, Space, Table, theme, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { ReactNode, useEffect, useState } from "react";
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
const { Text, Title } = Typography;
type Props = {};
interface DataType {
    key: React.Key;
    serviceId: number;
    name: string;
    price: number;
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
    console.log({ cartData });
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log("selectedRowKeys changed: ", newSelectedRowKeys);
        const selectedItem = newSelectedRowKeys.map(
            (val) => cartData[parseInt(val.toString())]
        );
        const selected = selectedItem.map(
            (val) => cartItemList[parseInt(val.key.toString())]
        );
        dispatch(setItemsForCheckout(selected));
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const handleDeleteItem = async (cartItem: ICartItem) => {
        try {
            dispatch(removeItemToCheckout(cartItem));
            if (cartItem.id) {
                await dispatch(deleteCartItemAsync(cartItem.id.toString()));
            }
            dispatch(getCartAsync());
        } catch (error) {}
    };
    console.log({ cartItemForCheckout });
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
                    price: item.service.price,
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
    return (
        <Layout
            style={{
                padding: "24px 0",
                background: colorBgContainer,
                width: "60%",
                margin: "auto",
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
                        Giá từ: <Text className="priceValue">{"1120000"}</Text>
                    </Text>
                    <Button
                        style={{ maxWidth: "200px" }}
                        type="primary"
                        onClick={handleForwardToCheckout}
                    >
                        Đặt dịch vụ
                    </Button>
                </Flex>
            </Flex>
        </Layout>
    );
};

export default Cart;
