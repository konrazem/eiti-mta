import React from "react";
import AlertDialog from "./AlertDialog";
import { Button, ButtonGroup, Toolbar, Typography } from "@material-ui/core";

export default function ProductToolbarDelete({
    title,
    handleEditClick,
    handleDeleteClick,
}) {
    return (
        <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
                {title}
            </Typography>
            <ButtonGroup
                color="primary"
                aria-label="outlined primary button group"
            >
                <Button onClick={handleEditClick}>Edit</Button>
                <AlertDialog
                    text="Delete"
                    title="Are you sure you want to delete this product?"
                    handleAgree={handleDeleteClick}
                />
            </ButtonGroup>
        </Toolbar>
    );
}
