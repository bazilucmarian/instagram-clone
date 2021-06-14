import React, { useContext } from 'react';
import LoggedInUserContext from '../context/logged-in-user';
import User from './User';
import Suggestions from './Suggestions';

const Sidebar = () => {
  const {
    activeUser: { docId = '', fullName, username, userId, following } = {},
  } = useContext(LoggedInUserContext);

  return (
    <div className="p-4">
      <User username={username} fullname={fullName} />
      <Suggestions
        userId={userId}
        following={following}
        loggedInUserDocId={docId}
      />
    </div>
  );
};

export default Sidebar;
