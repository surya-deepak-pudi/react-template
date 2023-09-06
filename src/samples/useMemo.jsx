import { Box, TextField, Typography } from "@mui/material"
import React, { useMemo, useState } from "react"

const squareNumber = (num, from) => {
    console.log("square called from " + from)
    return num * num
}

const MemoSample = () => {
    const [numeral, setNumeral] = useState("10")
    const [name, setName] = useState("Surya")

    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    const handleValueChange = (e) => {
        setNumeral(e.target.value)
    }

    let nonMemoSquare = squareNumber(numeral, "normal")
    let memoSquare = useMemo(() => {
        return squareNumber(numeral, "useMemo")
    }, [numeral])

    return (
        <Box
            display="flex"
            flexDirection="column"
            gap="16px"
            width="100vw"
            alignItems={"center"}
        >
            <Typography variant="h3"> Memo example </Typography>
            <TextField
                value={name}
                label="non dependency"
                onChange={handleNameChange}
            ></TextField>
            <TextField
                value={numeral}
                label="dependency"
                onChange={handleValueChange}
            ></TextField>
            <Typography>nonMemoSquare:{nonMemoSquare}</Typography>
            <Typography>memoSquare:{memoSquare}</Typography>
        </Box>
    )
}

export default MemoSample
