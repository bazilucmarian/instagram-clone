import React from 'react';
import Skeleton from 'react-loading-skeleton';
import usePhotos from '../hooks/usePhotos';
import Post from './Post/index.js';
// we need to get the logged in user's photo
// on loading the pphotos we need to use react skeleton
// if we have photos, render them and create a post component
// if user has no photot, tell them to create some photos

const Timeline = () => {
  const { photos } = usePhotos();

  return (
    <div className="container col-span-2">
      {!photos ? (
        <>
          {[...new Array(4)].map((_, index) => (
            <Skeleton
              className="mb-5"
              key={index}
              count={1}
              width={640}
              height={600}
            />
          ))}
        </>
      ) : photos?.length > 0 ? (
        photos.map((content) => <Post key={content.docId} content={content} />)
      ) : (
        <p className="text-center text-2xl">Follow people to see photos ! </p>
      )}
    </div>
  );
};

export default Timeline;
