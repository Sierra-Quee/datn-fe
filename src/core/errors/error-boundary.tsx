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
            const errorDetails = <div>{this.state.error.toString()}</div>;

            return (
                <div>
                    <h2>An unexpected error has occurred.</h2>
                    {errorDetails}
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
