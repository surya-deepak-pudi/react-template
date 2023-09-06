import { Button } from "@mui/material"
import React, { Component } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { UseMemoSample } from "."

const Fallback = ({ error, resetErrorBoundary }) => {
    console.log({ error, resetErrorBoundary })
    return (
        <div>
            <h2>Oops! Something went wrong.</h2>
            <p>Please try again later.</p>
            <UseMemoSample></UseMemoSample>
            <Button onClick={resetErrorBoundary}></Button>
        </div>
    )
}

// Example usage of the ErrorBoundary component
class SampleApp extends Component {
    render() {
        return (
            <div>
                <h1>My React Application</h1>
                {/* Wrap the component you want to catch errors for with the ErrorBoundary */}
                <ErrorBoundary FallbackComponent={Fallback}>
                    <ChildComponent />
                </ErrorBoundary>
            </div>
        )
    }
}

class ChildComponent extends Component {
    // Simulate an error
    componentDidMount() {
        // Uncomment this line to trigger an error
        throw new Error("This is a simulated error.")
        setTimeout(() => {
            // throw new Error("This is a simulated error.")
        }, 1000)
    }

    render() {
        return <p>This is a child component.</p>
    }
}

export default SampleApp
