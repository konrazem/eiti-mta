import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import { UserConsumer } from '../context';
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, ListSubheader } from '@material-ui/core';
import { Box } from '@material-ui/core';

import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import EmailIcon from '@material-ui/icons/Email';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
   root: {
      padding: theme.spacing(3, 2),
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
   }
}));

const Profile = props => {

   const [data, setData] = useState(null);

   useEffect(() => {
      const _data = {
         id: 'konradgrzyb@gmail.com',
         name: {
            givenName: 'Konrad',
            familyName: 'Grzyb',
         }
      }

      if (process.env.NODE_ENV === 'development') {

         setTimeout(() => {
            setData(_data)
         }, 2000)

      } else {

         fetch('/api/user')
            .then(res => res.json())
            .then(data => setData(data))
      }

   }, [data]);

   if (!data) {

      return <Loading />

   }

   return (<UserConsumer>
      {context => {

         const unknown = context.text.unknown;
         const email = data.id || unknown;
         const name = data.name ? data.name.givenName : unknown;
         const surname = data.name ? data.name.familyName : unknown;

         return (
            <div className="eiti-profile-wrapper">
               <List subheader={<ListSubheader>{context.text.profile}</ListSubheader>}>

                  <ListItem>
                     <ListItemAvatar>
                        <Avatar>
                           <EmailIcon />
                        </Avatar>
                     </ListItemAvatar>
                     <ListItemText primary={context.text.email} secondary={email} />
                  </ListItem>

                  <ListItem>
                     <ListItemAvatar>
                        <Avatar>
                           <AssignmentIndIcon />
                        </Avatar>
                     </ListItemAvatar>
                     <ListItemText primary={context.text.name} secondary={name} />
                  </ListItem>

                  <ListItem>
                     <ListItemAvatar>
                        <Avatar>
                           <AssignmentIndIcon />
                        </Avatar>
                     </ListItemAvatar>
                     <ListItemText primary={context.text.surname} secondary={surname} />
                  </ListItem>

               </List>
            </div>)
      }}
   </UserConsumer>)

}

export default Profile;