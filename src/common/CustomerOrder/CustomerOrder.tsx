import { Tabs, TabsProps } from "antd";
import React, { useEffect, useState } from "react";
import "./CustomerOrder.scss";
import OrderList from "./OrderList/OrderList";
import { OrderStatus } from "../../utils/constants";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { IOrder } from "../../utils/model";
import {
    clearOrderList,
    getAllOrderByUserIdAsync,
} from "../../core/reducers/order";

type Props = {};

const CustomerOrder = (props: Props) => {
    const dispatch = useAppDispatch();
    const [renderData, setRenderData] = useState<IOrder[]>([]);
    const [status, setStatus] = useState<number>(0);
    const { orderList, loadingOrderList } = useAppSelector(
        (state) => state.order
    );
    const onChange = (key: string) => {
        setStatus(parseInt(key));
    };
    const { account } = useAppSelector((state) => state.authentication);
    const handleGetData = async () => {
        await dispatch(
            getAllOrderByUserIdAsync({
                userId: account.userId,
                status: status,
            })
        );
    };
    useEffect(() => {
        if (account) handleGetData();

        return () => {
            dispatch(clearOrderList);
        };
    }, [status, account]);

    useEffect(() => {
        if (orderList) {
            console.log({ orderList });
            setRenderData([...orderList]);
        }
    }, [orderList]);
    const items: TabsProps["items"] = [
        {
            key: OrderStatus.PENDING.toString(),
            label: "Đang xử lý",
            children: (
                <OrderList data={renderData} spinning={loadingOrderList} />
            ),
        },
        {
            key: OrderStatus.ACCEPTED.toString(),
            label: "Đã xác nhận",
            children: (
                <OrderList data={renderData} spinning={loadingOrderList} />
            ),
        },
        {
            key: OrderStatus.CHECKEDIN.toString(),
            label: "Đang thực hiện",
            children: (
                <OrderList data={renderData} spinning={loadingOrderList} />
            ),
        },
        {
            key: OrderStatus.COMPLETE.toString(),
            label: "Đơn thành công",
            children: (
                <OrderList data={renderData} spinning={loadingOrderList} />
            ),
        },
        {
            key: OrderStatus.REJECTED.toString(),
            label: "Đơn hủy",
            children: (
                <OrderList data={renderData} spinning={loadingOrderList} />
            ),
        },
    ];
    return (
        <Tabs
            defaultActiveKey="0"
            items={items}
            onChange={onChange}
            style={{ width: "100%" }}
        />
    );
};

export default CustomerOrder;
