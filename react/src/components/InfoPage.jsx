import React from "react";
import { Box, Avatar } from "@material-ui/core";
import Error from "@material-ui/icons/Error";


export default function InfoPage({ text }) {
    return (
        <div style={{ paddingTop: 50 }}>
            <Box component="span" m={1} display="flex" justifyContent="center">
                <Avatar>
                    <Error />
                </Avatar>
            </Box>
            <Box component="span" m={1} display="flex" justifyContent="center">
                <p style={{ maxWidth: 400 }}>{text}</p>
            </Box>
        </div>
    );
}
