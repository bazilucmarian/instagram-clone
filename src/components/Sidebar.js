import React from 'react';
import { useUserData } from '../hooks/useUserData';
import User from './User';
import Suggestions from './Suggestions';

const Sidebar = () => {
  const {
    activeUser: { docId, fullName, username, userId, following },
  } = useUserData();

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
