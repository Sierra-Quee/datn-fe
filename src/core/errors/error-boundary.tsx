import React from "react";

interface IErrorBoundaryProps {
    readonly children: React.ReactNode;
}

interface IErrorBoundaryState {
    readonly error: any;
    readonly errorInfo: any;
}

class ErrorBoundary extends React.Component<
    IErrorBoundaryProps,
    IErrorBoundaryState
> {
    constructor(props: IErrorBoundaryProps) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        this.setState({ error, errorInfo });
    }

    render(): React.ReactNode {
        if (this.state.errorInfo) {
            const errorDetails = <span>{this.state.error.toString()}</span>;

            return (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <span style={{ fontSize: "20px", fontStyle: "italic" }}>
                        An unexpected error has occurred. {errorDetails}
                    </span>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
