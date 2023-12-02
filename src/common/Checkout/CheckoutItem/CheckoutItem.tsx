import { useState, useMemo } from "react";
import { IService } from "../../../utils/model";
import {
    Flex,
    Modal,
    Tooltip,
    Typography,
    Input,
    Upload,
    Button,
    Space,
} from "antd";
import "./CheckoutItem.scss";
import {
    CommentOutlined,
    PlusOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
const { Text, Title } = Typography;
const { TextArea } = Input;

type Props = {
    service: IService;
    index: number;
    addedInfoList: IAddedInfo[];
    setAddedInfoList: React.Dispatch<React.SetStateAction<IAddedInfo[]>>;
};

export interface IAddedInfo {
    uploadedImage: UploadFile[];
    describedMalfunction: string;
}

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const CheckoutItem = ({
    service,
    index,
    addedInfoList,
    setAddedInfoList,
}: Props) => {
    const [isOpenAddInfoModal, setIsOpenAddInfoModal] =
        useState<boolean>(false);
    const [describedMalfunction, setDescribedMalfunction] =
        useState<string>("");
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");

    const handleOpenAddInfoModal = () => {
        setIsOpenAddInfoModal(true);
    };
    const handleCloseAddInfoModal = () => {
        setIsOpenAddInfoModal(false);
    };
    const handleAddInfo = () => {
        console.log("render");
        console.log({ index });
        let cloneAddedInfoList = [...addedInfoList];
        let clone2 = [...addedInfoList];
        // console.log({ cloneAddedInfoList });
        // cloneAddedInfoList[index].uploadedImage = fileList;
        // cloneAddedInfoList[index].describedMalfunction = describedMalfunction;
        cloneAddedInfoList[index] = {
            describedMalfunction: describedMalfunction,
            uploadedImage: fileList,
        };
        console.log({ cloneAddedInfoList, clone2, addedInfoList });
        // const arr = [
        //     { name: "log" },
        //     { name: "hieu" },
        //     { name: "cas" },
        //     { name: "csacsac" },
        // ];
        // const test = { ...arr[index] };
        // test.name = describedMalfunction;
        // arr[index] = test;
        // console.log({ arr });
        // setAddedInfoList(cloneAddedInfoList);
        // console.log({ cloneAddedInfoList });
        // handleCloseAddInfoModal();
    };
    const handleChangeDescribedMalfunction = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setDescribedMalfunction(e.target.value);
    };

    //handle upload images

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(
            file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
        );
    };

    const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
        setFileList(newFileList);

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <>
            <Flex className="checkoutItemLayout">
                <Flex className="checkoutItemService">
                    <Text className="checkoutItemService__id">
                        {service?.serviceId}
                    </Text>
                    <Text className="checkoutItemService__name">
                        {service?.name}
                    </Text>
                    <Text className="checkoutItemService__price">
                        {service?.price}
                    </Text>
                </Flex>
                <Flex className="checkoutItemService__btn" justify="flex-end">
                    <Tooltip title="Thêm thông tin">
                        <CommentOutlined
                            style={{ cursor: "pointer", fontSize: "20px" }}
                            onClick={handleOpenAddInfoModal}
                        />
                    </Tooltip>
                </Flex>
            </Flex>

            <Modal
                open={isOpenAddInfoModal}
                onCancel={handleCloseAddInfoModal}
                onOk={handleAddInfo}
                cancelText="Quay trở lại"
                okText="Thêm"
            >
                <Flex vertical>
                    <Title level={4}>
                        Thêm thông tin hỏng hóc cho dịch vụ <br />
                        {service?.name}
                    </Title>
                    <TextArea
                        showCount
                        maxLength={100}
                        onChange={handleChangeDescribedMalfunction}
                        placeholder="Hãy miêu tả lỗi mà thiết bị của bạn gặp phải"
                        style={{ height: 120, resize: "none" }}
                        value={describedMalfunction}
                    />
                    <Title level={5}>Tải lên ảnh hoặc video</Title>
                    <Upload
                        beforeUpload={() => false}
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                    >
                        {fileList.length >= 8 ? null : uploadButton}
                    </Upload>

                    <Modal
                        open={previewOpen}
                        title={previewTitle}
                        footer={null}
                        onCancel={handleCancel}
                    >
                        <img
                            alt="example"
                            style={{ width: "100%" }}
                            src={previewImage}
                        />
                    </Modal>
                </Flex>
            </Modal>
        </>
    );
};

export default CheckoutItem;
