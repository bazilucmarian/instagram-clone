import React, { useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import LoggedInUserContext from '../context/logged-in-user';
import usePhotos from '../hooks/usePhotos';
import Post from './Post/index.js';
// we need to get the logged in user's photo
// on loading the pphotos we need to use react skeleton
// if we have photos, render them and create a post component
// if user has no photot, tell them to create some photos

const Timeline = () => {
  const { activeUser } = useContext(LoggedInUserContext);
  const { photos } = usePhotos(activeUser);

  return (
    <div className="container col-span-2">
      {!photos ? (
        <Skeleton className="mb-5" count={4} width={640} height={600} />
      ) : (
        photos.map((content) => <Post key={content.docId} content={content} />)
      )}
    </div>
  );
};

export default Timeline;
