import "./AddListUser.scss";

import { Button, Modal, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect } from "react";
import { toast } from "react-toastify";

import { Role } from "../../../core/auth/roles";
import {
    clearUpdateListUser,
    createMultiUserAsync,
} from "../../../core/reducers/users";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { IUser } from "../../../utils/model";

interface IAddListUserProps {
    handleGetAllUser: () => void;
    listUserAdd: IUser[];
    close: () => void;
    roleAdd?: Role;
    fileName: string;
}

const AddListUser = ({
    handleGetAllUser,
    listUserAdd,
    close,
    roleAdd,
    fileName,
}: IAddListUserProps) => {
    const dispatch = useAppDispatch();

    const { updateListUserStatus } = useAppSelector(
        (state) => state.users.updateListUser
    );

    useEffect(() => {
        if (updateListUserStatus === "success") {
            toast.success("Thêm thông tin thành công");
            dispatch(clearUpdateListUser());
            handleGetAllUser();
            close();
        }
    }, [updateListUserStatus, dispatch]);

    const buttonCancel = () => {
        return (
            <Button key={1} onClick={close}>
                Hủy bỏ
            </Button>
        );
    };

    const addListUser = async () => {
        await dispatch(
            createMultiUserAsync(
                listUserAdd.map((item) => {
                    return {
                        ...item,
                        gender: item.gender === "Nam" ? true : false,
                    };
                })
            )
        );
    };

    const buttonAdd = () => {
        return (
            <Button key={2} type="primary" onClick={addListUser}>
                Thêm mới
            </Button>
        );
    };

    const columns: ColumnsType<IUser> = [
        { title: "Tên", dataIndex: "firstName", key: "firstName" },
        { title: "Họ", dataIndex: "lastName", key: "lastName" },
        {
            title: "Ngày tháng năm sinh",
            dataIndex: "dob",
            key: "dob",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Giới tính",
            dataIndex: "gender",
            key: "gender",
        },
    ];

    return (
        <Modal
            maskClosable={false}
            closeIcon={false}
            open={!!listUserAdd}
            width={1000}
            onCancel={close}
            title={fileName}
            footer={[]}
            className="update-list-user-modal"
        >
            <div className="modal-add-list-user-wrap">
                <Table
                    columns={columns}
                    dataSource={listUserAdd.map((item, index) => {
                        return {
                            key: index,
                            ...item,
                        };
                    })}
                    pagination={{ pageSize: 7 }}
                ></Table>
                <div className="button-wrap">
                    {buttonCancel()}
                    {buttonAdd()}
                </div>
            </div>
        </Modal>
    );
};

export default AddListUser;
