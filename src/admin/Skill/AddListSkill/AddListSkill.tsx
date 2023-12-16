import { Button, Modal, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
    clearSkill,
    createMultiSkillAsync,
} from "../../../core/reducers/skill";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { ISkill } from "../../../utils/model";

interface IAddListUserProps {
    handleGetAllSkill: () => void;
    listAdd: any[];
    close: () => void;
    fileName: string;
    skillId?: string | number;
}

const AddListSkills = ({
    handleGetAllSkill,
    listAdd,
    close,
    fileName,
    skillId,
}: IAddListUserProps) => {
    const dispatch = useAppDispatch();
    const { updateSkill } = useAppSelector((state) => state.skill);

    useEffect(() => {
        if (updateSkill?.createMulSkillStatus === "success") {
            toast.success("Thêm thông tin thành công");
            dispatch(clearSkill());
            handleGetAllSkill();
            close();
        }
    }, [updateSkill?.createMulSkillStatus, dispatch]);

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
            createMultiSkillAsync(
                listAdd.map((item) => {
                    return {
                        ...item,
                        name: String(item.name),
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
                    {buttonCancel()}
                    {buttonAdd()}
                </div>
            </div>
        </Modal>
    );
};

export default AddListSkills;
