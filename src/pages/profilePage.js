import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getUserByUsername } from '../services/firebase';
import Header from '../components/Header';
import * as ROUTES from '../constants/routes';
import UserProfile from '../components/Profile/UserProfile';

const ProfilePage = () => {
  const { username } = useParams();
  const history = useHistory();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUserExists = async () => {
      const user = await getUserByUsername(username);
      if (user.length > 0) {
        setUser(user[0]);
      } else {
        history.push(ROUTES.NOT_FOUND);
      }
    };
    checkUserExists();
  }, [username, history]);

  return user?.username ? (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <UserProfile user={user} />
      </div>
    </div>
  ) : (
    ''
  );
};

export default ProfilePage;
