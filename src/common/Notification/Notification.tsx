import { Button, Flex, Typography } from "antd";
import React from "react";
import { INotification } from "../../utils/model";
import fetchHandler from "../../api/axios";
import { toast } from "react-toastify";
const { Title, Text, Paragraph } = Typography;
type Props = {};
const notification: INotification = {
    notificationId: "10",
    content:
        "Đơn hàng đã chuyển sang trạng thái thanh toán Đơn hàng đã chuyển sang trạng thái thanh toán Đơn hàng đã chuyển sang trạng thái thanh toán Đơn hàng đã chuyển sang trạng thái thanh toán Đơn hàng đã chuyển sang trạng thái thanh toán Đơn hàng đã chuyển sang trạng thái thanh toán Đơn hàng đã chuyển sang trạng thái thanh toán Đơn hàng đã chuyển sang trạng thái thanh toán",
    title: "Cập nhật trạng thái đơn đặt dịch vụ 1234455",
    userId: "USER",
    createdAt: "09/01/2024",
    isSeen: false,
};
const Notification = (props: Props) => {
    const handleClick = async () => {
        try {
            await fetchHandler("/transaction/payment");
            toast.success("ok");
        } catch (error) {
            toast.error("Lỗi");
            throw error;
        }
    };
    return (
        <Flex
            style={{ height: "100%", width: "100%", padding: "20px" }}
            vertical
        >
            <Flex
                vertical
                gap={10}
                style={{ padding: "20px", height: "88%", overflowY: "auto" }}
            >
                <Flex
                    style={{
                        width: "100%",
                        padding: "10px",
                        border: "solid 1px #818fb4",
                        borderRadius: "10px",
                        background: !notification.isSeen
                            ? "#f5e8c7"
                            : undefined,
                    }}
                    gap={10}
                    vertical
                >
                    <Flex
                        justify="space-between"
                        style={{
                            width: "100%",
                        }}
                    >
                        <Title level={5} style={{ margin: 0 }}>
                            {notification.title}
                        </Title>
                        <Text>{notification.createdAt}</Text>
                    </Flex>
                    <Paragraph style={{ margin: 0, padding: 0 }}>
                        {notification.content.slice(0, 100)}
                        {notification.content.length <= 200 ? "" : "..."}
                    </Paragraph>
                </Flex>
                <Flex
                    style={{
                        width: "100%",
                        padding: "10px",
                        border: "solid 1px #818fb4",
                        borderRadius: "10px",
                        background: !notification.isSeen
                            ? "#f5e8c7"
                            : undefined,
                    }}
                    gap={10}
                    vertical
                >
                    <Flex
                        justify="space-between"
                        style={{
                            width: "100%",
                        }}
                    >
                        <Title level={5} style={{ margin: 0 }}>
                            {notification.title}
                        </Title>
                        <Text>{notification.createdAt}</Text>
                    </Flex>
                    <Paragraph style={{ margin: 0, padding: 0 }}>
                        {notification.content.slice(0, 100)}
                        {notification.content.length <= 200 ? "" : "..."}
                    </Paragraph>
                </Flex>
                <Flex
                    style={{
                        width: "100%",
                        padding: "10px",
                        border: "solid 1px #818fb4",
                        borderRadius: "10px",
                        background: !notification.isSeen
                            ? "#f5e8c7"
                            : undefined,
                    }}
                    gap={10}
                    vertical
                >
                    <Flex
                        justify="space-between"
                        style={{
                            width: "100%",
                        }}
                    >
                        <Title level={5} style={{ margin: 0 }}>
                            {notification.title}
                        </Title>
                        <Text>{notification.createdAt}</Text>
                    </Flex>
                    <Paragraph style={{ margin: 0, padding: 0 }}>
                        {notification.content.slice(0, 100)}
                        {notification.content.length <= 200 ? "" : "..."}
                    </Paragraph>
                </Flex>
                <Flex
                    style={{
                        width: "100%",
                        padding: "10px",
                        border: "solid 1px #818fb4",
                        borderRadius: "10px",
                        background: !notification.isSeen
                            ? "#f5e8c7"
                            : undefined,
                    }}
                    gap={10}
                    vertical
                >
                    <Flex
                        justify="space-between"
                        style={{
                            width: "100%",
                        }}
                    >
                        <Title level={5} style={{ margin: 0 }}>
                            {notification.title}
                        </Title>
                        <Text>{notification.createdAt}</Text>
                    </Flex>
                    <Paragraph style={{ margin: 0, padding: 0 }}>
                        {notification.content.slice(0, 100)}
                        {notification.content.length <= 200 ? "" : "..."}
                    </Paragraph>
                </Flex>
                <Flex
                    style={{
                        width: "100%",
                        padding: "10px",
                        border: "solid 1px #818fb4",
                        borderRadius: "10px",
                        background: !notification.isSeen
                            ? "#f5e8c7"
                            : undefined,
                    }}
                    gap={10}
                    vertical
                >
                    <Flex
                        justify="space-between"
                        style={{
                            width: "100%",
                        }}
                    >
                        <Title level={5} style={{ margin: 0 }}>
                            {notification.title}
                        </Title>
                        <Text>{notification.createdAt}</Text>
                    </Flex>
                    <Paragraph style={{ margin: 0, padding: 0 }}>
                        {notification.content.slice(0, 100)}
                        {notification.content.length <= 200 ? "" : "..."}
                    </Paragraph>
                </Flex>
                <Flex
                    style={{
                        width: "100%",
                        padding: "10px",
                        border: "solid 1px #818fb4",
                        borderRadius: "10px",
                        background: !notification.isSeen
                            ? "#f5e8c7"
                            : undefined,
                    }}
                    gap={10}
                    vertical
                >
                    <Flex
                        justify="space-between"
                        style={{
                            width: "100%",
                        }}
                    >
                        <Title level={5} style={{ margin: 0 }}>
                            {notification.title}
                        </Title>
                        <Text>{notification.createdAt}</Text>
                    </Flex>
                    <Paragraph style={{ margin: 0, padding: 0 }}>
                        {notification.content.slice(0, 100)}
                        {notification.content.length <= 200 ? "" : "..."}
                    </Paragraph>
                </Flex>
                <Flex
                    style={{
                        width: "100%",
                        padding: "10px",
                        border: "solid 1px #818fb4",
                        borderRadius: "10px",
                        background: !notification.isSeen
                            ? "#f5e8c7"
                            : undefined,
                    }}
                    gap={10}
                    vertical
                >
                    <Flex
                        justify="space-between"
                        style={{
                            width: "100%",
                        }}
                    >
                        <Title level={5} style={{ margin: 0 }}>
                            {notification.title}
                        </Title>
                        <Text>{notification.createdAt}</Text>
                    </Flex>
                    <Paragraph style={{ margin: 0, padding: 0 }}>
                        {notification.content.slice(0, 100)}
                        {notification.content.length <= 200 ? "" : "..."}
                    </Paragraph>
                </Flex>
            </Flex>
            <Button onClick={handleClick}>Thanh toán</Button>
        </Flex>
    );
};

export default Notification;
