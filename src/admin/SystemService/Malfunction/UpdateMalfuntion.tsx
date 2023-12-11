import { Button, Col, Form, Input, Modal, Row } from "antd";
import { useEffect, useState } from "react";
import { IMalfunction } from "../../../utils/model";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { toast } from "react-toastify";
import {
    clearMalfunction,
    createMalfunctionAsync,
} from "../../../core/reducers/malfunction";
import { log } from "console";

interface IUpdateMalfunctionProps {
    isOpen: boolean;
    close: () => void;
    malfunctionUpdate?: IMalfunction | null | undefined;
    isCreate: boolean;
    handleGetAllMalfuntionAsync: () => void;
    serviceId: string | number;
}
const UpdateMalfunction = (props: IUpdateMalfunctionProps) => {
    const {
        isOpen,
        close,
        malfunctionUpdate,
        isCreate,
        handleGetAllMalfuntionAsync,
        serviceId,
    } = props;
    const dispatch = useAppDispatch();
    const [malfunctionInfo, setMalfunctionInfo] = useState<any>();
    const { updateMalfunctionStatus } = useAppSelector(
        (state) => state.malfunction
    );
    const updateMalfunctionModalAsync = async (value: any) => {
        setMalfunctionInfo({ ...value });
        if (isCreate) {
            await dispatch(
                createMalfunctionAsync({
                    ...value,
                    serviceId: serviceId,
                })
            );
        }
    };
    const handleUpdate = async () => {
        //  else
        //     await dispatch(updateMalfunctionAsync({ ...malfunctionInfo }));
    };
    const buttonUpdate = () => {
        return (
            <Button
                key={2}
                type="primary"
                htmlType="submit"
                onClick={handleUpdate}
            >
                {isCreate ? "Thêm danh mục" : "Cập nhật"}
            </Button>
        );
    };

    const buttonCancel = () => {
        return (
            <Button key={1} onClick={close}>
                Hủy bỏ
            </Button>
        );
    };
    useEffect(() => {
        if (updateMalfunctionStatus === "success") {
            toast.success(
                isCreate
                    ? "Thêm danh mục thành công"
                    : "Cập nhật thông tin danh mục thành công"
            );
            dispatch(clearMalfunction());
            handleGetAllMalfuntionAsync();
            close();
        }
    }, [updateMalfunctionStatus, dispatch, isCreate]);

    return (
        <Modal
            maskClosable={false}
            closeIcon={false}
            open={isOpen}
            width={800}
            onCancel={close}
            title={
                isCreate
                    ? "Thêm danh mục "
                    : "Cập nhật thông tin chi tiết danh mục"
            }
            footer={[]}
            className="update-service-modal"
        >
            <Form layout="vertical" onFinish={updateMalfunctionModalAsync}>
                <Row gutter={20} style={{ marginTop: 20 }}>
                    <Col span={12}>
                        <Form.Item
                            label="Tên danh mục"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập tên danh mục",
                                },
                            ]}
                            initialValue={malfunctionUpdate?.name}
                        >
                            <Input placeholder="Nhập tên danh mục" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Đơn giá"
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: "Nhập giá danh mục sản phẩm",
                                },
                            ]}
                            initialValue={malfunctionUpdate?.price}
                        >
                            <Input placeholder="Nhập giá danh mục sản phẩm" />
                        </Form.Item>
                    </Col>
                </Row>
                <div className="button-wrap">
                    {buttonCancel()}
                    {buttonUpdate()}
                </div>
            </Form>
        </Modal>
    );
};
export default UpdateMalfunction;
