import React from "react";
import { IReview } from "../../utils/model";
import { useAppSelector } from "../../redux/hook";
import { Avatar, Divider, Flex, Rate, Space, Typography } from "antd";
import Images from "../../assets/Images";
const { Title, Paragraph, Text } = Typography;
type Props = {
    review: IReview;
};

const Review = ({ review }: Props) => {
    return (
        <Flex>
            <Flex>
                <Space>
                    <Avatar src={review.user?.imageUrl || Images.no_image} />
                </Space>
                <Flex>
                    <Title>{review.user?.accountName}</Title>
                    <Space>
                        <Rate count={review.rate} />
                    </Space>
                </Flex>
                <Space>
                    <Text>{review.createdAt}</Text>
                </Space>
            </Flex>
            <Divider />
            <Space>
                <Paragraph>{review.content}</Paragraph>
            </Space>
        </Flex>
    );
};

export default Review;
