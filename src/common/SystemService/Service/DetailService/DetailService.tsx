import { Modal } from "antd";
import { IService } from "../../../../utils/model";

interface IDetailServiceProps {
    isOpenPanel: boolean;
    handleConfirmPanel?: () => void;
    info?: IService | null;
}
const DetailService = (props: IDetailServiceProps) => {
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
                <h2>Thông tin chi tiết của {info?.name}</h2>
                <div
                    style={{
                        padding: "5px 10px",
                        backgroundColor: "#e0e0e0",
                        borderRadius: "5px",
                    }}
                >
                    {info?.isActive ? "Đang hoạt động" : "Đã xóa"}
                </div>
            </div>
            <div
                style={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                }}
            >
                <img
                    style={{ width: "360px", height: "250px" }}
                    src={info?.image}
                    alt="Not image"
                />
            </div>
            <h2 style={{ display: "block", textAlign: "center" }}>
                Tên: {info?.name} - Loại:{" "}
                {info?.type !== 2 ? "Bảo dưỡng" : "Sữa chữa"}
            </h2>
            <span>Mô tả công việc: {info?.desc}</span>
            <p>Ngày được tạo: {info?.createdAt.slice(0, 10)}</p>
            <p>Ngày cập nhật: {info?.updatedAt.slice(0, 10)}</p>
        </Modal>
    );
};

export default DetailService;
