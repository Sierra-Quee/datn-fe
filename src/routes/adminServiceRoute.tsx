import { Route } from "react-router-dom";
import ErrorBoundaryRoutes from "../core/errors/error-boundary-routes";
import SystemService from "../components/SystemService/SystemService";
import Service from "../components/SystemService/Service/Service";

const AdminServiceRoute = () => {
    return (
        <ErrorBoundaryRoutes>
            <Route index element={<SystemService />} />
            <Route path=":skillId" element={<Service />} />
        </ErrorBoundaryRoutes>
    );
};

export default AdminServiceRoute;
