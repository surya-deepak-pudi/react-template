import { Box, TextField, Typography } from "@mui/material"
import React, { useCallback, useState, memo } from "react"

const CallbackSample = () => {
    const [value, setValue] = useState("10")
    const [name, setName] = useState("Surya")

    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    const handleValueChange = (e) => {
        setValue(e.target.value)
    }

    const getCallBackValue = useCallback(() => {
        return "The useCallback value is " + value
    }, [value])

    const getNormalValue = () => {
        return "The normal value is " + value
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            gap="16px"
            width="100vw"
            alignItems={"center"}
        >
            <Typography variant="h3"> Callback example </Typography>
            <TextField
                value={value}
                label="dependency"
                onChange={handleValueChange}
            ></TextField>
            <TextField
                value={name}
                label="non dependency"
                onChange={handleNameChange}
            ></TextField>
            <ChildComponent
                getValue={getCallBackValue}
                from="callback"
            ></ChildComponent>
            <ChildComponent
                getValue={getNormalValue}
                from="nonCallback"
            ></ChildComponent>
        </Box>
    )
}

const ChildComponent = memo(({ getValue }) => {
    console.log(getValue())
    return <Typography>{getValue()}</Typography>
})

export default CallbackSample
