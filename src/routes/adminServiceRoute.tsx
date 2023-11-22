import { Route } from "react-router-dom";
import ErrorBoundaryRoutes from "../core/errors/error-boundary-routes";
import SystemService from "../admin/SystemService/SystemService";
import Service from "../admin/SystemService/Service/Service";

const AdminServiceRoute = () => {
    return (
        <ErrorBoundaryRoutes>
            <Route index element={<SystemService />} />
            <Route path=":skillId" element={<Service />} />
        </ErrorBoundaryRoutes>
    );
};

export default AdminServiceRoute;
