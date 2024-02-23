import { Flex, Select, DatePicker, Space, Button, Spin } from "antd";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { ExportOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { getStatisticAsync } from "../../core/reducers/order";
const { RangePicker } = DatePicker;

type Props = {};

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const,
        },
        title: {
            display: true,
            text: "Biểu đồ doanh thu",
        },
    },
};

function OutcomeChart({}: Props) {
    const chartRef = useRef<any>();
    const [labels, setLabels] = useState<string[]>([]);
    const [type, setType] = useState<"month" | "day">("day");
    const [toDate, setToDate] = useState(new Date());
    const [fromDate, setFromDate] = useState(
        new Date().setDate(toDate.getDate() - 7)
    );
    const [fromMonth, setFromMonth] = useState(
        new Date(new Date().setMonth(new Date().getMonth() - 6))
            .toISOString()
            .slice(0, 7)
    );
    const [toMonth, setToMonth] = useState(
        new Date().toISOString().slice(0, 7)
    );
    const { statisticData, getStatisticDataStatus } = useAppSelector(
        (state) => state.order
    );
    const [isFirstRender, setIsFirstRender] = useState<boolean>(true);
    const dispatch = useAppDispatch();
    const handleGetStatistic = async (query: {
        from: string;
        to: string;
        type: string;
    }) => {
        await dispatch(getStatisticAsync(query));
    };
    useEffect(() => {
        if (type === "day") {
            const query = {
                from: new Date(fromDate).toDateString(),
                to: toDate.toDateString(),
                type: "day",
            };
            handleGetStatistic(query);
        }

        if (type === "month") {
            const query = {
                from: fromMonth,
                to: toMonth,
                type: "month",
            };
            handleGetStatistic(query);
        }
    }, [fromDate, toDate, fromMonth, toMonth, type]);
    useEffect(() => {
        if (getStatisticDataStatus === "success") {
            setIsFirstRender(false);
            setLabels(Object.keys(statisticData));
        }
    }, [statisticData]);
    const onChangeDate = (
        dates: null | (Dayjs | null)[],
        dateStrings: string[]
    ) => {
        if (dates && Array.isArray(dates) && dates.length === 2) {
            console.log("From: ", dates[0], ", to: ", dates[1]);
            console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
            if (dates[0]) setFromDate(dates[0].toDate().getTime());
            if (dates[1]) setToDate(dates[1].toDate());
        } else {
            console.log("Clear");
        }
    };
    const onChangeMonth = (
        dates: null | (Dayjs | null)[],
        dateStrings: string[]
    ) => {
        if (dates && Array.isArray(dates) && dates.length === 2) {
            console.log("From: ", dates[0], ", to: ", dates[1]);
            console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
            if (dates[0])
                setFromMonth(dates[0].toDate().toISOString().slice(0, 7));
            if (dates[1])
                setToMonth(dates[1].toDate().toISOString().slice(0, 7));
        } else {
            console.log("Clear");
        }
    };
    const onChangeType = (value: any) => {
        setType(value);
    };
    return (
        <Spin spinning={isFirstRender}>
            <Flex vertical style={{ width: "100%", height: "100%" }}>
                <Flex
                    style={{ width: "100%" }}
                    justify="space-between"
                    gap={20}
                >
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Thống kê theo"
                        options={[
                            {
                                value: "day",
                                label: "Ngày",
                            },
                            {
                                value: "month",
                                label: "Tháng",
                            },
                        ]}
                        onChange={onChangeType}
                        value={type}
                    />
                    {type === "day" && (
                        <RangePicker
                            size="small"
                            value={[dayjs(fromDate), dayjs(toDate)]}
                            onChange={onChangeDate}
                        />
                    )}
                    {type === "month" && (
                        <RangePicker
                            size="small"
                            picker="month"
                            value={[
                                dayjs(fromMonth, "YYYY-MM"),
                                dayjs(toMonth, "YYYY-MM"),
                            ]}
                            onChange={onChangeMonth}
                        />
                    )}
                    <Button
                        icon={<ExportOutlined />}
                        type="primary"
                        style={{ margin: 0, background: "#435585" }}
                        onClick={() => {
                            if (chartRef && chartRef.current) {
                                const canvas: HTMLCanvasElement | null =
                                    chartRef.current.canvas;
                                if (canvas) {
                                    const image = canvas.toDataURL("image/png");
                                    const a = document.createElement("a");
                                    a.href = image;
                                    a.download = "chart.png";
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                }
                            }
                        }}
                    >
                        Tải biểu đồ
                    </Button>
                </Flex>
                <Space style={{ height: "100%", width: "100%" }}>
                    {statisticData && (
                        <Bar
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: {
                                        position: "top" as const,
                                    },
                                    title: {
                                        display: true,
                                        text: `Biểu đồ doanh thu ${
                                            type === "day" ? "ngày" : "tháng"
                                        }`,
                                    },
                                },
                            }}
                            data={{
                                labels,
                                datasets: [
                                    {
                                        label: `Doanh thu theo ${
                                            type === "day" ? "ngày" : "tháng"
                                        }`,
                                        data: Object.keys(statisticData).map(
                                            (val) =>
                                                statisticData[`${val}`].total
                                        ),
                                        backgroundColor: "#818FB4",
                                    },
                                ],
                            }}
                            style={{ width: "100%", height: "100%" }}
                            ref={chartRef}
                            id="chart"
                        />
                    )}
                </Space>
            </Flex>
        </Spin>
    );
}

export default OutcomeChart;
