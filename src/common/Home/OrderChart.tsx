import { Flex, Select, DatePicker, Space, Button, Spin } from "antd";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { ExportOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { getStatisticAsync } from "../../core/reducers/order";
import { OrderStatus } from "../../utils/constants";
const { RangePicker } = DatePicker;
type Props = {};

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function OrderChart({}: Props) {
    const chartRef = useRef<any>();
    const [labels, setLabels] = useState<string[]>([]);
    const [toDate, setToDate] = useState(new Date());
    const [fromDate, setFromDate] = useState(
        new Date().setDate(toDate.getDate() - 7)
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
        const query = {
            from: new Date(fromDate).toDateString(),
            to: toDate.toDateString(),
            type: "day",
        };
        handleGetStatistic(query);
    }, [fromDate, toDate]);
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
    return (
        <Spin spinning={isFirstRender}>
            <Flex vertical style={{ width: "100%", height: "100%" }}>
                <Flex
                    style={{ width: "100%" }}
                    justify="space-between"
                    gap={20}
                >
                    <RangePicker
                        size="small"
                        value={[dayjs(fromDate), dayjs(toDate)]}
                        onChange={onChangeDate}
                    />
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
                        <Line
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: {
                                        position: "top" as const,
                                    },
                                    title: {
                                        display: true,
                                        text: `Biểu đồ thống kê trạng thái đơn theo ngày`,
                                    },
                                },
                            }}
                            data={{
                                labels,
                                datasets: [
                                    {
                                        label: `Chờ xử lý`,
                                        data: Object.keys(statisticData).map(
                                            (val) =>
                                                statisticData[`${val}`]
                                                    .ordersByStatus[
                                                    OrderStatus.PENDING
                                                ]
                                        ),
                                        backgroundColor: "#363062",
                                        borderColor: "#363062",
                                    },
                                    {
                                        label: `Chờ xử lý`,
                                        data: Object.keys(statisticData).map(
                                            (val) =>
                                                statisticData[`${val}`]
                                                    .ordersByStatus[
                                                    OrderStatus.ACCEPTED
                                                ]
                                        ),
                                        backgroundColor: "#435585",
                                        borderColor: "#435585",
                                    },
                                    {
                                        label: `Chờ xử lý`,
                                        data: Object.keys(statisticData).map(
                                            (val) =>
                                                statisticData[`${val}`]
                                                    .ordersByStatus[
                                                    OrderStatus.CHECKEDIN
                                                ]
                                        ),
                                        backgroundColor: "#818FB4",
                                        borderColor: "#818FB4",
                                    },
                                    {
                                        label: `Chờ xử lý`,
                                        data: Object.keys(statisticData).map(
                                            (val) =>
                                                statisticData[`${val}`]
                                                    .ordersByStatus[
                                                    OrderStatus.COMPLETE
                                                ]
                                        ),
                                        borderColor: "#F5E8C7",
                                    },
                                    {
                                        label: `Chờ xử lý`,
                                        data: Object.keys(statisticData).map(
                                            (val) =>
                                                statisticData[`${val}`]
                                                    .ordersByStatus[
                                                    OrderStatus.REJECTED
                                                ]
                                        ),
                                        borderColor: "rgba(153, 102, 255, 1)",
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

export default OrderChart;
