import { Checkbox, Input, Modal, Select, Form } from "antd";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { ADDRESS_API } from "../../../utils/constants";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { IAddress } from "../../../utils/model";
import {
    createAddressAsync,
    getAllAddressAsync,
} from "../../../core/reducers/address";

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
            address: `${detailAddress}/${selectedWard}, ${selectedDistrict}, ${selectedProvince}`,
            latitude: 0,
            longitude: 0,
            userId: account.userId,
            isMainAddress,
        };

        try {
            await dispatch(createAddressAsync(data));
            props.close();
            await dispatch(getAllAddressAsync(account.userId));
        } catch (error) {}
    }, [selectedProvince, selectedDistrict, selectedWard, detailAddress]);
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
                    <Checkbox checked={isMainAddress} />
                </Form.Item>
                <Form.Item name="cordinate" label="Bản đồ">
                    <iframe
                        title="google-map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.631019022368!2d105.83993977498018!3d21.007422880636508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab8a922653a9%3A0x6c2ec19683313eab!2zMSDEkOG6oWkgQ-G7kyBWaeG7h3QsIELDoWNoIEtob2EsIEhhaSBCw6AgVHLGsG5nLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1699550440346!5m2!1svi!2s"
                        style={{ border: 0, height: 200, width: "100%" }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddAddressPopup;
