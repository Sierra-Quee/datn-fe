import { Modal } from "antd";
import { IUser } from "../../../utils/model";
import { Role } from "../../../core/auth/roles";
import "./DetailUser.scss";

interface IDetailUserProps {
    isOpenPanel: boolean;
    handleConfirmPanel?: () => void;
    info?: IUser | null;
}
export const DetailUser = (props: IDetailUserProps) => {
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
                <h2>Thông tin chi tiết của {info?.accountName}</h2>
                <div
                    style={{
                        padding: "5px 10px",
                        backgroundColor: "#e0e0e0",
                        borderRadius: "5px",
                    }}
                >
                    {info?.role === Role.ROLE_USER
                        ? "Khách hàng"
                        : info?.skills.join(" ,")}
                </div>
            </div>
            <img src={info?.imageUrl} alt="Not image" />
            <p>
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
            <p>Ngày cập nhật: {info?.updatedAt.slice(0, 10)}</p>
        </Modal>
    );
};
