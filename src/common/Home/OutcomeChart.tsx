import { Flex, Select, DatePicker, Space, Button } from "antd";
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
import { faker } from "@faker-js/faker";
import { ExportOutlined } from "@ant-design/icons";
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

const labels = ["08/02", "09/02", "10/02", "11/02", "12/02", "13/02", "14/02"];
export const data = {
    labels,
    datasets: [
        {
            label: "Dataset 1",
            data: labels.map(() => faker.number.int(100)),
            backgroundColor: "#818FB4",
        },
        // {
        //     label: "Dataset 2",
        //     data: labels.map(() => faker.number.int(100)),
        //     backgroundColor: "#F5E8C7",
        // },
    ],
};
function OutcomeChart({}: Props) {
    return (
        <Flex vertical style={{ width: "100%", height: "100%" }}>
            <Flex style={{ width: "100%" }} justify="space-between" gap={20}>
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Search to Select"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        (option?.label ?? "").includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? "")
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={[
                        {
                            value: "1",
                            label: "Not Identified",
                        },
                        {
                            value: "2",
                            label: "Closed",
                        },
                        {
                            value: "3",
                            label: "Communicated",
                        },
                        {
                            value: "4",
                            label: "Identified",
                        },
                        {
                            value: "5",
                            label: "Resolved",
                        },
                        {
                            value: "6",
                            label: "Cancelled",
                        },
                    ]}
                />
                <RangePicker size="small" />
                <Button
                    icon={<ExportOutlined />}
                    type="primary"
                    style={{ margin: 0, background: "#435585" }}
                >
                    Tải biểu đồ
                </Button>
            </Flex>
            <Space style={{ height: "100%", width: "100%" }}>
                <Bar
                    options={options}
                    data={data}
                    style={{ width: "100%", height: "100%" }}
                />
            </Space>
        </Flex>
    );
}

export default OutcomeChart;
