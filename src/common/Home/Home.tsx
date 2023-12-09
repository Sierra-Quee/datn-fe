import "./Home.scss";

import {
    GlobalOutlined,
    UngroupOutlined,
    UsergroupAddOutlined,
    UsergroupDeleteOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";

import { DatePicker, DatePickerProps, Select, Typography } from "antd";
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

    return (
        <div className="home">
            <Title level={3}>ISmart</Title>
            <div className="home-statistic">
                <div className="home-statistic-item home-statistic-item-skill">
                    <span className="home-statistic-item-title">
                        <span>
                            <UngroupOutlined /> Số loại dịch vụ
                        </span>
                        <div>{listSkill.length}</div>
                    </span>
                </div>
                <div className="home-statistic-item home-statistic-item-service">
                    <span className="home-statistic-item-title">
                        <span>
                            <GlobalOutlined /> Số dịch vụ
                        </span>
                        <div>{listService.length}</div>
                    </span>
                </div>
                <div className="home-statistic-item home-statistic-item-customer">
                    <span className="home-statistic-item-title">
                        <span>
                            <UsergroupAddOutlined /> Số khách hàng
                        </span>
                        <div>{customerList.length}</div>
                    </span>
                </div>
                <div className="home-statistic-item home-statistic-item-employee">
                    <span className="home-statistic-item-title">
                        <span>
                            <UsergroupDeleteOutlined /> Số thợ
                        </span>
                        <div>{repairList.length}</div>
                    </span>
                </div>
            </div>
            <div className="home-chart">
                <Title level={3}>Thống kê hàng tháng</Title>
                <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <Select
                        defaultValue="Chọn biểu đồ"
                        style={{ width: 200 }}
                        onChange={handleChange}
                        options={optionsChart}
                    />
                    <RangePicker
                        defaultValue={[
                            dayjs("2015/01/01", dateFormat),
                            dayjs("2015/01/01", dateFormat),
                        ]}
                        format={dateFormat}
                        style={{ width: 300 }}
                        onChange={onChangeRangeDate}
                    />
                </div>
                <div className="home-line-chart">
                    <LineChartHome title={titleChart} date={timeRange} />
                </div>
            </div>
        </div>
    );
};

export default Home;
