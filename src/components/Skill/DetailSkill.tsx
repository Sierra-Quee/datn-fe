import { Modal } from "antd";
import { ISkill } from "../../utils/model";

interface IDetailSkillProps {
    isOpenPanel: boolean;
    handleConfirmPanel?: () => void;
    info?: ISkill | null;
}
export const DetailSkill = (props: IDetailSkillProps) => {
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
            <img src={info?.imageUrl} alt="Not image" />
            <p style={{ display: "block", textAlign: "center" }}>
                Name: {info?.name}
            </p>
            <p>Ngày được tạo: {info?.createdAt?.slice(0, 10)}</p>
            <p>Ngày cập nhật: {info?.updatedAt?.slice(0, 10)}</p>
        </Modal>
    );
};
