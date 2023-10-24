import { Navigate, PathRouteProps, useLocation } from "react-router-dom";
import { useAppSelector } from "../../components/redux/hook";

import ErrorBoundary from "../errors/error-boundary";
import { Role } from "./roles";
import { isNullOrEmptyOrUndefined } from "../../utils/utils";
import Main from "../../layouts/Main/Main";

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
            return (
                <ErrorBoundary>
                    <Main>{children}</Main>
                </ErrorBoundary>
            );
        }

        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    fontSize: "20px",
                    fontStyle: "italic",
                }}
            >
                You are not authorized to access this page
            </div>
        );
    }

    return <Navigate to="/login" replace state={{ from: location }} />;
};

export const hasAnyAuthorized = (role: Role, roles: Role[]): boolean => {
    if (!isNullOrEmptyOrUndefined(role)) {
        if (roles.length === 0) {
            return true;
        }
        return roles.includes(role);
    }
    return false;
};
