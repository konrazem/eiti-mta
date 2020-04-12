import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import EmailIcon from "@material-ui/icons/Email";
import ErrorPage from './ErrorPage';


import {
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
} from "@material-ui/core";

const HOST =
    process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";

/**
 * @name Profile
 * @param {*} props
 */

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            profile: {
                id: "konradgrzyb@gmail.com",
                name: {
                    givenName: "Konrad",
                    familyName: "Grzyb",
                },
            },
            loaded: false,
            error: "",
        };
    }

    componentDidMount() {
        fetch(HOST + "/api/v1/user")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                return this.setState({
                    profile: data,
                    loaded: true,
                });
            })
            .catch((err) => {
                console.error(err);
                //set default data
                return this.setState({
                    error: err + "",
                });
            });
    }

    render() {
       const { profile, loaded, error } = this.state;

        if(error) {
            return <ErrorPage text="Server error while fetching user data" />
        }


        if (!loaded) {
            return <Loading text="Loading user data..." />;
        }

        /********************* RETURN PROFLE ******************** */
        let email = "";
        let name = "";
        let surname = "";

        if (profile.name) {
            email = profile.id;
            name = profile.name.givenName;
            surname = profile.name.familyName;
        }

        return (
            <div className="eiti-profile-wrapper">
                <List subheader="User Profile">
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <EmailIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Email" secondary={email} />
                    </ListItem>

                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <AssignmentIndIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Name" secondary={name} />
                    </ListItem>

                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <AssignmentIndIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Surname" secondary={surname} />
                    </ListItem>
                </List>
            </div>
        );
    }
}

export default Profile;
