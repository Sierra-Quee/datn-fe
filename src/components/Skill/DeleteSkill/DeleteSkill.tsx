import { Button, Modal } from "antd";
import { ISkill } from "../../../utils/model";

interface IDeleteSkillProps {
    isOpen: boolean;
    close: () => void;
    skill: ISkill | null;
}

const DeleteSkill = ({ isOpen, close, skill }: IDeleteSkillProps) => {
    const buttonConfirm = () => {
        return (
            <Button key={1} type="primary">
                Xác nhận
            </Button>
        );
    };

    return (
        <Modal
            maskClosable={false}
            open={isOpen}
            onCancel={close}
            footer={[buttonConfirm()]}
            title="Xóa loại dịch vụ"
        >
            <span>
                Bạn có chắc chắn xóa loại dịch vụ "{skill?.name}" không?
            </span>
        </Modal>
    );
};

export default DeleteSkill;
