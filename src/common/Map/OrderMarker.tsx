import { Icon, LatLngExpression } from "leaflet";
import { Marker, Popup } from "react-leaflet";
import { IOrder } from "../../utils/model";

type Props = {
    order: IOrder;
};

const OrderMarker = ({ order }: Props) => {
    const color = order.repairmanId ? "#3333ff" : "#ff1a8c";
    const MARKER = `data:image/svg+xml;utf8,${encodeURIComponent(
        `<?xml version="1.0" encoding="iso-8859-1"?>
        <svg width="200px" height="200px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 13.3744C19.5318 14.0688 22 15.6547 22 17.5C22 19.9853 17.5228 22 12 22C6.47715 22 2 19.9853 2 17.5C2 15.6547 4.46819 14.0688 8 13.3744M12 17V3L17.3177 6.27244C17.7056 6.51114 17.8995 6.63049 17.9614 6.78085C18.0154 6.912 18.0111 7.0599 17.9497 7.18771C17.8792 7.33426 17.6787 7.44222 17.2777 7.65815L12 10.5" stroke="` +
            color +
            `" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
`
    )}`;
    const repairmanIcon = new Icon({
        iconUrl: MARKER,
        iconSize: [38, 38],
    });
    let position: LatLngExpression = [0, 0];
    // if (Array.isArray(repairman.address) && repairman.address.length > 0) {
    //     position =
    //         repairman.address[0].longitude && repairman.address[0].latitude
    //             ? [
    //                   repairman.address[0].latitude,
    //                   repairman.address[0].longitude,
    //               ]
    //             : [0, 0];
    // }

    if (order.address) {
        position =
            order.address.latitude && order.address.longitude
                ? [order.address.latitude, order.address.longitude]
                : [0, 0];
    }
    return (
        <Marker position={position} icon={repairmanIcon}>
            <Popup>{order.code}</Popup>
        </Marker>
    );
};

export default OrderMarker;
