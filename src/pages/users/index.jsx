//react imports
import React from "react"
// DS component imports
import { Box } from "@mui/system"
import {
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
    Button,
    Skeleton,
} from "@mui/material"
//a data hook to fetch all the users
import useFetchUsers from "./data/useFetchUsers"

//a helper component ideal to be placed as a molecule as it can be reused
const ListSkeleton = () => {
    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Skeleton
                    variant="circular"
                    width="30px"
                    height="30px"
                ></Skeleton>
            </ListItemAvatar>
            <ListItemText
                primary={<Skeleton width="150px"></Skeleton>}
                secondary={
                    <React.Fragment>
                        <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            <Skeleton width="300px"></Skeleton>
                        </Typography>
                    </React.Fragment>
                }
            />
        </ListItem>
    )
}

//actual component
const Users = () => {
    //hook calls
    const { users, usersError, usersLoading, fetchUsers } = useFetchUsers()
    //handler functions
    const onClickHandler = () => {
        fetchUsers()
    }
    return (
        <Box>
            {/* success case */}
            <Typography data-testid="user-title">Users</Typography>
            {users ? (
                <Box data-testid="user-list">
                    {users.map((user) => (
                        <ListItem
                            alignItems="flex-start"
                            data-testid="user-list-item"
                        >
                            <ListItemAvatar>
                                <Avatar
                                    alt={user.first_name}
                                    src={user.avatar}
                                    data-testid="user-list-avatar"
                                />
                            </ListItemAvatar>
                            <ListItemText
                                data-testid="user-list-text"
                                primary={user.first_name + " " + user.last_name}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: "inline" }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {user.email}
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    ))}
                </Box>
            ) : null}
            {/* error case */}
            {usersError ? (
                <Box data-testid="user-error">{usersError}</Box>
            ) : null}
            {/* loading case */}
            {usersLoading ? (
                <Box data-testid="user-loader-container">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <ListSkeleton data-testid="user-loader"></ListSkeleton>
                    ))}
                </Box>
            ) : null}
            {/* fetch button */}
            <Button
                variant="contained"
                data-testid="user-fetch-button"
                onClick={onClickHandler}
            >
                Fetch!
            </Button>
        </Box>
    )
}

export default Users
