import { Modal } from "antd";
import "./DetailOrder.scss";
import { IOrder } from "../../../utils/model";
import { convertOrderStatus } from "../../../utils/functions/utils";

interface IDetailOrderProps {
    isOpenPanel: boolean;
    handleConfirmPanel?: () => void;
    info?: IOrder | null;
}
const DetailOrder = (props: IDetailOrderProps) => {
    const { isOpenPanel, handleConfirmPanel, info } = props;
    return (
        <Modal
            open={isOpenPanel}
            onOk={handleConfirmPanel}
            onCancel={handleConfirmPanel}
            footer={(_, { OkBtn }) => (
                <div className="button-detail">
                    <OkBtn />
                </div>
            )}
        >
            <div
                style={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    textAlign: "center",
                    alignItems: "center",
                }}
            >
                <h2>Thông tin chi tiết của đơn hàng</h2>
                <div
                    style={{
                        padding: "5px 10px",
                        backgroundColor: "#e0e0e0",
                        borderRadius: "5px",
                    }}
                >
                    {convertOrderStatus(info?.status ?? -1)}
                </div>
            </div>
            {/* <p>
                Họ và tên: {info?.firstName} {info?.lastName}
            </p>
            <p>
                Giới tính: {info?.gender ? "Nam" : "Nữ"} - Ngày/ tháng/ năm
                sinh: {info?.dob}
            </p>
            <p>Số điện thoại: {info?.phone}</p>
            <p>Email: {info?.email}</p>
            <div>Địa chỉ:</div>
            <p>Ngày được tạo: {info?.createdAt.slice(0, 10)}</p>
            <p>Ngày cập nhật: {info?.updatedAt.slice(0, 10)}</p> */}
        </Modal>
    );
};

export default DetailOrder;
