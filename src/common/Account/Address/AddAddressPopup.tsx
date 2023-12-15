import {
    Checkbox,
    Input,
    Modal,
    Select,
    Form,
    Flex,
    Button,
    Typography,
} from "antd";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { ADDRESS_API } from "../../../utils/constants";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { IAddress } from "../../../utils/model";
import {
    createAddressAsync,
    getAllAddressAsync,
} from "../../../core/reducers/address";
import { toast } from "react-toastify";
const { Text } = Typography;
type Props = {
    isOpen: boolean;
    close: any;
    open: any;
    submit: any;
};
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const AddAddressPopup = (props: Props) => {
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();
    const [selectedProvince, setSelectedProvince] = useState<string>("");
    const [selectedDistrict, setSelectedDistrict] = useState<string>("");
    const [selectedWard, setSelectedWard] = useState<string>("");
    const [detailAddress, setDetailAddress] = useState<string>("");
    const [provinceList, setProvinceList] = useState([]);
    const [districtList, setDistrictList] = useState([]);
    const [wardList, setWardList] = useState([]);
    const [isMainAddress, setIsMainAddress] = useState<boolean>(false);
    const [longitude, setLongitude] = useState<number>();
    const [latitude, setLatitude] = useState<number>();
    const { account } = useAppSelector((state) => state.authentication);
    useEffect(() => {
        const getProvinceData = async () => {
            try {
                const response = await axios.get(`${ADDRESS_API}/province`);
                if (response.data) setProvinceList(response.data.results);
            } catch (error) {
                throw error;
            }
        };
        getProvinceData();
    }, []);

    useEffect(() => {
        const getDistrictData = async () => {
            try {
                const response = await axios.get(
                    `${ADDRESS_API}/province/district/${
                        selectedProvince.split("/")[0]
                    }`
                );
                if (response.data) setDistrictList(response.data.results);
            } catch (error) {
                throw error;
            }
        };

        getDistrictData();
    }, [selectedProvince]);

    useEffect(() => {
        const getWardData = async () => {
            try {
                const response = await axios.get(
                    `${ADDRESS_API}/province/ward/${
                        selectedDistrict.split("/")[0]
                    }`
                );
                if (response.data) setWardList(response.data.results);
            } catch (error) {
                throw error;
            }
        };

        getWardData();
    }, [selectedDistrict]);

    const handleChangeProvince = (value: string) => {
        setDistrictList([]);
        setSelectedProvince(value);
    };

    const handleChangeDistrict = (value: string) => {
        setWardList([]);
        setSelectedDistrict(value);
    };

    const handleChangeWard = (value: string) => {
        setSelectedWard(value);
    };

    const handleSubmitForm = useCallback(async () => {
        const data: IAddress = {
            address: `${detailAddress}/${selectedWard.split("/")[1]}, ${
                selectedDistrict.split("/")[1]
            }, ${selectedProvince.split("/")[1]}`,
            latitude: latitude,
            longitude: longitude,
            userId: account.userId,
            isMainAddress,
        };

        try {
            await dispatch(createAddressAsync(data));
            setDetailAddress("");
            setLatitude(undefined);
            setLongitude(undefined);
            setSelectedDistrict("");
            setSelectedProvince("");
            setSelectedWard("");
            props.close();
            await dispatch(getAllAddressAsync(account.userId));
        } catch (error) {}
    }, [
        selectedProvince,
        selectedDistrict,
        selectedWard,
        detailAddress,
        latitude,
        longitude,
    ]);

    const handleGetCordinate = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLatitude(latitude);
                    setLongitude(longitude);
                },
                (error) => {
                    toast.error(`Lỗi: ${error.message}`);
                }
            );
        } else {
            toast.error("Trình duyệt không hỗ trợ Geolocation.");
        }
    };
    const handleClearData = () => {
        setDetailAddress("");
        setLatitude(undefined);
        setLongitude(undefined);
        setSelectedDistrict("");
        setSelectedProvince("");
        setSelectedWard("");
    };
    return (
        <Modal
            title="Thêm địa chỉ"
            open={props.isOpen}
            onOk={handleSubmitForm}
            onCancel={props.close}
            cancelText="Quay lại"
            okText="Thêm địa chỉ"
        >
            <Form
                {...layout}
                form={form}
                name="control-hooks"
                //   onFinish={onFinish}
                style={{ maxWidth: 600 }}
            >
                <Form.Item
                    name="province"
                    label="Tỉnh/Thành phố"
                    rules={[{ required: true }]}
                >
                    <Select
                        placeholder="Tỉnh/Thành phố"
                        optionFilterProp="children"
                        onChange={handleChangeProvince}
                        options={
                            provinceList &&
                            provinceList?.map((location: any) => ({
                                value: `${location.province_id}/${location.province_name}`,
                                label: location.province_name,
                            }))
                        }
                    />
                </Form.Item>
                <Form.Item
                    name="district"
                    label="Quận/Huyện"
                    rules={[{ required: true }]}
                >
                    <Select
                        placeholder="Quận/Huyện"
                        optionFilterProp="children"
                        onChange={handleChangeDistrict}
                        options={
                            districtList &&
                            districtList?.map((location: any) => ({
                                value: `${location.district_id}/${location.district_name}`,
                                label: location.district_name,
                            }))
                        }
                        disabled={districtList.length === 0}
                    />
                </Form.Item>
                <Form.Item name="ward" label="Xã/Phường">
                    <Select
                        placeholder="Xã/Phường"
                        optionFilterProp="children"
                        onChange={handleChangeWard}
                        options={
                            wardList &&
                            wardList?.map((location: any) => ({
                                value: `${location.ward_id}/${location.ward_name}`,
                                label: location.ward_name,
                            }))
                        }
                        disabled={wardList.length === 0}
                    />
                </Form.Item>
                <Form.Item name="detail" label="Địa chỉ chi tiết">
                    <Input
                        value={detailAddress}
                        onChange={(e) => setDetailAddress(e.target.value)}
                    />
                </Form.Item>
                <Form.Item name="isDefault" label="Địa chỉ mặc định">
                    <Checkbox
                        checked={isMainAddress}
                        onChange={(e) => setIsMainAddress(e.target.checked)}
                    />
                </Form.Item>
                <Form.Item name="cordinate" label="Bản đồ">
                    <Flex vertical>
                        <Button onClick={handleGetCordinate}>Lấy tọa độ</Button>
                        <Text>Kinh độ: {longitude}</Text>
                        <Text>Vĩ độ: {latitude}</Text>
                    </Flex>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddAddressPopup;
