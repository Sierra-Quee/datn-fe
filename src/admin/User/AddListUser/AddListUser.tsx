import { Button } from "antd";
import "./AddListUser.scss";

const AddListUser = () => {
    const buttonCancel = () => {
        return (
            <Button key={1} onClick={close}>
                Hủy bỏ
            </Button>
        );
    };

    const buttonAdd = () => {
        return (
            <Button key={2} type="primary" htmlType="submit">
                Thêm mới
            </Button>
        );
    };

    const close = () => {};

    return <div></div>;
};

export default AddListUser;
