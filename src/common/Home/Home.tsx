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
            label: "Đơn hàng",
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
                            title="Active"
                            value={11.28}
                            precision={2}
                            valueStyle={{ color: "#3f8600" }}
                            prefix={<ArrowUpOutlined />}
                            suffix="%"
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic
                            title="Idle"
                            value={9.3}
                            precision={2}
                            valueStyle={{ color: "#cf1322" }}
                            prefix={<ArrowDownOutlined />}
                            suffix="%"
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic
                            title="Idle"
                            value={9.3}
                            precision={2}
                            valueStyle={{ color: "#cf1322" }}
                            prefix={<ArrowDownOutlined />}
                            suffix="%"
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic
                            title="Idle"
                            value={9.3}
                            precision={2}
                            valueStyle={{ color: "#cf1322" }}
                            prefix={<ArrowDownOutlined />}
                            suffix="%"
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
                    span={12}
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
                <Col span={10} style={{ background: "#fff" }}>
                    <Flex style={{ width: "100%", height: "100%" }}>
                        <Tabs
                            defaultActiveKey="1"
                            items={items}
                            onChange={onChange}
                            style={{ width: "100%" }}
                        />
                    </Flex>
                </Col>
            </Row>
        </div>
    );
};

export default Home;
