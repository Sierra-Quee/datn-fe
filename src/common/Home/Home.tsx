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
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
export const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
        {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
        },
    ],
};
const Home = () => {
    dayjs.extend(customParseFormat);
    const dispatch = useAppDispatch();
    const { Title } = Typography;
    const { RangePicker } = DatePicker;

    const { listSkill } = useAppSelector((state) => state.skill);
    const { listService } = useAppSelector((state) => state.service);
    const { repairList, customerList } = useAppSelector((state) => state.users);
    const [titleChart, setTitleChart] = useState<string>("");
    const [timeRange, setTimeRange] = useState<[string, string] | string>("");

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
                            value={6}
                            precision={2}
                            valueStyle={{ color: "#3f8600" }}
                            prefix={<ArrowUpOutlined />}
                            suffix="đơn"
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic
                            title="Số khách hàng mới"
                            value={9.3}
                            precision={2}
                            valueStyle={{ color: "#cf1322" }}
                            prefix={<ArrowDownOutlined />}
                            suffix="khách hàng"
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic
                            title="Số thợ mới"
                            value={9}
                            precision={0}
                            valueStyle={{ color: "#cf1322" }}
                            prefix={<ArrowDownOutlined />}
                            suffix="thợ"
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic
                            title="Số nhân viên mới"
                            value={9}
                            precision={0}
                            valueStyle={{ color: "#cf1322" }}
                            prefix={<ArrowDownOutlined />}
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
                    >
                        <div>
                            <Pie data={data} />
                        </div>
                    </Flex>
                </Col>
            </Row>
        </div>
    );
};

export default Home;
