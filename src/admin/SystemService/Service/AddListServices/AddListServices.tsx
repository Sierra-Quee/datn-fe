import { Button, Modal, Table } from "antd";

import { ColumnsType } from "antd/es/table";

import { useEffect } from "react";
import { toast } from "react-toastify";
import {
    clearListService,
    createMultiServiceAsync,
} from "../../../../core/reducers/service";
import { useAppDispatch, useAppSelector } from "../../../../redux/hook";
import { IService, ITypeService } from "../../../../utils/model";

interface IAddListUserProps {
    handleGetAllService: () => void;
    listAdd: IService[];
    close: () => void;
    fileName: string;
    skillId?: string | number;
}

const AddListServices = ({
    handleGetAllService,
    listAdd,
    close,
    fileName,
    skillId,
}: IAddListUserProps) => {
    const dispatch = useAppDispatch();
    const { updateService } = useAppSelector((state) => state.service);

    useEffect(() => {
        if (updateService?.createListServiceStatus === "success") {
            toast.success("Thêm thông tin thành công");
            dispatch(clearListService());
            handleGetAllService();
            close();
        }
    }, [updateService?.createListServiceStatus, dispatch]);

    const buttonCancel = () => {
        return (
            <Button key={1} onClick={close}>
                {" "}
                Hủy bỏ{" "}
            </Button>
        );
    };

    const addList = async () => {
        await dispatch(
            createMultiServiceAsync(
                listAdd.map((item) => {
                    return {
                        ...item,
                        name: String(item.name),
                        skillId: skillId as number,
                        type:
                            (item.type as string).toUpperCase() === "BẢO DƯỠNG"
                                ? ITypeService.MainTain
                                : ITypeService.Repair,
                        desc: String(item.desc),
                    };
                })
            )
        );
    };

    const buttonAdd = () => {
        return (
            <Button
                key={2}
                type="primary"
                onClick={addList}
                style={{ background: "#435585" }}
            >
                {" "}
                Thêm mới{" "}
            </Button>
        );
    };

    const columns: ColumnsType<IService> = [
        {
            title: "Mã",
            dataIndex: "serviceId",
            key: "serviceId",
            fixed: "left",
            width: 80,
        },
        {
            title: "Tên dịch vụ",
            dataIndex: "name",
            key: "name",
            fixed: "left",
            width: 150,
        },
        {
            title: "Loại dịch vụ",
            dataIndex: "type",
            key: "type",
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Đánh giá",
            dataIndex: "rate",
            key: "rate",
        },
        {
            title: "Mô tả",
            dataIndex: "desc",
            key: "desc",
            width: 200,
        },
        {
            title: "Danh mục chi tiết",
            key: "detailList",
            width: 100,
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
        {
            title: "",
            key: "action",
            dataIndex: "",
            fixed: "right",
            width: 100,
        },
    ];

    return (
        <Modal
            maskClosable={false}
            closeIcon={false}
            open={!!listAdd}
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
                    {" "}
                    {buttonCancel()}
                    {buttonAdd()}
                </div>{" "}
            </div>{" "}
        </Modal>
    );
};

export default AddListServices;
