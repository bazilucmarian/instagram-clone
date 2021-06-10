import { useState, useContext, useEffect } from 'react';
import UserContext from '../context/userContext';
import { getUserByUserId } from '../services/firebase';

export const useUserData = () => {
  const [activeUser, setActiveUser] = useState({});
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getUserObjByUserId = async () => {
      const [response] = await getUserByUserId(user.uid);
      setActiveUser(response);
    };
    if (user?.uid) {
      getUserObjByUserId();
    }
  }, [user]);

  return { activeUser };
};
