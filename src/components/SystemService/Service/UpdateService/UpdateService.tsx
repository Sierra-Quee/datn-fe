import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import "./UpdateService.scss";
import {
    ICreateService,
    IService,
    ITypeService,
} from "../../../../utils/model";
import { useAppDispatch, useAppSelector } from "../../../../redux/hook";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    clearUpdateService,
    createServiceAsync,
    updadteServiceAsync,
} from "../../../../core/reducers/service";
import Images from "../../../../assets/Images";
import {
    resetUploadImage,
    uploadImageCloud,
} from "../../../../core/reducers/image_cloud";

interface IUpdateServiceProps {
    isOpen: boolean;
    close: () => void;
    serviceUpdate?: IService | null | undefined;
    isCreate: boolean;
    handleGetAllServiceAsync: () => void;
    skillId: number;
}

const UpdateService = ({
    isOpen,
    close,
    serviceUpdate,
    isCreate,
    handleGetAllServiceAsync,
    skillId,
}: IUpdateServiceProps) => {
    const [imageService, setImageService] = useState<string | undefined>("");
    const [imageCloud, setImageCloud] = useState<File>();
    const [serviceInfo, setServiceInfo] = useState<any>();

    const dispatch = useAppDispatch();
    const { loadingUpdateService, updateServiceStatus } = useAppSelector(
        (state) => state.service.updateService
    );

    const {
        uploadSuccess,
        loadingUploadImage,
        image: imageCloudUpload,
    } = useAppSelector((state) => state.imageCloud);

    useEffect(() => {
        if (serviceUpdate) {
            setImageService(serviceUpdate.image);
        }
    }, [serviceUpdate]);

    useEffect(() => {
        if (updateServiceStatus === "success") {
            toast.success(
                isCreate
                    ? "Thêm dịch vụ thành công"
                    : "Cập nhật thông tin dịch vụ thành công"
            );
            dispatch(clearUpdateService());
            dispatch(resetUploadImage());
            handleGetAllServiceAsync();
            close();
        }
    }, [updateServiceStatus]);

    useEffect(() => {
        if (
            uploadSuccess ||
            (serviceInfo &&
                ((isCreate && !imageService) ||
                    (!isCreate && serviceUpdate?.image === imageService)))
        ) {
            const update = async () => {
                if (isCreate) {
                    await dispatch(
                        createServiceAsync({
                            ...serviceInfo,
                            image: imageCloudUpload || imageService,
                            price: +serviceInfo.price,
                            skillId: skillId,
                        } as ICreateService)
                    );
                } else {
                    await dispatch(
                        updadteServiceAsync({
                            ...serviceInfo,
                            image: imageCloudUpload || imageService,
                            price: +serviceInfo.price,
                            rate: serviceUpdate?.rate as number,
                            skillId: skillId,
                            serviceId: serviceUpdate?.serviceId,
                        })
                    );
                }
            };
            update();
        }
    }, [uploadSuccess, serviceInfo, dispatch]);

    const handleSelectImage = (event: any) => {
        if (event && event.target.files) {
            setImageService(URL.createObjectURL(event.target.files[0]));
            setImageCloud(event.target.files[0]);
        }
    };

    const handleUploadImageCloud = async () => {
        const data = new FormData();
        data.append("file", imageCloud as File);
        data.append(
            "upload_preset",
            process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET as string
        );
        data.append(
            "cloud_name",
            process.env.REACT_APP_CLOUDINARY_CLOUD_NAME as string
        );
        data.append("folder", "DATN-FE");
        await dispatch(uploadImageCloud(data));
    };

    const updateServiceModalAsync = async (value: any) => {
        setServiceInfo({ ...value, desc: value.desc || "" });
        if (
            (isCreate && imageService) ||
            (!isCreate && imageService !== serviceUpdate?.image)
        ) {
            await handleUploadImageCloud();
        }
    };

    const buttonUpdate = () => {
        return (
            <Button
                key={2}
                type="primary"
                htmlType="submit"
                loading={loadingUpdateService || loadingUploadImage}
            >
                Cập nhật
            </Button>
        );
    };

    const buttonCancel = () => {
        return (
            <Button
                key={1}
                disabled={loadingUpdateService || loadingUploadImage}
                onClick={close}
            >
                Hủy bỏ
            </Button>
        );
    };

    const buttonUploadImage = () => {
        return (
            <span
                style={{
                    boxSizing: "border-box",
                    marginTop: "20px",
                    marginBottom: "20px",
                }}
            >
                <label className="btn-upload-image" htmlFor="btn-upload-image">
                    Thay đổi ảnh
                </label>
                <input
                    id="btn-upload-image"
                    style={{ display: "none" }}
                    type="file"
                    onChange={handleSelectImage}
                    onClick={(event: any) => (event.target.value = null)}
                />
            </span>
        );
    };

    return (
        <Modal
            maskClosable={false}
            closeIcon={false}
            open={isOpen}
            width={800}
            onCancel={close}
            title={isCreate ? "Thêm dịch vụ" : "Cập nhật thông tin dịch vụ"}
            footer={[]}
            className="update-service-modal"
        >
            <Form layout="vertical" onFinish={updateServiceModalAsync}>
                <div className="upload-service-wrap">
                    {buttonUploadImage()}
                    <img
                        className="image-service"
                        src={imageService || Images.no_image}
                    />
                </div>
                <Row gutter={20} style={{ marginTop: 20 }}>
                    <Col span={12}>
                        <Form.Item
                            label="Tên dịch vụ"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập tên dịch vụ",
                                },
                            ]}
                            initialValue={serviceUpdate?.name}
                        >
                            <Input placeholder="Nhập tên dịch vụ" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Loại"
                            name="type"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng chọn loại của dịch vụ",
                                },
                            ]}
                            initialValue={serviceUpdate?.type}
                        >
                            <Select placeholder="Chọn loại của dịch vụ">
                                <Select.Option value={ITypeService.MainTain}>
                                    Bảo dưỡng
                                </Select.Option>
                                <Select.Option value={ITypeService.Repair}>
                                    Sửa chữa
                                </Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20} style={{ marginTop: 20 }}>
                    <Col span={12}>
                        <Form.Item
                            label="Giá"
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập giá cho dịch vụ",
                                },
                            ]}
                            initialValue={serviceUpdate?.price}
                        >
                            <Input placeholder="Nhập giá dịch vụ" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Miêu tả"
                            name="desc"
                            initialValue={serviceUpdate?.desc}
                        >
                            <Input.TextArea
                                rows={4}
                                placeholder="Nhập miêu tả cho dịch vụ"
                            />
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

export default UpdateService;
