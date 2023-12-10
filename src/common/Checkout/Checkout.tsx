import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import cart from "../../core/reducers/cart";
import {
    Button,
    DatePicker,
    DatePickerProps,
    Flex,
    Layout,
    Modal,
    Radio,
    RadioChangeEvent,
    Space,
    Spin,
    Table,
    theme,
    Typography,
} from "antd";
import { getAllAddressAsync } from "../../core/reducers/address";
import {
    IAddress,
    ICartItem,
    IDetailOrder,
    IOrder,
    IOrderMedia,
} from "../../utils/model";
import "./Checkout.scss";
import CheckoutItem, { IAddedInfo } from "./CheckoutItem/CheckoutItem";
import { Dayjs } from "dayjs";
import { uploadImageCloud } from "../../core/reducers/image_cloud";
import axios from "axios";
import { createOrderAsync } from "../../core/reducers/order";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const { Title, Text } = Typography;
type Props = {};

const Checkout = (props: Props) => {
    const navigate = useNavigate();
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const dispatch = useAppDispatch();
    const { cartItemForCheckout } = useAppSelector((state) => state.cart);
    const { addressList } = useAppSelector((state) => state.address);
    const { account } = useAppSelector((state) => state.authentication);
    const {
        uploadSuccess,
        loadingUploadImage,
        image: imageCloud,
    } = useAppSelector((state) => state.imageCloud);
    const [addedInfoList, setAddedInfoList] = useState<IAddedInfo[]>([]);
    const [isOpenAddressModal, setIsOpenAddressModal] =
        useState<boolean>(false);
    const [selectedAddress, setSelectedAddress] = useState<number>(0);
    const [expectedDate, setExpectedDate] = useState<Dayjs | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const handleGetAddressList = async () => {
        if (account) {
            await dispatch(getAllAddressAsync(account.userId));
        }
    };
    const handleOpenAddressModal = () => {
        setIsOpenAddressModal(true);
    };
    const handleCloseAddressModal = () => {
        setIsOpenAddressModal(false);
    };
    const handleChangeAddress = (e: RadioChangeEvent) => {
        setSelectedAddress(e.target.value);
    };
    const handleChangeExpectedDate: DatePickerProps["onChange"] = (
        date,
        dateString
    ) => {
        setExpectedDate(date);
    };
    useEffect(() => {
        handleGetAddressList();
        if (addressList) {
            const defaultAddressId = addressList.findIndex(
                (add: IAddress) => add.isMainAddress
            );
            if (defaultAddressId >= 0) setSelectedAddress(defaultAddressId);
            else setSelectedAddress(0);
        }
    }, [account]);
    useEffect(() => {
        if (
            Array.isArray(cartItemForCheckout) &&
            cartItemForCheckout.length > 0
        ) {
            setAddedInfoList(new Array(cartItemForCheckout.length).fill({}));
        }
    }, [cartItemForCheckout]);
    const address = addressList[selectedAddress];

    const handleSubmitOrder = async () => {
        if (!expectedDate) {
            toast.error("Bạn chưa chọn ngày mong muốn thực hiện dịch vụ");
            return;
        }
        try {
            setLoading(true);
            let orderDetailList: IDetailOrder[] = [];
            orderDetailList = await Promise.all(
                addedInfoList.map(async (value, index: number) => {
                    const desc = value.describedMalfunction;
                    let orderMediaList: IOrderMedia[] = [];
                    if (
                        Array.isArray(value.uploadedImage) &&
                        value.uploadedImage.length > 0
                    ) {
                        const imageList = await Promise.all(
                            value.uploadedImage.map(async (image) => {
                                const img = image.thumbUrl;
                                const data = new FormData();
                                if (img) data.append("file", img);
                                data.append(
                                    "upload_preset",
                                    process.env
                                        .REACT_APP_CLOUDINARY_UPLOAD_PRESET as string
                                );
                                data.append(
                                    "cloud_name",
                                    process.env
                                        .REACT_APP_CLOUDINARY_CLOUD_NAME as string
                                );
                                data.append("folder", "DATN-FE");
                                const response = await axios.post(
                                    `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
                                    data
                                );

                                return response.data;
                            })
                        );

                        if (Array.isArray(imageList) && imageList.length > 0) {
                            orderMediaList = imageList.map((image) => {
                                const media: IOrderMedia = {
                                    mediaType: 0,
                                    url: image.url,
                                };

                                return media;
                            });
                        }
                    }
                    const orderDetail: IDetailOrder = {
                        serviceId: cartItemForCheckout[index].service.serviceId,
                        desc: desc,
                        media: orderMediaList,
                    };

                    return orderDetail;
                })
            );

            const order: IOrder = {
                expectedDate: expectedDate ? expectedDate.toString() : "",
                addressId: address.addressId || 0,
                orderDetail: orderDetailList,
            };

            await dispatch(createOrderAsync(order));
            toast.success("Đặt dịch vụ thành công");
            setLoading(false);
            navigate("/user/order");
        } catch (error) {
            toast.error("Đã có lỗi xảy ra, đặt dịch vụ không thành công");
            setLoading(false);
        }
    };
    return (
        <>
            <Spin spinning={loading}>
                <Layout
                    style={{
                        padding: "24px 0",
                        background: colorBgContainer,
                        width: "60%",
                        margin: "auto",
                        borderRadius: "5px",
                        minHeight: "80vh",
                    }}
                    className="checkoutLayout"
                >
                    <Flex vertical gap={20}>
                        <Flex className="checkoutAddress" vertical>
                            <Title level={3}>Địa chỉ sửa chữa</Title>
                            {addressList.length === 0 ? (
                                <Flex>
                                    <Text>Chưa có địa chỉ</Text>
                                    <Button>Thêm địa chỉ</Button>
                                </Flex>
                            ) : (
                                <Flex gap={20}>
                                    <Text>{address?.address}</Text>
                                    {address?.isMainAddress && (
                                        <Button danger>Mặc định</Button>
                                    )}
                                    <Button
                                        size="small"
                                        style={{ maxWidth: "100px" }}
                                        type="primary"
                                        onClick={handleOpenAddressModal}
                                    >
                                        Thay đổi
                                    </Button>
                                </Flex>
                            )}
                        </Flex>
                        <Flex className="checkoutServices" vertical gap={10}>
                            <Title level={3}>Danh sách dịch vụ</Title>
                            <Flex style={{ padding: "10px" }}>
                                <Title
                                    style={{
                                        width: "10%",
                                        margin: 0,
                                        textAlign: "center",
                                    }}
                                    level={5}
                                >
                                    Mã dịch vụ
                                </Title>
                                <Title
                                    style={{
                                        width: "50%",
                                        margin: 0,
                                        textAlign: "center",
                                    }}
                                    level={5}
                                >
                                    Tên dịch vụ
                                </Title>
                                <Title
                                    style={{
                                        width: "20%",
                                        margin: 0,
                                        textAlign: "center",
                                    }}
                                    level={5}
                                >
                                    Giá từ
                                </Title>
                            </Flex>
                            <Flex vertical gap={20}>
                                {cartItemForCheckout.map(
                                    (item: ICartItem, index: number) => (
                                        <CheckoutItem
                                            service={item.service}
                                            key={item.id}
                                            index={index}
                                            addedInfoList={addedInfoList}
                                            setAddedInfoList={setAddedInfoList}
                                        />
                                    )
                                )}
                            </Flex>
                        </Flex>
                        <Flex
                            className="checkoutAdditiveInfo"
                            justify="space-between"
                            align="start"
                        >
                            <Space>
                                <Title level={3}>Thông tin bổ sung</Title>
                            </Space>
                            <Flex vertical gap={10}>
                                <Flex gap={50}>
                                    <Title level={5}>
                                        Ngày sửa chữa mong muốn
                                    </Title>
                                    <Space>
                                        <DatePicker
                                            showTime
                                            onChange={handleChangeExpectedDate}
                                            value={expectedDate}
                                        />
                                    </Space>
                                </Flex>
                                <Flex justify="space-between">
                                    <Title level={5}>Tổng tiền dự kiến</Title>
                                    <Title level={4}>
                                        {cartItemForCheckout
                                            ? cartItemForCheckout.reduce(
                                                  (total, item) =>
                                                      (total += parseInt(
                                                          item.service.price
                                                      )),
                                                  0
                                              )
                                            : 0}
                                    </Title>
                                </Flex>
                                <Flex justify="flex-end">
                                    <Button
                                        type="primary"
                                        size="middle"
                                        style={{
                                            maxWidth: "150px",
                                            padding: "10px 5px",
                                        }}
                                        onClick={handleSubmitOrder}
                                    >
                                        Đặt dịch vụ
                                    </Button>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                </Layout>
                <Modal
                    open={isOpenAddressModal}
                    onCancel={handleCloseAddressModal}
                    onOk={handleCloseAddressModal}
                    okText="Xác nhận"
                    cancelText="Quay lại"
                >
                    <Flex
                        vertical
                        style={{ height: "50vh", overflowY: "auto" }}
                    >
                        <Title level={3} style={{ margin: "0 0 20px 0" }}>
                            Địa chỉ sửa chữa
                        </Title>
                        <Flex vertical gap={10}>
                            <Radio.Group
                                value={selectedAddress}
                                onChange={handleChangeAddress}
                            >
                                {addressList.map((address, index) => (
                                    <Radio
                                        value={index}
                                        key={address.addressId}
                                    >
                                        {address.address}
                                    </Radio>
                                ))}
                            </Radio.Group>
                        </Flex>
                    </Flex>
                </Modal>
            </Spin>
        </>
    );
};

export default Checkout;
