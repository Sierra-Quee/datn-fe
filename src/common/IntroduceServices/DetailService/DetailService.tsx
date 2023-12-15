import "./DetailService.scss";
import { IReview, IService, ITypeService } from "../../../utils/model";
import {
    Avatar,
    Button,
    Collapse,
    CollapseProps,
    Flex,
    Image,
    Input,
    Layout,
    List,
    Pagination,
    Rate,
    Space,
    Table,
    theme,
    Typography,
    message,
    Spin,
} from "antd";
import { CaretRightOutlined, SendOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailServiceAsync } from "../../../core/reducers/service";
import {
    createReviewAsync,
    getAllReviewAsync,
} from "../../../core/reducers/review";
import Review from "../../Review/Review";
const { Title, Text } = Typography;

type Props = {};
const data = [
    "Đội ngũ kỹ thuật tay nghề cao",
    "Giá cả cạnh tranh",
    "Quy trình chuyên nghiệp, nhanh chóng",
];
const dataSource = [
    {
        key: "1",
        index: "1",
        name: "Thay ống đồng",
        price: 100000,
    },
    {
        key: "2",
        index: "2",
        name: "Thay van xả",
        price: 100000,
    },
    {
        key: "3",
        index: "3",
        name: "Thay tụ",
        price: 150000,
    },
    {
        key: "4",
        index: "4",
        name: "Thay cửa lạnh",
        price: 180000,
    },
];

const columns = [
    {
        title: "STT",
        dataIndex: "index",
        key: "index",
    },
    {
        title: "Sửa chữa",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Giá (đồng)",
        dataIndex: "price",
        key: "price",
    },
];
const items: CollapseProps["items"] = [
    {
        key: "1",
        label: "Xem chi tiết",
        children: (
            <Flex vertical>
                <Flex>
                    <Rate disabled defaultValue={5} />
                    <Text>5 đánh giá</Text>
                </Flex>
                <Flex>
                    <Rate disabled defaultValue={4} />
                    <Text>5 đánh giá</Text>
                </Flex>
                <Flex>
                    <Rate disabled defaultValue={3} />
                    <Text>5 đánh giá</Text>
                </Flex>
                <Flex>
                    <Rate disabled defaultValue={2} />
                    <Text>5 đánh giá</Text>
                </Flex>
                <Flex>
                    <Rate disabled defaultValue={1} />
                    <Text>5 đánh giá</Text>
                </Flex>
            </Flex>
        ),
    },
];

const rateDesc = ["Rất tệ", "Tệ", "Khá", "Tốt", "Rất tốt"];

const DetailService = (props: Props) => {
    const [messageApi, contextHolder] = message.useMessage();
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const dispatch = useAppDispatch();
    const { account } = useAppSelector((state) => state.authentication);
    const { serviceId } = useParams();
    const { service } = useAppSelector((state) => state.service);
    const { reviewList, isLoadingReviewList } = useAppSelector(
        (state) => state.review
    );
    const [rate, setRate] = useState<number>(1);
    const [reviewContent, setReviewContent] = useState<string>("");

    const handleGetDetailService = async (serviceId: number) => {
        await dispatch(getDetailServiceAsync(serviceId));
    };

    const handleGetReviewList = async (serviceId: number) => {
        await dispatch(getAllReviewAsync(serviceId));
    };

    const handleSubmitReview = async () => {
        if (serviceId && account) {
            const review: IReview = {
                rate: rate,
                content: reviewContent,
                userId: account.userId,
                serviceId: parseInt(serviceId),
            };
            console.log({ review });
            try {
                await dispatch(createReviewAsync(review));
                dispatch(getAllReviewAsync(parseInt(serviceId)));
                message.success("Gửi đánh giá thành công");
                setRate(1);
                setReviewContent("");
            } catch (error) {
                message.error("Gửi đánh giá không thành công");
            }
        }
    };

    useEffect(() => {
        console.log({ rate });
    }, [rate]);
    useEffect(() => {
        if (serviceId) {
            handleGetDetailService(parseInt(serviceId));
            handleGetReviewList(parseInt(serviceId));
        }
    }, [serviceId]);

    console.log({ reviewList });

    return (
        <>
            {" "}
            {contextHolder}
            <Layout
                style={{
                    padding: "24px 0",
                    width: "80%",
                    margin: "auto",
                    borderRadius: "5px",
                    background: "#efefef",
                }}
                className="detailService"
            >
                <Spin spinning={isLoadingReviewList}>
                    <Flex
                        className="detailService-mainInfo"
                        vertical
                        style={{ background: "#fff" }}
                    >
                        <Flex className="detailService-top" gap={20}>
                            <Space className="detailService-image">
                                <Image
                                    src={service.detailService.image}
                                    width={""}
                                />
                            </Space>
                            <Flex vertical justify="space-between">
                                <Flex vertical gap={10}>
                                    <Title level={2}>
                                        {service.detailService.name}
                                    </Title>
                                    <Title level={3}>
                                        Giá từ {service.detailService.price}
                                    </Title>
                                    <Space>
                                        <Text>Đánh giá:</Text>
                                        <Rate disabled defaultValue={3} />
                                    </Space>
                                    <List
                                        bordered
                                        dataSource={data}
                                        renderItem={(item) => (
                                            <List.Item>
                                                <Typography.Text mark>
                                                    <CaretRightOutlined />
                                                </Typography.Text>{" "}
                                                {item}
                                            </List.Item>
                                        )}
                                    />
                                </Flex>
                                <Flex gap={10}>
                                    <Button shape="round">Chọn</Button>
                                    <Button shape="round" type="primary">
                                        Đặt dịch vụ
                                    </Button>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Flex
                            vertical
                            className="detailService-content"
                            gap={10}
                        >
                            <Title level={3}>
                                Bảng giá {service.detailService.name}
                            </Title>
                            <Table
                                dataSource={dataSource}
                                columns={columns}
                                bordered
                                pagination={false}
                                size="small"
                            />
                            <Text strong>
                                * Đơn giá chỉ gồm phí sửa chữa, không bao gồm
                                phí linh kiện sửa chữa. Khách hàng có thể chọn
                                tự mua linh kiện cần thay thế, lắp đặt hoặc yêu
                                cầu nhân viên sửa chữa mua, giá linh kiện sẽ
                                được tính vào hóa đơn cuối cùng.
                            </Text>
                        </Flex>
                        <Flex
                            vertical
                            className="detailService-reviews"
                            gap={20}
                        >
                            <Flex align="start" gap={20}>
                                <Title level={3}>Đánh giá</Title>

                                <Flex vertical style={{ padding: "5px 0" }}>
                                    <Space>
                                        <Rate disabled defaultValue={3} />
                                        <Text>12 đánh giá</Text>
                                    </Space>
                                    <Space style={{ paddingLeft: 0 }}>
                                        <Collapse items={items} ghost />
                                    </Space>
                                </Flex>
                            </Flex>
                            <Flex vertical gap={20}>
                                {account && (
                                    <Flex
                                        gap={10}
                                        style={{ padding: "10px" }}
                                        align="start"
                                    >
                                        <Space>
                                            {account.imageUrl ? (
                                                <Avatar
                                                    src={account.imageUrl}
                                                />
                                            ) : (
                                                <Avatar
                                                    style={{
                                                        backgroundColor:
                                                            "#f56a00",
                                                    }}
                                                    size="large"
                                                >
                                                    <span
                                                        style={{
                                                            fontSize: "20px",
                                                            fontWeight: "600",
                                                        }}
                                                    >
                                                        {(
                                                            account
                                                                ?.accountName[0] ||
                                                            ""
                                                        ).toUpperCase()}
                                                    </span>
                                                </Avatar>
                                            )}
                                        </Space>
                                        <Flex
                                            vertical
                                            gap={10}
                                            style={{ width: "100%" }}
                                        >
                                            <Space>
                                                <Rate
                                                    defaultValue={1}
                                                    value={rate}
                                                    onChange={setRate}
                                                    tooltips={rateDesc}
                                                />
                                            </Space>
                                            <Input
                                                addonAfter={
                                                    <SendOutlined
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                    />
                                                }
                                                style={{ width: "100%" }}
                                                value={reviewContent}
                                                onChange={(e) =>
                                                    setReviewContent(
                                                        e.target.value
                                                    )
                                                }
                                                onPressEnter={
                                                    handleSubmitReview
                                                }
                                            />
                                        </Flex>
                                    </Flex>
                                )}

                                {reviewList?.map((review) => (
                                    <Review
                                        review={review}
                                        key={review.reviewId}
                                    />
                                ))}
                            </Flex>
                            <Flex justify="flex-end">
                                <Pagination defaultCurrent={1} total={50} />
                            </Flex>
                        </Flex>
                    </Flex>
                </Spin>
            </Layout>
        </>
    );
};

export default DetailService;
