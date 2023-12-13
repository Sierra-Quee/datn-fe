import { Button, Modal, Table } from "antd";

import { ColumnsType } from "antd/es/table";

import { useEffect } from "react";
import { toast } from "react-toastify";
import {
    clearListMalfunction,
    createMultiMalfunctionAsync,
} from "../../../../core/reducers/malfunction";
import { useAppDispatch, useAppSelector } from "../../../../redux/hook";
import { IService } from "../../../../utils/model";

interface IAddListUserProps {
    handleGetAllMalfunction: () => void;
    listAdd: any[];
    close: () => void;
    fileName: string;
    serviceId: string | number;
}

const AddListMalfunction = ({
    handleGetAllMalfunction,
    listAdd,
    close,
    fileName,
    serviceId,
}: IAddListUserProps) => {
    const dispatch = useAppDispatch();
    const { createMulMalfunctionStatus } = useAppSelector(
        (state) => state.malfunction
    );

    useEffect(() => {
        if (createMulMalfunctionStatus === "success") {
            toast.success("Thêm thông tin thành công");
            dispatch(clearListMalfunction());
            handleGetAllMalfunction();
            close();
        }
    }, [createMulMalfunctionStatus, dispatch]);

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
            createMultiMalfunctionAsync(
                listAdd.map((item) => {
                    return {
                        ...item,
                        name: String(item.name),
                        serviceId: +(serviceId as number),
                    };
                })
            )
        );
    };

    const buttonAdd = () => {
        return (
            <Button key={2} type="primary" onClick={addList}>
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
            title: "Giá",
            dataIndex: "price",
            key: "price",
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

export default AddListMalfunction;
