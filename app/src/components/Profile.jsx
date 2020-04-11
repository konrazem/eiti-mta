import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import EmailIcon from "@material-ui/icons/Email";
import {
   List,
   ListItem,
   ListItemAvatar,
   ListItemText,
   Avatar
} from "@material-ui/core";


const HOST = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";


/**
 * @name Profile
 * @param {*} props
 */
const Profile = (props) => {

   const [data, setData] = useState({
      profile: {
         id: "konradgrzyb@gmail.com",
         name: {
            givenName: "Konrad",
            familyName: "Grzyb",
         },
      },
      loaded: false,
      error: ""
   });

   useEffect(() => {
      fetch(HOST + "/api/v1/user")
         .then((res) => {
            return res.json()
         })
         .then((data) => {

            return setData({
               profile: data,
               loaded: true
            });
         })
         .catch((err) => {
            console.error("Error when fetching profile data. ", err.message);
            //set default data
            return setData({
               loaded: true,
               error: err.message
            });
         });
   });


   if (!data.loaded) {
      return <Loading text="Loading user data..." />;
   }

   /********************* RETURN PROFLE ******************** */
   let email = "";
   let name = "";
   let surname = "";
   
   if (data.profile && data.profile.name) {
      email = data.profile.id;
      name = data.profile.name.givenName;
      surname = data.profile.name.familyName;
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
               <ListItemText
                  primary="Email"
                  secondary={email}
               />
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
               <ListItemText
                  primary="Surname"
                  secondary={surname}
               />
            </ListItem>
         </List>
      </div>
   );
};

export default Profile;
