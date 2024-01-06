import React from "react";
import { Icon, LatLngExpression } from "leaflet";
import { Marker, Popup } from "react-leaflet";
import { IUser } from "../../utils/model";
import { UserStatus } from "../../core/reducers/users";
type Props = {
    repairman: IUser;
};

function RepairmanMarker({ repairman }: Props) {
    const color =
        repairman.status === UserStatus.ACTIVE ? "#009933" : "#ff1a1a";
    const MARKER = `data:image/svg+xml;utf8,${encodeURIComponent(
        `<?xml version="1.0" encoding="iso-8859-1"?>
        <svg fill="` +
            color +
            `" width="200px" height="200px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M65.3,51.5A14.25,14.25,0,1,0,79.5,65.8,14.32,14.32,0,0,0,65.3,51.5ZM67.8,67a3.09,3.09,0,0,1-1.1-.2l-5.4,5.4a1.71,1.71,0,0,1-1.1.5c-.5,0-.9-.1-1.1-.5a1.82,1.82,0,0,1,0-2.4l5.4-5.4a4.47,4.47,0,0,1,4-5.8,3.09,3.09,0,0,1,1.1.2c.2,0,.2.2.1.4l-2.5,2.4a.37.37,0,0,0,0,.6l1.6,1.6a.48.48,0,0,0,.7,0l2.4-2.4c.1-.1.5-.1.5.1a6.53,6.53,0,0,1,.2,1.1A4.47,4.47,0,0,1,67.8,67Z"></path><circle cx="44.6" cy="36.1" r="16.1"></circle><path d="M48.9,79.7c2.7,0,1.2-1.9,1.2-1.9h0a19.58,19.58,0,0,1-2.5-20.1l.2-.4a1.17,1.17,0,0,0-.9-1.9h0a18.48,18.48,0,0,0-2.4-.1,24.54,24.54,0,0,0-24.2,21c0,1.2.4,3.5,4.2,3.5H48.4A1.75,1.75,0,0,1,48.9,79.7Z"></path></g></svg>
    `
    )}`;
    const repairmanIcon = new Icon({
        iconUrl: MARKER,
        iconSize: [45, 45],
    });
    let position: LatLngExpression = [0, 0];
    if (Array.isArray(repairman.address) && repairman.address.length > 0) {
        position =
            repairman.address[0].longitude && repairman.address[0].latitude
                ? [
                      repairman.address[0].latitude,
                      repairman.address[0].longitude,
                  ]
                : [0, 0];
    }
    return (
        <Marker position={position} icon={repairmanIcon}>
            <Popup>
                {repairman.lastName} {repairman.firstName}
            </Popup>
        </Marker>
    );
}

export default RepairmanMarker;
