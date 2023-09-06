import { Box, TextField, Typography } from "@mui/material"
import React, { memo, useMemo, useState } from "react"

//when to use memeo:
//pure functional component
//renders often
//always same props are provided which makes it rerender
//the component contains medium ot big size of props

const MemoSample = () => {
    const [numeral, setNumeral] = useState("10")
    const [name, setName] = useState("Surya")

    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    const handleValueChange = (e) => {
        setNumeral(e.target.value)
    }

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
            <MemoizedComp dependency={numeral} memo={true}></MemoizedComp>
            <NonMemoComp dependency={numeral} memo={false}></NonMemoComp>
        </Box>
    )
}

const NonMemoComp = ({ dependency, memo }) => {
    console.log(`${!memo ? "non" : ""}memoized component rendered`)
    return <Typography> dependency changed to {dependency}</Typography>
}

const MemoizedComp = memo(NonMemoComp)

export default MemoSample
