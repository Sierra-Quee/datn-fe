import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { getMonthsBetweenDates } from "../../utils/functions/utils";

interface ILineChartProps {
    title: string;
    date: [string, string] | string;
}
const LineChartHome = (props: ILineChartProps) => {
    const { title, date } = props;
    const renderTitleChart = (title: string) => {
        if (title === "Skill") return "Biểu đồ thống kê loại dịch vụ Ismart";
        if (title === "Service") return "Biểu đồ thống kê dịch vụ Ismart";
        if (title === "Customer") return "Biểu đồ thống kê khách hàng Ismart";
        if (title === "Repair") return "Biểu đồ thống kê thợ Ismart";
        if (title === "Revenue")
            return "Biểu đồ thống kê doanh thu cửa hàng Ismart";
    };
    const renderColorChart = (title: string) => {
        if (title === "Skill") return "#76bb68";
        if (title === "Service") return "#f29388";
        if (title === "Customer") return "#5aa8f2";
        if (title === "Repair") return "#b6977d";
        if (title === "Revenue")
            return "Biểu đồ thống kê doanh thu cửa hàng Ismart";
    };

    return (
        <div
            style={{
                height: "250px",
                marginTop: "50px",
                rowGap: "20px",
            }}
        >
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    width={500}
                    height={400}
                    data={getMonthsBetweenDates(date[0], date[1])?.map(
                        (item: any) => {
                            return {
                                name: item,
                                uv: 2390,
                            };
                        }
                    )}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 10,
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
                        fill={renderColorChart(title)}
                    />
                </AreaChart>
            </ResponsiveContainer>
            <span
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {renderTitleChart(title)}
            </span>
        </div>
    );
};

export default LineChartHome;
