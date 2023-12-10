import Table, { ColumnsType } from "antd/es/table";
import { IMalfunction } from "../../../utils/model";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";

const Malfunction = () => {
    const columns: ColumnsType<IMalfunction> = [
        {
            title: "Mã",
            dataIndex: "malFuncId",
            key: "malFuncId",
        },
        {
            title: "Sản phẩm",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Giá",
            key: "price",
            dataIndex: "price",
        },
    ];

    return (
        <div className="skill">
            <h2>Danh mục chi tiết</h2>
            <div className="header-table-skill">
                <Button
                    type="primary"
                    // onClick={() => setIsOpenModal(!isOpenModal)}
                >
                    Thêm danh mục
                </Button>
                <Input
                    addonBefore={
                        <SearchOutlined style={{ fontSize: "20px" }} />
                    }
                    placeholder="Nhập tên danh mục sản phẩm cần tìm kiếm"
                    // onChange={handleFindSkill}
                />
            </div>
            <Table
                columns={columns}
                // dataSource={malfunctionList}
                pagination={{ pageSize: 7 }}
            />
        </div>
    );
};

export default Malfunction;
