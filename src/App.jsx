import React from "react"
import { Users } from "./pages"
import {
    UseCallbackSample,
    MemoSample,
    UseMemoSample,
    CustomErrorBoundary,
    ImportedErrorBoundary,
} from "./samples"

const App = () => {
    return (
        <div>
            <ImportedErrorBoundary />
        </div>
    )
}

export default App
