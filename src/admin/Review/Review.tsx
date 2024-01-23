import {
    Button,
    Flex,
    Modal,
    Select,
    SelectProps,
    Spin,
    Table,
    Tooltip,
    Typography,
} from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { IUser } from "../../utils/model";
import { ColumnsType } from "antd/es/table";
import { useDispatch } from "react-redux";
import {
    clearReviewList,
    getAllReviewsAsync,
} from "../../core/reducers/review";
import { DeleteFilled, StarFilled } from "@ant-design/icons";
import { formatDate } from "../../utils/functions/formation";
import fetchHandler from "../../api/axios";
import { toast } from "react-toastify";
import { getAllServiceAsync } from "../../core/reducers/service";
const { Title } = Typography;

type Props = {};
interface IReviewTable {
    reviewId?: number;
    rate: number;
    content: string;
    userId: string;
    serviceId?: number;
    createdAt?: string;
    updatedAt?: string;
    user?: IUser;
    service?: {
        name: string;
    };
}
const RateStars: SelectProps["options"] = [
    {
        value: 0,
        label: "Tất cả đánh giá",
    },
    {
        value: 1,
        label: (
            <div>
                1
                <StarFilled style={{ color: "yellow", margin: "0 10px" }} />
            </div>
        ),
    },
    {
        value: 2,
        label: (
            <div>
                2
                <StarFilled style={{ color: "yellow", margin: "0 10px" }} />
            </div>
        ),
    },
    {
        value: 3,
        label: (
            <div>
                3
                <StarFilled style={{ color: "yellow", margin: "0 10px" }} />
            </div>
        ),
    },
    {
        value: 4,
        label: (
            <div>
                4
                <StarFilled style={{ color: "yellow", margin: "0 10px" }} />
            </div>
        ),
    },
    {
        value: 5,
        label: (
            <div>
                5
                <StarFilled style={{ color: "yellow", margin: "0 10px" }} />
            </div>
        ),
    },
];
const Review = (props: Props) => {
    const dispatch = useAppDispatch();
    const { reviewList, isLoadingReviewList } = useAppSelector(
        (state) => state.review
    );
    const { listService } = useAppSelector((state) => state.service);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [selectedReviewId, setSelectedReviewId] = useState<number>();
    const [selectedRate, setSelectedRate] = useState<number>(0);
    const [selectedService, setselectedService] = useState<string>("all");
    const handleGetReviewsList = async (query: any) => {
        await dispatch(getAllReviewsAsync(query));
    };
    const handleGetAllServices = async () => {
        await dispatch(getAllServiceAsync());
    };
    useEffect(() => {
        const query: any = {};
        if (selectedService !== "all") {
            query.serviceId = selectedService;
        }
        if (selectedRate !== 0) {
            query.rate = selectedRate;
        }
        handleGetReviewsList(query);
        handleGetAllServices();
    }, [selectedRate, selectedService]);
    const handleDeleteReview = async () => {
        try {
            await fetchHandler.delete(`review/delete/${selectedReviewId}`);
            await dispatch(getAllReviewsAsync({}));
            setOpenModal(false);
            toast.success("Xoá đánh giá thành công");
        } catch (error) {
            toast.error("Xóa đánh giá không thành công, đã có lỗi xảy ra.");
        }
    };
    const handleChangeSelectedRate = (value: number) => {
        setSelectedRate(value);
    };
    const handleChangeSelectedService = (value: string) => {
        setselectedService(value);
    };
    const handleOpenModal = (reviewId: number) => {
        setSelectedReviewId(reviewId);
        setOpenModal(true);
    };
    const handleCloseModal = () => setOpenModal(false);
    const columns: ColumnsType<IReviewTable> = useMemo(
        () => [
            {
                title: "Mã",
                dataIndex: "reviewId",
                key: "reviewId",
                width: 50,
            },
            {
                title: "Dịch vụ",
                dataIndex: "service",
                key: "service",
                width: 250,
                render: (_: any, record: IReviewTable) => (
                    <div>{record.service?.name}</div>
                ),
            },
            {
                title: "Khách hàng",
                dataIndex: "user",
                key: "user",
                width: 100,
                render: (_: any, record: IReviewTable) => (
                    <div>{record.user?.accountName}</div>
                ),
            },
            {
                title: "Điểm",
                dataIndex: "rate",
                key: "rate",
                width: 100,
                render: (_: any, record: IReviewTable) => (
                    <div>
                        {record.rate}
                        <StarFilled
                            style={{ color: "yellow", margin: "0 10px" }}
                        />
                    </div>
                ),
            },
            {
                title: "Đánh giá",
                dataIndex: "content",
                key: "content",
                width: 200,
            },
            {
                title: "Cập nhật lúc",
                dataIndex: "updatedAt",
                key: "updatedAt",
                width: 150,
                render: (_: any, record: IReviewTable) => (
                    <div>
                        {record.updatedAt && formatDate(record.updatedAt)}
                    </div>
                ),
            },
            {
                title: "",
                dataIndex: "action",
                key: "",
                fixed: "left",
                width: 100,
                render: (_: any, record: IReviewTable) => (
                    <Tooltip title="Xóa đánh giá">
                        <DeleteFilled
                            style={{
                                fontSize: "18px",
                                color: "red",
                                cursor: "pointer",
                            }}
                            onClick={() =>
                                record.reviewId &&
                                handleOpenModal(record.reviewId)
                            }
                        />
                    </Tooltip>
                ),
            },
        ],
        []
    );
    const serviceList: SelectProps["options"] = useMemo(() => {
        const defaultVal: SelectProps["options"] = [
            {
                value: "all",
                label: "Tất cả dịch vụ",
            },
        ];
        if (!Array.isArray(listService) || listService.length === 0)
            return defaultVal;
        return [
            ...defaultVal,
            ...listService.map((service) => {
                return {
                    value: service.serviceId,
                    label: service.name,
                };
            }),
        ];
    }, [listService]);
    return (
        <Spin spinning={isLoadingReviewList}>
            <div className="system-repair">
                <h2>Danh sách đánh giá</h2>
                <Flex align="center" gap={10} style={{ marginBottom: "10px" }}>
                    <Flex align="center" gap={5} style={{ width: "30%" }}>
                        <Title level={5} style={{ margin: 0 }}>
                            Điểm đánh giá:
                        </Title>
                        <Select
                            defaultValue={0}
                            options={RateStars}
                            style={{ width: 150 }}
                            onChange={handleChangeSelectedRate}
                        />
                    </Flex>
                    <Flex align="center" gap={5} style={{ width: "30%" }}>
                        <Title level={5} style={{ margin: 0 }}>
                            Dịch vụ:
                        </Title>
                        <Select
                            defaultValue="all"
                            options={serviceList}
                            style={{ width: 200 }}
                            onChange={handleChangeSelectedService}
                        />
                    </Flex>
                </Flex>
                <Table
                    columns={columns}
                    dataSource={reviewList}
                    pagination={{ pageSize: 7 }}
                />
            </div>
            <Modal
                open={openModal}
                onOk={handleDeleteReview}
                cancelText="Hủy"
                okText="Xóa"
                onCancel={handleCloseModal}
            >
                <p>Bạn muốn xóa đánh giá này?</p>
            </Modal>
        </Spin>
    );
};

export default Review;
