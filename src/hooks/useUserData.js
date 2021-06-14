import { useState, useEffect } from 'react';
import { getUserByUserId } from '../services/firebase';

export const useUserData = (userId) => {
  const [activeUser, setActiveUser] = useState({});

  useEffect(() => {
    const getUserObjByUserId = async () => {
      const [user] = await getUserByUserId(userId);

      setActiveUser(user || {});
    };
    if (userId) {
      getUserObjByUserId();
    }
  }, [userId]);

  return { activeUser, setActiveUser };
};
