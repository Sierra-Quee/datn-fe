import { IMalfunction } from "../../../utils/model";

interface IUpdateMalfunctionProps {
    isOpen: boolean;
    close: () => void;
    malfunctionUpdate?: IMalfunction | null | undefined;
    isCreate: boolean;
    handleGetAllMalfuntionAsync: () => void;
    serviceId: string | number;
}
const UpdateMalfunction = (props: IUpdateMalfunctionProps) => {
    const {
        isOpen,
        close,
        malfunctionUpdate,
        isCreate,
        handleGetAllMalfuntionAsync,
        serviceId,
    } = props;
    return <></>;
};
export default UpdateMalfunction;
