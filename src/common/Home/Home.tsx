import "./Home.scss";

import {
    ArrowDownOutlined,
    ArrowUpOutlined,
    GlobalOutlined,
    UngroupOutlined,
    UsergroupAddOutlined,
    UsergroupDeleteOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";

import {
    Button,
    Card,
    Col,
    DatePicker,
    DatePickerProps,
    Flex,
    Row,
    Select,
    Space,
    Statistic,
    Tabs,
    TabsProps,
    Typography,
} from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
    clearListService,
    getAllServiceAsync,
} from "../../core/reducers/service";
import { clearListSkill, getAllSkillAsync } from "../../core/reducers/skill";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import LineChartHome from "./LineChartHome";
import { getAllUserRoleAsync } from "../../core/reducers/users";
import { Role } from "../../core/auth/roles";
import OutcomeChart from "./OutcomeChart";
import OrderChart from "./OrderChart";
import ServiceChart from "./ServiceChart";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    plugins,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { getDailyStatisticAsync } from "../../core/reducers/order";
import { OrderStatus } from "../../utils/constants";

ChartJS.register(ArcElement, Tooltip, Legend);
export const data = {
    labels: [
        "Chờ xử lý",
        "Đã giao thợ",
        "Đang thực hiện",
        "Thành công",
        "Đơn hủy",
    ],
    datasets: [
        {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                "#363062",
                "#435585",
                "#818FB4",
                "#F5E8C7",
                "rgba(153, 102, 255, 0.2)",
            ],
            borderColor: [
                "#363062",
                "#435585",
                "#818FB4",
                "#F5E8C7",
                "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
        },
    ],
};
const Home = () => {
    dayjs.extend(customParseFormat);
    const dispatch = useAppDispatch();
    const { dailyStatistic } = useAppSelector((state) => state.order);
    const { Title } = Typography;
    const { RangePicker } = DatePicker;

    const { listSkill } = useAppSelector((state) => state.skill);
    const { listService } = useAppSelector((state) => state.service);
    const { repairList, customerList } = useAppSelector((state) => state.users);
    const [titleChart, setTitleChart] = useState<string>("");
    const [timeRange, setTimeRange] = useState<[string, string] | string>("");
    const [statistic, setStatistic] = useState({
        customers: 0,
        staffs: 0,
        repairmans: 0,
        orders: {
            pending: 0,
            accepted: 0,
            checkedin: 0,
            complete: 0,
            rejected: 0,
        },
        now: {
            pending: 0,
            accepted: 0,
            checkedin: 0,
            complete: 0,
            rejected: 0,
        },
    });

    const handleGetDailyStatistic = async () => {
        await dispatch(getDailyStatisticAsync());
    };

    useEffect(() => {
        handleGetDailyStatistic();
        const getDailyStatisticInterval = setInterval(() => {
            console.log("call");
            handleGetDailyStatistic();
        }, 10000);

        return () => clearInterval(getDailyStatisticInterval);
    }, []);

    useEffect(() => {
        console.log({ dailyStatistic });
        if (dailyStatistic) {
            setStatistic({
                customers:
                    dailyStatistic.today.user.customers -
                    dailyStatistic.yesterday.user.customers,
                staffs:
                    dailyStatistic.today.user.staffs -
                    dailyStatistic.yesterday.user.staffs,
                repairmans:
                    dailyStatistic.today.user.repairmans -
                    dailyStatistic.yesterday.user.repairmans,
                orders: {
                    pending:
                        dailyStatistic.today.orders[OrderStatus.PENDING] -
                        dailyStatistic.yesterday.orders[OrderStatus.PENDING],
                    accepted:
                        dailyStatistic.today.orders[OrderStatus.ACCEPTED] -
                        dailyStatistic.yesterday.orders[OrderStatus.ACCEPTED],
                    checkedin:
                        dailyStatistic.today.orders[OrderStatus.CHECKEDIN] -
                        dailyStatistic.yesterday.orders[OrderStatus.CHECKEDIN],
                    complete:
                        dailyStatistic.today.orders[OrderStatus.COMPLETE] -
                        dailyStatistic.yesterday.orders[OrderStatus.COMPLETE],
                    rejected:
                        dailyStatistic.today.orders[OrderStatus.REJECTED] -
                        dailyStatistic.yesterday.orders[OrderStatus.REJECTED],
                },
                now: {
                    pending: dailyStatistic.today.orders[OrderStatus.PENDING],
                    accepted: dailyStatistic.today.orders[OrderStatus.ACCEPTED],
                    checkedin:
                        dailyStatistic.today.orders[OrderStatus.CHECKEDIN],
                    complete: dailyStatistic.today.orders[OrderStatus.COMPLETE],
                    rejected: dailyStatistic.today.orders[OrderStatus.REJECTED],
                },
            });
        }
    }, [dailyStatistic]);

    useEffect(() => {
        handleGetAllSkillAsync();
        handleGetAllServiceAsync();
        handleGetAllCustomerAsync();
        handleGetAllRepairAsync();

        return () => {
            dispatch(clearListService());
            dispatch(clearListSkill());
        };
    }, [dispatch]);
    const dateFormat = "YYYY/MM/DD";
    const optionsChart: any = [
        { value: "Skill", label: "Skill" },
        { value: "Service", label: "Service" },
        { value: "Customer", label: "Customer" },
        {
            value: "Repair",
            label: "Repair",
        },
        {
            value: "Revenue",
            label: "Revenue",
        },
    ];
    const handleGetAllSkillAsync = async () => {
        await dispatch(getAllSkillAsync());
    };

    const handleGetAllServiceAsync = async () => {
        await dispatch(getAllServiceAsync());
    };
    const handleGetAllCustomerAsync = async () => {
        await dispatch(getAllUserRoleAsync(Role.ROLE_USER));
    };

    const handleGetAllRepairAsync = async () => {
        await dispatch(getAllUserRoleAsync(Role.ROLE_REPAIRMAN));
    };
    const handleChange = (value: string) => {
        setTitleChart(value);
    };
    const onChangeRangeDate = (
        value: DatePickerProps["value"] | RangePickerProps["value"],
        dateString: [string, string] | string
    ) => {
        setTimeRange(dateString);
    };

    const onChange = (key: string) => {
        console.log(key);
    };

    const items: TabsProps["items"] = [
        {
            key: "1",
            label: "Doanh thu",
            children: <OutcomeChart />,
        },
        {
            key: "2",
            label: "Đơn đặt dịch vụ",
            children: <OrderChart />,
        },
        {
            key: "3",
            label: "Dịch vụ",
            children: <ServiceChart />,
        },
    ];

    return (
        <div className="home">
            <Row gutter={16}>
                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic
                            title="Số đơn hàng"
                            value={Math.abs(statistic.orders.pending)}
                            precision={0}
                            valueStyle={{
                                color:
                                    statistic.orders.pending >= 0
                                        ? "#3f8600"
                                        : "#cf1322",
                            }}
                            prefix={
                                statistic.orders.pending >= 0 ? (
                                    <ArrowUpOutlined />
                                ) : (
                                    <ArrowDownOutlined />
                                )
                            }
                            suffix="đơn"
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic
                            title="Số khách hàng mới"
                            value={Math.abs(statistic.customers)}
                            precision={0}
                            valueStyle={{
                                color:
                                    statistic.customers >= 0
                                        ? "#3f8600"
                                        : "#cf1322",
                            }}
                            prefix={
                                statistic.customers >= 0 ? (
                                    <ArrowUpOutlined />
                                ) : (
                                    <ArrowDownOutlined />
                                )
                            }
                            suffix="khách hàng"
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic
                            title="Số thợ mới"
                            value={Math.abs(statistic.repairmans)}
                            precision={0}
                            valueStyle={{
                                color:
                                    statistic.repairmans >= 0
                                        ? "#3f8600"
                                        : "#cf1322",
                            }}
                            prefix={
                                statistic.repairmans >= 0 ? (
                                    <ArrowUpOutlined />
                                ) : (
                                    <ArrowDownOutlined />
                                )
                            }
                            suffix="thợ"
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic
                            title="Số nhân viên mới"
                            value={Math.abs(statistic.staffs)}
                            precision={0}
                            valueStyle={{
                                color:
                                    statistic.staffs >= 0
                                        ? "#3f8600"
                                        : "#cf1322",
                            }}
                            prefix={
                                statistic.staffs >= 0 ? (
                                    <ArrowUpOutlined />
                                ) : (
                                    <ArrowDownOutlined />
                                )
                            }
                            suffix="nhân viên"
                        />
                    </Card>
                </Col>
            </Row>
            {/* <Flex style={{ height: "100%" }}>
                <Space style={{ background: "#fff" }}>
                    <Flex>
                        <Tabs
                            defaultActiveKey="1"
                            items={items}
                            onChange={onChange}
                        />
                    </Flex>
                </Space>
            </Flex> */}
            <Row gutter={8} className="chart-container" justify="space-between">
                <Col
                    span={16}
                    style={{
                        padding: "0 8px",
                        boxSizing: "border-box",
                    }}
                >
                    <Flex
                        style={{
                            width: "100%",
                            height: "100%",
                            background: "#fff",
                            padding: "8px",
                            borderRadius: "10px",
                        }}
                    >
                        <Tabs
                            defaultActiveKey="1"
                            items={items}
                            onChange={onChange}
                            style={{ width: "100%" }}
                        />
                    </Flex>
                </Col>
                <Col
                    span={8}
                    style={{
                        padding: "0 8px",
                        boxSizing: "border-box",
                    }}
                >
                    <Flex
                        style={{
                            width: "100%",
                            height: "100%",
                            background: "#fff",
                            padding: "8px",
                            borderRadius: "10px",
                        }}
                        vertical
                        justify="space-between"
                    >
                        <Flex justify="center" style={{ width: "100%" }}>
                            <Pie
                                data={{
                                    labels: [
                                        "Chờ xử lý",
                                        "Đã giao thợ",
                                        "Đang thực hiện",
                                        "Thành công",
                                        "Đơn hủy",
                                    ],
                                    datasets: [
                                        {
                                            label: "# of Votes",
                                            data: [
                                                statistic.now.pending,
                                                statistic.now.accepted,
                                                statistic.now.checkedin,
                                                statistic.now.complete,
                                                statistic.now.rejected,
                                            ],
                                            backgroundColor: [
                                                "#363062",
                                                "#435585",
                                                "#818FB4",
                                                "#F5E8C7",
                                                "rgba(153, 102, 255, 0.2)",
                                            ],
                                            borderColor: [
                                                "#363062",
                                                "#435585",
                                                "#818FB4",
                                                "#F5E8C7",
                                                "rgba(153, 102, 255, 1)",
                                            ],
                                            borderWidth: 1,
                                        },
                                    ],
                                }}
                                options={{
                                    plugins: {
                                        title: {
                                            display: true,
                                            text: "Biểu đồ thống kê ngày",
                                        },
                                    },
                                }}
                            />
                        </Flex>
                        <Button
                            type="primary"
                            style={{ background: "#435585" }}
                        >
                            Xuất file thống kê excel
                        </Button>
                    </Flex>
                </Col>
            </Row>
        </div>
    );
};

export default Home;
