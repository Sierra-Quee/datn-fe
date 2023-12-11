import { Button, Modal, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useAppDispatch } from "../../../redux/hook";
import { ISkill } from "../../../utils/model";

interface IAddListUserProps {
    handleGetAllUser: () => void;
    listAdd: ISkill[];
    close: () => void;
    fileName: string;
    skillId?: string | number;
}

const AddListSkills = ({
    handleGetAllUser,
    listAdd,
    close,
    fileName,
    skillId,
}: IAddListUserProps) => {
    const dispatch = useAppDispatch();

    // useEffect(() => {
    //     if (updateService?.createListServiceStatus === "success") {
    //         toast.success("Thêm thông tin thành công");
    //         dispatch(clearListService());
    //         handleGetAllUser();
    //         close();
    //     }
    // }, [updateService?.createListServiceStatus, dispatch]);

    const buttonCancel = () => {
        return (
            <Button key={1} onClick={close}>
                {" "}
                Hủy bỏ{" "}
            </Button>
        );
    };

    const addList = async () => {
        // await dispatch(
        //     createMultiServiceAsync(
        //         listAdd.map((item) => {
        //             return {
        //                 ...item,
        //                 name: String(item.name),
        //                 isActive:
        //             };
        //         })
        //     )
        // );
    };

    const buttonAdd = () => {
        return (
            <Button key={2} type="primary" onClick={addList}>
                {" "}
                Thêm mới{" "}
            </Button>
        );
    };

    const columns: ColumnsType<ISkill> = [
        {
            title: "Mã",
            dataIndex: "skillId",
            key: "skillId",
            fixed: "left",
            width: 80,
        },
        {
            title: "Tên loại dịch vụ",
            dataIndex: "name",
            key: "name",
            fixed: "left",
            width: 150,
        },
        {
            title: "Thời gian tạo",
            key: "createdAt",
            dataIndex: "createdAt",
        },
        {
            title: "Thời gian cập nhật",
            key: "updatedAt",
            dataIndex: "updatedAt",
        },
        {
            title: "Trạng thái",
            key: "isActive",
            dataIndex: "isActive",
            fixed: "right",
            width: 100,
        },
    ];

    return (
        <Modal
            maskClosable={false}
            closeIcon={false}
            // open={!!listAdd}
            width={1000}
            onCancel={close}
            title={fileName}
            footer={[]}
            className="update-list-user-modal"
        >
            {" "}
            <div className="modal-add-list-user-wrap">
                {" "}
                <Table
                    columns={columns}
                    dataSource={listAdd.map((item, index) => {
                        return {
                            key: index,
                            ...item,
                        };
                    })}
                    pagination={{
                        pageSize: 7,
                    }}
                ></Table>{" "}
                <div className="button-wrap">
                    {buttonCancel()}
                    {buttonAdd()}
                </div>
            </div>
        </Modal>
    );
};

export default AddListSkills;
