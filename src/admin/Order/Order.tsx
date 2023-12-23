import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import {
    Button,
    DatePicker,
    DatePickerProps,
    Flex,
    Input,
    Select,
    SelectProps,
    Spin,
    Table,
    Typography,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { useCallback, useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { FORMAT_DATETIME, OrderStatus } from "../../utils/constants";
import { formatDate } from "../../utils/functions/utils";
import { IOrder } from "../../utils/model";
import { clearOrderList, getAllOrderAsync } from "../../core/reducers/order";
import { formatOrderStatusName } from "../../utils/functions/formation";
import { IGetAllOrderQuery } from "../../api/order/orderApi";
import { toast } from "react-toastify";
import { utils, writeFile } from "xlsx";
import { Link } from "react-router-dom";
const { Option } = Select;
const { Title } = Typography;
interface IOrderTable {
    code: string;
    userName: string;
    createdAt: string;
    expectedDate: string;
    repairman: string | null;
    status: string;
    id: string | number;
    service: string;
}
const StatusOptions: SelectProps["options"] = [
    {
        value: 100,
        label: "Tất cả trạng thái",
    },
    {
        value: OrderStatus.PENDING,
        label: "Đang xử lý",
    },
    {
        value: OrderStatus.ACCEPTED,
        label: "Đã giao thợ sửa chữa",
    },
    {
        value: OrderStatus.CHECKEDIN,
        label: "Đang tiến hành sửa",
    },
    {
        value: OrderStatus.COMPLETE,
        label: "Đã hoàn thành",
    },
    {
        value: OrderStatus.REJECTED,
        label: "Đã hủy",
    },
];
const Order = () => {
    const dispatch = useAppDispatch();
    const [searchInput, setSearchInput] = useState<string>("");
    const [listOrder, setListOrder] = useState<IOrderTable[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<OrderStatus | 100>();
    const [selectedStartDate, setSelectedStartDate] = useState<string>();
    const [selectedEndDate, setSelectedEndDate] = useState<string>();
    const debounce = useDebounce(searchInput);
    const { orderList, loadingOrderList } = useAppSelector(
        (state) => state.orders
    );
    const { account } = useAppSelector((state) => state.authentication);
    const handleFindOrder = (e: any) => {
        setSearchInput(e.target.value);
    };
    const handleGetAllOrder = useCallback(async (query: IGetAllOrderQuery) => {
        await dispatch(getAllOrderAsync(query));
    }, []);
    const handleChangeSelectedStatus = (value?: OrderStatus | 100) => {
        setSelectedStatus(value);
    };
    const handleChangeSelectedStartDate: DatePickerProps["onChange"] = (
        _,
        value: string
    ) => {
        setSelectedStartDate(value);
    };
    const handleChangeSelectedEndDate: DatePickerProps["onChange"] = (
        _,
        value: string
    ) => {
        setSelectedEndDate(value);
    };
    useEffect(() => {
        const query: IGetAllOrderQuery = {
            status: selectedStatus,
            from: selectedStartDate,
            to: selectedEndDate,
        };
        handleGetAllOrder(query);
        return () => {
            // dispatch(clearOrdesrList());
            // dispatch(clearListOrderByUser());
        };
    }, [selectedStatus, selectedEndDate, selectedStartDate]);
    useEffect(() => {
        if (Array.isArray(orderList) && orderList.length > 0) {
            const orders: IOrderTable[] = orderList.map((order: IOrder) => {
                return {
                    code: order.code || "",
                    id: order.orderId || "",
                    userName: `${order.user?.lastName} ${order.user?.firstName}`,
                    repairman: order.repairman
                        ? `${order.repairman?.lastName} ${order.repairman?.firstName}`
                        : null,
                    createdAt: order.createdAt || "",
                    expectedDate: order.expectedDate,
                    status: formatOrderStatusName(order.status),
                    service:
                        Array.isArray(order.orderDetails) &&
                        order.orderDetails.length > 0
                            ? order.orderDetails
                                  .map((detail) => detail.service?.name)
                                  .join(", ")
                            : "",
                };
            });
            setListOrder(orders);
        } else setListOrder([]);
    }, [orderList]);
    const columns: ColumnsType<IOrderTable> = [
        {
            title: "Mã đơn hàng",
            dataIndex: "code",
            key: "code",
            fixed: "left",
            width: 240,
            render: (_: any, record: IOrderTable) => {
                return (
                    <Link to={`/admin/list-order/${record.id}`}>
                        {record.code}
                    </Link>
                );
            },
        },
        {
            title: "Khách hàng",
            dataIndex: "userName",
            key: "userName",
            fixed: "left",
            width: 150,
        },
        {
            title: "Ngày đặt dịch vụ",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (_: any, record: IOrderTable) => (
                <div>{formatDate(record.createdAt)}</div>
            ),
        },
        {
            title: "Ngày dự kiến",
            dataIndex: "expectedDate",
            key: "expectedDate",
            render: (_: any, record: IOrderTable) => (
                <div>{formatDate(record.expectedDate)}</div>
            ),
        },
        {
            title: "Dịch vụ sửa chữa",
            dataIndex: "service",
            key: "service",
            render: (_: any, record: IOrderTable) => (
                <div>{record.service.slice(0, 20)}...</div>
            ),
        },
        {
            title: "Thợ sửa chữa",
            dataIndex: "repairman",
            key: "repairman",
        },
        {
            title: "Trạng thái",
            key: "status",
            dataIndex: "status",
            fixed: "right",
            width: 200,
        },
    ];

    const handleExport = () => {
        const headings = [
            [
                "Mã đơn",
                "Khách hàng",
                "Ngày đặt dịch vụ",
                "Ngày sửa",
                "Dịch vụ",
                "Thợ sửa chữa",
                "Trạng thái",
            ],
        ];
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        ws["!cols"] = [
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 50 },
            { wch: 20 },
            { wch: 20 },
        ];
        utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, listOrder, {
            origin: "A2",
            skipHeader: true,
        });
        utils.book_append_sheet(wb, ws, "Report");
        writeFile(wb, "orders.xlsx");
        toast.success("Xuất file thành công");
    };

    return (
        <Spin spinning={loadingOrderList}>
            <div className="system-repair">
                <h2>Danh sách đơn hàng</h2>
                <Flex align="center" gap={10} style={{ marginBottom: "10px" }}>
                    <Input
                        addonBefore={
                            <SearchOutlined style={{ fontSize: "20px" }} />
                        }
                        placeholder="Nhập mã đơn hàng cần tìm kiếm"
                        onChange={handleFindOrder}
                        style={{ width: "20%" }}
                    />
                    <Flex
                        style={{ width: "20%" }}
                        justify="space-between"
                        align="center"
                    >
                        <Title level={5} style={{ margin: 0 }}>
                            Từ:
                        </Title>
                        <DatePicker
                            onChange={handleChangeSelectedStartDate}
                            style={{ width: "80%" }}
                        />
                    </Flex>
                    <Flex
                        gap={5}
                        style={{ width: "20%" }}
                        justify="space-between"
                        align="center"
                    >
                        <Title level={5} style={{ margin: 0 }}>
                            Đến:
                        </Title>
                        <DatePicker
                            onChange={handleChangeSelectedEndDate}
                            style={{ width: "80%" }}
                        />
                    </Flex>
                    <Flex align="center" gap={5} style={{ width: "20%" }}>
                        <Title level={5} style={{ margin: 0 }}>
                            Trạng thái:
                        </Title>
                        <Select
                            defaultValue={100}
                            onChange={handleChangeSelectedStatus}
                            style={{ width: 150 }}
                            options={StatusOptions}
                        />
                    </Flex>
                    <Button
                        type="primary"
                        onClick={handleExport}
                        icon={<DownloadOutlined />}
                        style={{ width: "20%", margin: 0 }}
                    >
                        Xuất file excel
                    </Button>
                </Flex>
                <Table
                    columns={columns}
                    dataSource={listOrder}
                    pagination={{ pageSize: 7 }}
                    scroll={{ x: 1300 }}
                />
            </div>
        </Spin>
    );
};

export default Order;
