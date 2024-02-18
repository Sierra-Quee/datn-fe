import "./DetailService.scss";
import {
    ICartItem,
    IMalfunction,
    IReview,
    IService,
    ITypeService,
} from "../../../utils/model";
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
import { useNavigate, useParams } from "react-router-dom";
import {
    getDetailServiceAsync,
    getServiceBySkillIdAsync,
} from "../../../core/reducers/service";
import {
    createReviewAsync,
    getAllReviewAsync,
} from "../../../core/reducers/review";
import Review from "../../Review/Review";
import { formatCurrency } from "../../../utils/functions/formation";
import {
    createCartItemAsync,
    getCartAsync,
    setItemsForCheckout,
} from "../../../core/reducers/cart";
import ServiceSubCard from "../ServiceSubCard/ServiceSubCard";
const { Title, Text } = Typography;

type Props = {};
const data = [
    "Đội ngũ kỹ thuật tay nghề cao",
    "Giá cả cạnh tranh",
    "Quy trình chuyên nghiệp, nhanh chóng",
];
interface RenderMalfunction extends IMalfunction {
    index: number;
}
const columns = [
    {
        title: "STT",
        dataIndex: "index",
        key: "index",
        render: (_: any, record: RenderMalfunction) => (
            <span>{record.index + 1}</span>
        ),
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
        render: (_: any, record: RenderMalfunction) => (
            <span>{formatCurrency(record.price)}</span>
        ),
    },
];

const rateDesc = ["Rất tệ", "Tệ", "Khá", "Tốt", "Rất tốt"];

const DetailService = (props: Props) => {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const dispatch = useAppDispatch();
    const { account } = useAppSelector((state) => state.authentication);
    const { serviceId, skillId } = useParams();
    const { service } = useAppSelector((state) => state.service);
    const { reviewList, isLoadingReviewList } = useAppSelector(
        (state) => state.review
    );
    const { cartItemList, cartId } = useAppSelector((state) => state.cart);
    const { listService } = useAppSelector((state) => state.service);
    const [rate, setRate] = useState<number>(1);
    const [reviewContent, setReviewContent] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const handleGetDetailService = async (serviceId: number) => {
        await dispatch(getDetailServiceAsync(serviceId));
    };
    const handleGetAllServiceAsync = async () => {
        await dispatch(getServiceBySkillIdAsync(+(skillId as string)));
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
            try {
                await dispatch(createReviewAsync(review));
                dispatch(getAllReviewAsync(parseInt(serviceId)));
                serviceId &&
                    dispatch(getDetailServiceAsync(parseInt(serviceId)));
                message.success("Gửi đánh giá thành công");
                setRate(1);
                setReviewContent("");
            } catch (error) {
                message.error("Gửi đánh giá không thành công");
            }
        }
    };
    useEffect(() => {
        if (serviceId) {
            handleGetDetailService(parseInt(serviceId));
            handleGetReviewList(parseInt(serviceId));
        }

        if (skillId) {
            handleGetAllServiceAsync();
        }
    }, [serviceId, skillId]);

    const handleChangePage = (pageNum: number, pageSize: number) => {
        setCurrentPage(pageNum);
    };

    const handleAddToCart = () => {
        if (
            cartItemList.some(
                (item) =>
                    item.service.serviceId === service.detailService.serviceId
            )
        ) {
            messageApi.warning("Dịch vụ đã có trong giỏ hàng");
            return;
        }
        const cartItem: ICartItem = {
            cartId,
            serviceId: service.detailService.serviceId,
            isChoosen: false,
        };
        dispatch(createCartItemAsync(cartItem));
        dispatch(getCartAsync());
        messageApi.success("Thêm dịch vụ vào giỏ hàng thành công");
    };

    const handleAddToCheckout = () => {
        const cartItem: ICartItem = {
            cartId,
            serviceId: service.detailService.serviceId,
            isChoosen: false,
        };
        dispatch(setItemsForCheckout([cartItem]));
        navigate("/checkout");
    };
    const items: CollapseProps["items"] = [
        {
            key: "1",
            label: "Xem chi tiết",
            children: (
                <Flex vertical>
                    <Flex>
                        <Rate disabled defaultValue={5} />
                        <Text>
                            {Array.isArray(reviewList) &&
                                reviewList.filter((review) => review.rate === 5)
                                    .length}{" "}
                            đánh giá
                        </Text>
                    </Flex>
                    <Flex>
                        <Rate disabled defaultValue={4} />
                        <Text>
                            {Array.isArray(reviewList) &&
                                reviewList.filter((review) => review.rate === 4)
                                    .length}{" "}
                            đánh giá
                        </Text>
                    </Flex>
                    <Flex>
                        <Rate disabled defaultValue={3} />
                        <Text>
                            {Array.isArray(reviewList) &&
                                reviewList.filter((review) => review.rate === 3)
                                    .length}{" "}
                            đánh giá
                        </Text>
                    </Flex>
                    <Flex>
                        <Rate disabled defaultValue={2} />
                        <Text>
                            {Array.isArray(reviewList) &&
                                reviewList.filter((review) => review.rate === 2)
                                    .length}{" "}
                            đánh giá
                        </Text>
                    </Flex>
                    <Flex>
                        <Rate disabled defaultValue={1} />
                        <Text>
                            {Array.isArray(reviewList) &&
                                reviewList.filter((review) => review.rate === 1)
                                    .length}{" "}
                            đánh giá
                        </Text>
                    </Flex>
                </Flex>
            ),
        },
    ];

    console.log({ listService });
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
                    <Flex gap={20}>
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
                                            Giá từ{" "}
                                            {formatCurrency(
                                                parseInt(
                                                    service.detailService.price.toString()
                                                )
                                            )}
                                        </Title>
                                        <Space>
                                            <Text>Đánh giá:</Text>
                                            <Rate
                                                disabled
                                                value={
                                                    service.detailService
                                                        .rate || 0
                                                }
                                            />
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
                                        <Button
                                            shape="round"
                                            onClick={handleAddToCart}
                                            style={{ background: "#435585" }}
                                            type="primary"
                                        >
                                            Thêm vào giỏ
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
                                    dataSource={
                                        Array.isArray(
                                            service.detailService.malfunctions
                                        )
                                            ? service.detailService.malfunctions.map(
                                                  (val, idx) => ({
                                                      ...val,
                                                      index: idx,
                                                  })
                                              )
                                            : []
                                    }
                                    columns={columns}
                                    bordered
                                    pagination={false}
                                    size="small"
                                />
                                <Text strong>
                                    * Đơn giá chỉ gồm phí sửa chữa, không bao
                                    gồm phí linh kiện sửa chữa. Khách hàng có
                                    thể chọn tự mua linh kiện cần thay thế, lắp
                                    đặt hoặc yêu cầu nhân viên sửa chữa mua, giá
                                    linh kiện sẽ được tính vào hóa đơn cuối
                                    cùng.
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
                                            <Rate
                                                disabled
                                                value={
                                                    service.detailService
                                                        .rate || 0
                                                }
                                            />
                                            <Text>
                                                {reviewList?.length} đánh giá
                                            </Text>
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
                                                                fontSize:
                                                                    "20px",
                                                                fontWeight:
                                                                    "600",
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

                                    {Array.isArray(reviewList) &&
                                        reviewList
                                            ?.slice(
                                                currentPage * 3 - 3,
                                                currentPage * 3
                                            )
                                            .map((review) => (
                                                <Review
                                                    review={review}
                                                    key={review.reviewId}
                                                />
                                            ))}
                                </Flex>
                                <Flex justify="flex-end">
                                    <Pagination
                                        defaultCurrent={1}
                                        current={currentPage}
                                        pageSize={3}
                                        total={reviewList.length}
                                        onChange={handleChangePage}
                                    />
                                </Flex>
                            </Flex>
                        </Flex>
                        <Flex
                            vertical
                            gap={10}
                            style={{ width: "30%", marginTop: "20px" }}
                        >
                            <Title level={2} style={{ textAlign: "center" }}>
                                Dịch vụ liên quan
                            </Title>
                            <Flex vertical gap={10}>
                                {Array.isArray(listService) &&
                                    listService.length > 0 &&
                                    listService.map((service) => (
                                        <ServiceSubCard
                                            service={service}
                                            key={service.serviceId}
                                        />
                                    ))}
                            </Flex>
                        </Flex>
                    </Flex>
                </Spin>
            </Layout>
        </>
    );
};

export default DetailService;
