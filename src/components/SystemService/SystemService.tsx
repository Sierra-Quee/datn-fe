import { Button, Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";

interface DataType {
    key: string;
    name: string;
    services: string[];
}
const SystemService = () => {
    const data: DataType[] = [
        {
            key: "1",
            name: "Điện ",
            services: ["a", "b"],
        },
        {
            key: "2",
            name: "Điện tử",
            services: ["a", "b"],
        },
        {
            key: "3",
            name: "Điện lạnh",
            services: ["a", "b"],
        },
        {
            key: "4",
            name: "Điện nước",
            services: ["a", "b"],
        },
    ];

    const columnsServices: ColumnsType<DataType> = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: "Created By",
            dataIndex: "age",
            key: "age",
        },
        {
            title: "Services",
            key: "services",
            dataIndex: "services",
            render: (services: any[]) => (
                <>
                    {services.map((service: any) => {
                        let color = service.length > 5 ? "geekblue" : "green";
                        if (service === "loser") {
                            color = "volcano";
                        }
                        return (
                            <Tag color={color} key={service}>
                                {service.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (e: any, record: any) => (
                <Space size="middle">
                    <a>Edit</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Button type="primary" icon="">
                Create
            </Button>
            <Table columns={columnsServices} dataSource={data} />;
        </div>
    );
};
export default SystemService;
