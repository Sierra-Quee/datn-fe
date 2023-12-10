import { Route } from "react-router-dom";
import Service from "../admin/SystemService/Service/Service";
import SystemService from "../admin/SystemService/SystemService";
import ErrorBoundaryRoutes from "../core/errors/error-boundary-routes";

const AdminServiceRoute = () => {
    return (
        <ErrorBoundaryRoutes>
            <Route index element={<SystemService />} />
            <Route path=":skillId" element={<Service />} />
        </ErrorBoundaryRoutes>
    );
};

export default AdminServiceRoute;
