import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/userContext';
import { getUserByUserId, getPhotos } from '../services/firebase';

const usePhotos = () => {
  const [photos, setPhotos] = useState(null);
  const {
    user: { uid: userId = '' },
  } = useContext(UserContext);

  useEffect(() => {
    const getTimeLinePhotos = async () => {
      const [{ following }] = await getUserByUserId(userId);

      let followedUserPhotos = [];
      // check if the user actually follow people
      if (following.length > 0) {
        followedUserPhotos = await getPhotos(userId, following);
      }
      // sort by date (newest first)
      followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
      setPhotos(followedUserPhotos);
    };

    getTimeLinePhotos();
  }, [userId]);

  return { photos };
};

export default usePhotos;
