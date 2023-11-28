import { IReview } from "../../utils/model";
import { Avatar, Divider, Flex, Rate, Space, Typography } from "antd";
import "./Review.scss";
const { Title, Paragraph, Text } = Typography;
type Props = {
    review: IReview;
};

const Review = ({ review }: Props) => {
    const { user } = review;
    return (
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
                    <Space>
                        <Text>{review.createdAt}</Text>
                    </Space>
                </Flex>
            </Flex>
            <Divider />
            <Space>
                <Paragraph>{review.content}</Paragraph>
            </Space>
        </Flex>
    );
};

export default Review;
