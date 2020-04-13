import React from "react";
import { Box, Avatar } from "@material-ui/core";
import Error from "@material-ui/icons/Error";


export default function InfoPage({ text }) {
    return (
        <div>
            <Box component="span" m={1} display="flex" justifyContent="center">
                <Avatar>
                    <Error />
                </Avatar>
            </Box>
            <Box component="span" m={1} display="flex" justifyContent="center">
                <p>{text}</p>
            </Box>
        </div>
    );
}
