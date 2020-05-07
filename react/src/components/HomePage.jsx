import React from "react";
import { Box, Typography, Avatar } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";

export default function HomePage() {

    return (
        <div>
            <Box component="span" m={1} display="flex" justifyContent="center">
                <Avatar>
                    <HomeIcon />
                </Avatar>
            </Box>
            <Box component="span" m={1} display="flex" justifyContent="center">
                <Typography variant="h5" style={{ textAlign: "center" }}>
                    Welcome!
                </Typography>
            </Box>
            <Box component="span" m={1} display="flex" justifyContent="center">
                <Typography variant="h5" style={{ textAlign: "center" }}>
                    To the product manager.
                </Typography>
            </Box>
            <Box component="span" m={1} display="flex" justifyContent="center">
                <Typography variant="subtitle1" style={{ textAlign: "center" }}>
                    Please choose menu option.
                </Typography>
            </Box>
        </div>
    );
}
