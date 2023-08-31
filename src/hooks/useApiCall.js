import { useState } from "react"
import axios from "axios"

import { METHODS, API_CALL_MODES } from "Utils/constants"

const useAPICall = (
    mode = API_CALL_MODES.DEFAULT,
    setCustomLoad = () => {},
    setCustomError = () => {},
    setCustomData = () => {},
    defaultData,
    defaultError
) => {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState(defaultData)
    const [error, setError] = useState(defaultError)
    const controller = new AbortController()

    const cancelCall = () => {
        controller.abort()
    }

    const callAPI = ({
        url = "",
        method = METHODS.GET,
        defaultFallback = () => {},
        statuses = [],
        body,
        config = {},
        params,
    }) => {
        if (mode === API_CALL_MODES.DEFAULT) {
            setIsLoading(true)
            setData(defaultData)
            setError(defaultError)
        } else {
            setCustomLoad(true)
            setCustomData(defaultData)
            setCustomError(defaultError)
        }
        const axiosConfigObject = {
            ...config,
            method,
            url,
            signal: controller.signal,
            data: body,
            headers: {
                ...(config.headers || {}),
            },
            params,
        }
        // API call
        axios(axiosConfigObject)
            .then((res) => {
                console.log({ res })
                if (res?.status && res?.statusText) {
                    let statusID = statuses.findIndex((status) => {
                        return (
                            res?.status === status?.status_id &&
                            (res?.statusText || "").toLowerCase() ===
                                (status?.status_txt || "").toLowerCase()
                        )
                    })
                    if (statusID >= 0) {
                        if (statuses[statusID]?.callBack) {
                            statuses[statusID].callBack(res.data)
                        } else {
                            console.log(
                                "callback is not available for the given status"
                            )
                            defaultFallback()
                        }
                    } else {
                        console.log("status not available")
                        defaultFallback()
                    }
                } else {
                    console.log("bad response structure")
                    defaultFallback()
                }
            })
            .catch((err) => {
                console.log("API error", err)
                defaultFallback()
            })
            .finally(() => {
                if (mode === API_CALL_MODES.DEFAULT) {
                    setIsLoading(false)
                } else {
                    setCustomLoad(false)
                }
            })
    }

    return {
        data,
        error,
        isLoading,
        setData,
        setError,
        setIsLoading,
        callAPI,
        cancelCall,
    }
}

export default useAPICall
