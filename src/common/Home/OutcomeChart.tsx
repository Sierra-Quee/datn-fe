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
            text: "Chart.js Bar Chart",
        },
    },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];
export const data = {
    labels,
    datasets: [
        {
            label: "Dataset 1",
            data: labels.map(() => faker.number.int()),
            backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
            label: "Dataset 2",
            data: labels.map(() => faker.number.int()),
            backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
    ],
};
function OutcomeChart({}: Props) {
    return (
        <Flex vertical style={{ width: "100%", height: "100%" }}>
            <Flex style={{ width: "100%" }} justify="space-between" gap={20}>
                <Select
                    size="small"
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
                    style={{ margin: 0 }}
                    size="small"
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
