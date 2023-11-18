import React, { useState } from "react";
import { IAddress } from "../../../utils/model";
import { Button, Divider, Flex, Modal } from "antd";
import { Typography } from "antd";
const { Text } = Typography;

type Props = {
    address: IAddress;
};

const AddressCard = ({ address }: Props) => {
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
    const [detail, location] = address.address.split("/");
    const handleCancelDelete = () => {
        setIsOpenDeleteModal(false);
    };
    const handleOpenDelete = () => {
        setIsOpenDeleteModal(true);
    };
    return (
        <>
            <Flex justify="space-between">
                <Flex vertical>
                    <Text type="secondary">{detail}</Text>
                    <Text type="secondary">{location}</Text>
                    {address.isMainAddress ? (
                        <Button
                            type="dashed"
                            disabled
                            size="small"
                            style={{
                                borderColor: "orange",
                                color: "orange",
                                maxWidth: "100px",
                            }}
                            block={false}
                        >
                            Mặc định
                        </Button>
                    ) : null}
                </Flex>
                <Flex vertical>
                    <Flex justify="space-between">
                        <Text>Cập nhật</Text>
                        <Text
                            onClick={handleOpenDelete}
                            style={{ cursor: "pointer", fontWeight: 500 }}
                        >
                            Xóa
                        </Text>
                    </Flex>
                    <Button size="small">Đặt làm mặc định</Button>
                </Flex>
            </Flex>
            <Divider />
            <Modal
                title="Bạn muốn xóa địa chỉ này?"
                open={isOpenDeleteModal}
                onCancel={handleCancelDelete}
                okText="Đồng ý"
                cancelText="Quay lại"
            ></Modal>
        </>
    );
};

export default AddressCard;
