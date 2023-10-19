import { Navigate, PathRouteProps, useLocation } from "react-router-dom";
import { useAppSelector } from "../../feature/redux/hook";
import ErrorBoundary from "../errors/error-boundary";
import { Role } from "./roles";

interface IPrivateRouteProp extends PathRouteProps {
    children: React.ReactNode;
    roles: Role[];
}

export const PrivateRoute = ({
    children,
    roles,
    ...rest
}: IPrivateRouteProp) => {
    const { isAuthenticated, account } = useAppSelector(
        (state) => state.authentication
    );
    const isAuthorized = hasAnyAuthorized(account.role, roles);
    const location = useLocation();

    if (!children) {
        throw new Error(
            `A component needs to be specified for private route for path: ${rest.path}`
        );
    }

    if (isAuthenticated) {
        if (isAuthorized) {
            return <ErrorBoundary>{children}</ErrorBoundary>;
        }

        return <div>You are not authorized to access this page</div>;
    }

    return <Navigate to="/login" replace state={{ from: location }} />;
};

export const hasAnyAuthorized = (role: Role[], roles: Role[]): boolean => {
    if (role && role.length) {
        if (roles.length === 0) {
            return true;
        }
        return roles.some((rol) => role.includes(rol));
    }
    return false;
};
