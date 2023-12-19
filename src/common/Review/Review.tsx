import { IReview } from "../../utils/model";
import {
    Avatar,
    Button,
    Divider,
    Dropdown,
    Flex,
    MenuProps,
    Modal,
    Rate,
    Space,
    Typography,
    Input,
} from "antd";
import "./Review.scss";
import { formatDate } from "../../utils/functions/formation";
import { MoreOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useState } from "react";
import { toast } from "react-toastify";
import {
    deleteReviewAsync,
    getAllReviewAsync,
    updateReviewAsync,
} from "../../core/reducers/review";
const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;
type Props = {
    review: IReview;
};
const rateDesc = ["Rất tệ", "Tệ", "Khá", "Tốt", "Rất tốt"];
const Review = ({ review }: Props) => {
    const dispatch = useAppDispatch();
    const [rate, setRate] = useState<number>(1);
    const [openUpdateReviewModal, setOpenUpdateReviewModal] =
        useState<boolean>(false);
    const [openDeleteReviewModal, setOpenDeleteReviewModal] =
        useState<boolean>(false);
    const [reviewContent, setReviewContent] = useState<string>("");
    const { user } = review;
    const { account } = useAppSelector((state) => state.authentication);
    const handleOpenUpdateReviewModal = () => {
        setRate(review.rate);
        setReviewContent(review.content);
        setOpenUpdateReviewModal(true);
    };
    const handleCloseUpdateReviewModal = () => {
        setOpenUpdateReviewModal(false);
    };
    const handleSubmitUpdateReview = async () => {
        const updatedReview: IReview = {
            content: reviewContent,
            rate: rate,
            userId: account.userId,
            reviewId: parseInt(review.reviewId?.toString() || "0"),
        };
        try {
            await dispatch(updateReviewAsync(updatedReview));
            review.serviceId &&
                (await dispatch(getAllReviewAsync(review.serviceId)));
            toast.success("Cập nhật đánh giá thành công!!!");
            handleCloseUpdateReviewModal();
        } catch (error) {
            toast.error(
                "Đã có lỗi xảy ra. Cập nhật đánh giá không thành công!!!"
            );
            throw error;
        }
    };
    const handleOpenDeleteReviewModal = () => {
        setOpenDeleteReviewModal(true);
    };
    const handleCloseDeleteReviewModal = () => {
        setOpenDeleteReviewModal(false);
    };
    const handleSubmitDeleteReview = async () => {
        try {
            if (review.reviewId) {
                await dispatch(deleteReviewAsync(review.reviewId));
                review.serviceId &&
                    (await dispatch(getAllReviewAsync(review.serviceId)));
                toast.success("Xóa đánh giá thành công!!!");
            }

            handleCloseDeleteReviewModal();
        } catch (error) {
            toast.error("Đã có lỗi xảy ra. Xóa đánh giá không thành công!!!");
            throw error;
        }
    };
    const items: MenuProps["items"] = [
        {
            key: "1",
            label: <Text onClick={handleOpenUpdateReviewModal}>Chỉnh sửa</Text>,
        },
        {
            key: "2",
            label: <Text onClick={handleOpenDeleteReviewModal}>Xoá</Text>,
        },
    ];
    return (
        <>
            <Flex vertical className="reviewLayout">
                <Flex align="center" className="reviewLayout__header" gap={10}>
                    <Space>
                        {user && user?.imageUrl ? (
                            <Avatar src={user.imageUrl} />
                        ) : (
                            <Avatar
                                style={{
                                    backgroundColor: "#f56a00",
                                }}
                                size="large"
                            >
                                <span
                                    style={{
                                        fontSize: "20px",
                                        fontWeight: "600",
                                    }}
                                >
                                    {(user?.accountName[0] || "").toUpperCase()}
                                </span>
                            </Avatar>
                        )}
                    </Space>
                    <Flex
                        justify="space-between"
                        align="start"
                        style={{ width: "100%" }}
                    >
                        <Flex vertical>
                            <Title level={5}>{review.user?.accountName}</Title>
                            <Space>
                                <Rate disabled defaultValue={review.rate} />
                            </Space>
                        </Flex>
                        <Flex
                            align="start"
                            gap={5}
                            style={{ margin: 0, padding: 0 }}
                        >
                            <Text>
                                {formatDate(
                                    review.createdAt || new Date().toISOString()
                                )}
                            </Text>
                            {account.accountName === user?.accountName && (
                                <Dropdown
                                    menu={{ items }}
                                    placement="topLeft"
                                    arrow
                                >
                                    <Button icon={<MoreOutlined />}></Button>
                                </Dropdown>
                            )}
                        </Flex>
                    </Flex>
                </Flex>
                <Divider />
                <Space>
                    <Paragraph>{review.content}</Paragraph>
                </Space>
            </Flex>
            <Modal
                open={openUpdateReviewModal}
                onCancel={handleCloseUpdateReviewModal}
                onOk={handleSubmitUpdateReview}
                cancelText="Quay lại"
                okText="Cập nhật"
            >
                <Flex gap={10} vertical>
                    <Title level={4} style={{ margin: "10px 0" }}>
                        Chỉnh sửa đánh giá
                    </Title>
                    <Rate
                        defaultValue={1}
                        value={rate}
                        onChange={setRate}
                        tooltips={rateDesc}
                    />
                    <TextArea
                        showCount
                        maxLength={100}
                        onChange={(e) => setReviewContent(e.target.value)}
                        value={reviewContent}
                        placeholder="Nội dung đánh giá"
                        style={{ height: 120, resize: "none" }}
                    />
                </Flex>
            </Modal>
            <Modal
                open={openDeleteReviewModal}
                onCancel={handleCloseDeleteReviewModal}
                onOk={handleSubmitDeleteReview}
                cancelText="Quay lại"
                okText="Đồng ý"
            >
                <Title level={4} style={{ margin: "10px 0" }}>
                    Bạn muốn xóa đánh giá này?
                </Title>
            </Modal>
        </>
    );
};

export default Review;
