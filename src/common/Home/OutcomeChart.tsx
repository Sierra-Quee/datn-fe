import { Flex, Select, DatePicker, Space } from "antd";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
const { RangePicker } = DatePicker;

type Props = {};

const data = [
    {
        name: "Page A",
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: "Page B",
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: "Page C",
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: "Page D",
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: "Page E",
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: "Page F",
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: "Page G",
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

function OutcomeChart({}: Props) {
    return (
        <Flex vertical style={{ width: "100%", height: "100%" }}>
            <Flex style={{ width: "100%" }} justify="space-between" gap={50}>
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
                <RangePicker />
            </Flex>
            <Space style={{ height: "100%", width: "100%" }}>
                <ResponsiveContainer width="500px" height="400px">
                    <AreaChart
                        width={500}
                        height={400}
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey="uv"
                            stroke="#8884d8"
                            fill="#8884d8"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </Space>
        </Flex>
    );
}

export default OutcomeChart;
