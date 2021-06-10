import React, { useReducer, useEffect } from 'react';
import HeaderProfile from './HeaderProfile';
import PropTypes from 'prop-types';
import {
  getUserByUsername,
  getUserPhotosByUsername,
} from '../../services/firebase';
import PhotosProfile from './PhotosProfile';

const UserProfile = ({ user }) => {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    profile: {},
    photosCollection: [],
    followerCount: 0,
  };
  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const getProfileInfoAndPhotos = async () => {
      const photos = await getUserPhotosByUsername(user.username);

      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: user.followers.length,
      });
    };
    getProfileInfoAndPhotos();
  }, [user]);

  return (
    <>
      <HeaderProfile
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
      />
      <PhotosProfile photos={photosCollection} />
    </>
  );
};
UserProfile.propTypes = {
  user: PropTypes.shape({
    dateCreated: PropTypes.number.isRequired,
    emailAddress: PropTypes.string.isRequired,
    followers: PropTypes.array.isRequired,
    following: PropTypes.array.isRequired,
    fullName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};
export default UserProfile;
