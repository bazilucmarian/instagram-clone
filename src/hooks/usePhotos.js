import { useState, useEffect } from 'react';
import { getPhotos } from '../services/firebase';

const usePhotos = (activeUser) => {
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    const getTimeLinePhotos = async () => {
      // check if the user actually follow people
      if (activeUser?.following?.length > 0) {
        const followedUserPhotos = await getPhotos(
          activeUser.userId,
          activeUser.following
        );
        // sort by date (newest first)
        followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
        setPhotos(followedUserPhotos);
      }
    };

    getTimeLinePhotos();
  }, [activeUser?.following, activeUser?.userId]);

  return { photos };
};

export default usePhotos;
