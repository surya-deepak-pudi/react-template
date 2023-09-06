import React, { Component } from "react"

class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    componentDidCatch(error, errorInfo) {
        // You can log the error or send it to an error tracking service here
        console.error("Error:", error)
        console.error("Error Info:", errorInfo)

        // Update state to indicate that an error has occurred
        this.setState({ hasError: true })
    }

    render() {
        if (this.state.hasError) {
            // You can render a custom error message or a fallback UI
            return (
                <div>
                    <h2>Oops! Something went wrong.</h2>
                    <p>Please try again later.</p>
                </div>
            )
        }

        // If there's no error, render the children
        return this.props.children
    }
}

// Example usage of the ErrorBoundary component
class SampleApp extends Component {
    render() {
        return (
            <div>
                <h1>My React Application</h1>
                {/* Wrap the component you want to catch errors for with the ErrorBoundary */}
                <ErrorBoundary>
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
        // throw new Error("This is a simulated error.")
        setTimeout(() => {
            // throw new Error("This is a simulated error.")
        }, 1000)
    }

    render() {
        return <p>This is a child component.</p>
    }
}

export default SampleApp
