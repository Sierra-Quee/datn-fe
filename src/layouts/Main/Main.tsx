import { ReactNode } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import "./Main.scss";

export interface MainProps {
    children: ReactNode;
}

const Main = ({ children }: MainProps) => {
    return (
        <div className="main">
            <div className="_sidebar">
                <Sidebar />
            </div>
            <div className="_main">
                <div className="_navbar">
                    <Navbar />
                </div>
                <div className="_main_child">{children}</div>
            </div>
        </div>
    );
};

export default Main;
