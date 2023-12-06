import { Modal, Select } from "antd";
import { IOrder } from "../../../utils/model";
import { convertOrderStatus } from "../../../utils/functions/utils";

interface IChangeStatusOrderProps {
    isOpenPanel: boolean;
    handleConfirmPanel?: () => void;
    info?: IOrder | null;
}
const ChangeStatus = (props: IChangeStatusOrderProps) => {
    const { isOpenPanel, handleConfirmPanel, info } = props;
    const filterOption = (
        input: string,
        option?: { label: string; value: string }
    ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
    const onChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const onSearch = (value: string) => {
        console.log("search:", value);
    };
    return (
        <Modal
            open={isOpenPanel}
            onOk={handleConfirmPanel}
            onCancel={handleConfirmPanel}
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
                <h2>Thay đổi trạng thái của đơn hàng</h2>
            </div>
            <div>
                <div>Trạng thái hiện tại</div>
                <div>
                    <div>Trạng thái kế tiếp</div>
                    <Select
                        showSearch
                        placeholder="Select a person"
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={filterOption}
                        options={[
                            {
                                value: "Pending",
                                label: "Pending",
                            },
                            {
                                value: "Finding",
                                label: "Finding",
                            },
                            {
                                value: "Accepted",
                                label: "Accepted",
                            },
                            {
                                value: "Checked in",
                                label: "Checked in",
                            },
                            {
                                value: "Complete",
                                label: "Complete",
                            },
                        ]}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default ChangeStatus;
