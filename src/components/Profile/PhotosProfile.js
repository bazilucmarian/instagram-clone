import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import CommentIcon from '../../icons/CommentIcon';
import LikeIcon from '../../icons/LikeIcon';

const PhotosProfile = ({ photos }) => {
  return (
    <div className="h-16 border-gray-primary mt-12 pt-4">
      <div className="grid grid-cols-3 gap-8 mt-4 mb-12">
        {!photos ? (
          <>
            <Skeleton count={12} width={320} height={400} />
          </>
        ) : photos.length > 0 ? (
          photos.map((photo) => (
            <div key={photo.docId} className="relative group">
              <img src={photo.imageSrc} alt={photo.caption} />
              <div
                className="absolute bottom-0 left-0 bg-gray-200 z-10 w-full
               justify-evenly flex items-center h-full bg-black-faded group-hover:flex hidden"
              >
                <p className="flex items-center text-white font-bold">
                  <LikeIcon color="white" />
                  {photo.likes.length}
                </p>
                <p className="flex items-center text-white">
                  <CommentIcon color="white" />
                  {photo.comments.length}
                </p>
              </div>
            </div>
          ))
        ) : null}
      </div>
      {!photos ||
        (photos.length === 0 && (
          <p className="text-center text-2xl">No posts yet</p>
        ))}
    </div>
  );
};
PhotosProfile.propTypes = {
  photos: PropTypes.array.isRequired,
};

export default PhotosProfile;
