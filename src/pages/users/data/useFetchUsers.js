import { useAPICall } from "Hooks"
import { defaultError } from "Utils/errors"
import { fetchUsersAPI } from "Utils/api"

const useFetchUsers = () => {
    const { data, setData, setError, error, isLoading, callAPI } = useAPICall()

    const defaultFallback = () => {
        setError(defaultError)
    }

    const statuses = [
        {
            status_id: 200,
            status_txt: "OK",
            callBack: (res) => {
                setData(res.data)
            },
        },
    ]

    const fetchUsers = () => {
        callAPI({
            url: fetchUsersAPI,
            defaultFallback,
            statuses,
        })
    }

    return {
        users: data,
        usersLoading: isLoading,
        usersError: error,
        fetchUsers,
    }
}

export default useFetchUsers
