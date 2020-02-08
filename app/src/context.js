import React from 'react';
import text from './text';

const UserContext = React.createContext({ 
  text: text['en'],
});

export const UserProvider = UserContext.Provider
export const UserConsumer = UserContext.Consumer
export default UserContext