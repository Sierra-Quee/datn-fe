import { SearchOutlined } from "@ant-design/icons";
import { Input, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useCallback, useEffect, useState } from "react";
import {
    OrderStatus,
    clearListOrder,
    clearListOrderByUser,
    getAllByUserIdOrderAsync,
    getAllOrderAsync,
    getDetailOrderAsync,
} from "../../core/reducers/order";
import useDebounce from "../../hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { FORMAT_DATETIME } from "../../utils/constants";
import {
    colorOrderStatus,
    convertOrderStatus,
    formatDate,
} from "../../utils/functions/utils";
import { IOrder } from "../../utils/model";
import DetailOrder from "./DetailOrder/DetailOrder";
import { Role } from "../../core/auth/roles";
import ChangeStatus from "./ChangeStatus/ChangeStatus";

const Order = () => {
    const dispatch = useAppDispatch();
    const [searchInput, setSearchInput] = useState<string>("");
    const [order, setListOrder] = useState<IOrder[]>([]);
    const [isOpenPanelDetailOrder, setIsOpenPanelDetailOrder] =
        useState<boolean>(false);
    const [isChangeStatusOrder, setIsChangeStatusOrder] =
        useState<boolean>(false);
    const debounce = useDebounce(searchInput);
    const { orderList, orderUser, detailOrder } = useAppSelector(
        (state) => state.orders
    );
    const { account } = useAppSelector((state) => state.authentication);
    const handleFindOrder = (e: any) => {
        setSearchInput(e.target.value);
    };
    const handleGetAllOrder = useCallback(async () => {
        await dispatch(getAllOrderAsync());
    }, []);
    const handleGetAllOrderByUserId = useCallback(async (id: number) => {
        await dispatch(getAllByUserIdOrderAsync(id));
    }, []);
    const handleGetDetailOrder = useCallback(async (id: number) => {
        await dispatch(getDetailOrderAsync(id));
    }, []);
    useEffect(() => {
        handleGetAllOrder();
        return () => {
            dispatch(clearListOrder());
            dispatch(clearListOrderByUser());
        };
    }, []);
    useEffect(() => {
        setListOrder(orderList);
    }, [orderList]);
    const handleChangeStatusOrder = (
        role: Role | undefined,
        status: OrderStatus | undefined
    ) => {
        switch (role) {
            case Role.ROLE_ADMIN:
            case Role.ROLE_SUPERADMIN:
            case Role.ROLE_USER:
        }
    };
    const handleConfirmPanel = () => {
        setIsOpenPanelDetailOrder(false);
    };
    const handleConfirmPanelChangeStatus = () => {
        setIsChangeStatusOrder(false);
    };
    const columns: ColumnsType<IOrder> = [
        {
            title: "Mã đơn hàng",
            dataIndex: "orderId",
            key: "orderId",
            fixed: "left",
            width: 120,
        },
        {
            title: "Code",
            dataIndex: "code",
            key: "code",
            fixed: "left",
            width: 150,
            render: (_: any, record: IOrder) => {
                return (
                    <div>
                        <div
                            style={{
                                textDecoration: "solid underline",
                                cursor: "pointer",
                                width: "fit-content",
                            }}
                            onClick={() => {
                                setIsOpenPanelDetailOrder(true);
                                dispatch(getDetailOrderAsync(record.orderId));
                            }}
                        >
                            {record.code}
                        </div>
                    </div>
                );
            },
        },
        {
            title: "Ngày sửa chữa",
            dataIndex: "expectDate",
            key: "expectDate",
        },
        {
            title: "Dịch vụ sửa chữa",
            dataIndex: "orderDetail",
            key: "orderDetail",
        },
        {
            title: "Chi phí phát sinh",
            dataIndex: "incurredCost",
            key: "incurredCost",
        },
        {
            title: "Trạng thái",
            key: "status",
            dataIndex: "status",
            fixed: "right",
            width: 100,
            render: (_: any, record: IOrder) => (
                <div
                    style={{ backgroundColor: colorOrderStatus(record.status) }}
                    onClick={() =>
                        handleChangeStatusOrder(account?.role, record.status)
                    }
                >
                    {convertOrderStatus(record.status)}
                </div>
            ),
        },
    ];
    return (
        // <Spin>
        <div className="system-repair">
            <h2>Danh sách đơn hàng</h2>
            <div className="header-table-repair">
                <Input
                    addonBefore={
                        <SearchOutlined style={{ fontSize: "20px" }} />
                    }
                    placeholder="Nhập mã đơn hàng cần tìm kiếm"
                    onChange={handleFindOrder}
                />
            </div>
            <Table
                columns={columns}
                dataSource={orderList.map((e) => {
                    return {
                        ...e,
                        key: e.orderId,
                        expectDate: formatDate(e.expectDate, FORMAT_DATETIME),
                    };
                })}
                pagination={{ pageSize: 7 }}
                scroll={{ x: 1300 }}
            />
            {isOpenPanelDetailOrder && (
                <DetailOrder
                    isOpenPanel={isOpenPanelDetailOrder}
                    handleConfirmPanel={handleConfirmPanel}
                    info={detailOrder}
                />
            )}
            {isChangeStatusOrder && (
                <ChangeStatus
                    isOpenPanel={isChangeStatusOrder}
                    handleConfirmPanel={handleConfirmPanelChangeStatus}
                    info={detailOrder}
                />
            )}
        </div>
        // </Spin>
    );
};

export default Order;
