import { useEffect, useState } from "react";
import { IDetailOrder, IOrder } from "../../../utils/model";
import { useAppDispatch } from "../../../redux/hook";
import {
    Button,
    Divider,
    Empty,
    Flex,
    Pagination,
    Spin,
    Typography,
} from "antd";
import "./OrderList.scss";
import { useNavigate } from "react-router-dom";
const { Text, Paragraph, Title } = Typography;
type Props = {
    data: IOrder[];
    spinning: boolean;
};
interface IOrderListItem {
    order: IOrder;
}
const OrderListItem = ({ order }: IOrderListItem) => {
    const navigate = useNavigate();
    return (
        <Flex vertical className="orderListItem">
            <Flex justify="space-between" align="center">
                <Title copyable level={5}>
                    {order.code}
                </Title>
                <Paragraph>{order.updatedAt}</Paragraph>
            </Flex>
            <Divider />
            <Flex justify="space-between">
                <Flex vertical gap={5}>
                    {order.orderDetails?.map((detail: IDetailOrder) => (
                        <Text>{detail.service?.name}</Text>
                    ))}
                </Flex>
                <Flex justify="flex-end" align="end">
                    <Button
                        size="small"
                        type="primary"
                        onClick={() => navigate(`/user/order/${order.orderId}`)}
                        style={{ background: "#435585" }}
                    >
                        Xem chi tiết
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    );
};
const OrderList = ({ data, spinning }: Props) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [orderListRender, setOrderListRender] = useState<IOrder[]>([]);
    console.log({ data });
    const handleChangePage = (pageNum: number, pageSize: number) => {
        setCurrentPage(pageNum);
    };
    useEffect(() => {
        setOrderListRender(data.slice(currentPage * 3 - 3, currentPage * 3));
    }, [currentPage, data]);

    return (
        <div style={{ height: "100%" }}>
            <Spin style={{ height: "100%" }} spinning={spinning}>
                {data.length > 0 ? (
                    <div className="orderList-container">
                        <div className="orderList-list">
                            {orderListRender.map((order: IOrder) => (
                                <OrderListItem order={order} key={order.code} />
                            ))}
                        </div>
                        <Pagination
                            defaultCurrent={1}
                            current={currentPage}
                            pageSize={3}
                            total={data.length}
                            onChange={handleChangePage}
                        />
                    </div>
                ) : (
                    <Empty />
                )}
            </Spin>
        </div>
    );
};

export default OrderList;
