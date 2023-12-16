import { Route } from "react-router-dom";
import ErrorBoundaryRoutes from "../core/errors/error-boundary-routes";
import { AdminAccessRoutes, RoutePath } from "../routes";
import { IRoutePath } from "../utils/model";
import { PrivateRoute } from "../core/auth/private-route";
import { Role } from "../core/auth/roles";
import SystemAdmin from "./User/SystemAdmin/SystemAdmin";

function AdminRoutes() {
    return (
        <ErrorBoundaryRoutes>
            {AdminAccessRoutes.map((route: IRoutePath) => {
                const Component = route.component;

                return (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={
                            <PrivateRoute
                                roles={[Role.ROLE_ADMIN, Role.ROLE_STAFF]}
                            >
                                <Component />
                            </PrivateRoute>
                        }
                    />
                );
            })}
            <Route
                path={RoutePath.Admin}
                element={
                    <PrivateRoute roles={[Role.ROLE_ADMIN]}>
                        <SystemAdmin />
                    </PrivateRoute>
                }
            />
        </ErrorBoundaryRoutes>
    );
}

export default AdminRoutes;
