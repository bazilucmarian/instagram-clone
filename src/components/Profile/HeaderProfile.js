import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { DEFAULT_IMAGE_PATH } from '../../constants/paths';
import Skeleton from 'react-loading-skeleton';
import { useUserData } from '../../hooks/useUserData';
import { isUserFollowingProfile, toggleFollow } from '../../services/firebase';
import UserContext from '../../context/userContext';

const HeaderProfile = ({
  photosCount,
  followerCount,
  setFollowerCount,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    following,
    followers,
    username: profileUsername,
    fullName,
  },
}) => {
  const { user: loggedInUser } = useContext(UserContext);
  const { activeUser: user } = useUserData(loggedInUser?.uid);

  const [isFollowingProfile, setIsFollowingProfie] = useState(false);

  const activeBtnFollow = user?.username && user?.username !== profileUsername;

  useEffect(() => {
    const amIFollowingThisProfile = async () => {
      const isFollowing = await isUserFollowingProfile(
        user.username,
        profileUserId
      );
      setIsFollowingProfie(!!isFollowing);
    };

    if (user?.username && profileUserId) {
      amIFollowingThisProfile();
    }
  }, [user.username, profileUserId]);

  const handleToggleFollow = async () => {
    setIsFollowingProfie((isFollowingProfile) => !isFollowingProfile);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1,
    });
    await toggleFollow(
      isFollowingProfile,
      user.docId,
      profileDocId,
      profileUserId,
      user.userId
    );
  };

  return !profileUsername ? (
    <Skeleton count={1} width={800} height={200} />
  ) : (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center items-center">
        <img
          src={`/images/avatars/${profileUsername}.jpg`}
          alt={`${profileUsername} profile pic w-40 flex`}
          className="rounded-full h-40"
          onError={(e) => {
            e.target.src = DEFAULT_IMAGE_PATH;
          }}
        />
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-3">{profileUsername}</p>

          {activeBtnFollow && (
            <button
              className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
              type="button"
              onClick={handleToggleFollow}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleToggleFollow();
                }
              }}
            >
              {isFollowingProfile ? 'Unfollow' : 'Follow'}
            </button>
          )}
        </div>
        <div className="container flex mt-4">
          {!followers || !following ? (
            <Skeleton count={1} width={677} height={24} />
          ) : (
            <>
              <p className="mr-10">
                <span className="font-bold">{photosCount} photos</span>
              </p>
              <p className="mr-10">
                <span className="font-bold">
                  {followerCount}
                  {'  '}
                  {followerCount === 1 ? 'follower' : 'followers'}
                </span>
              </p>
              <p className="mr-10">
                <span className="font-bold">{following.length} following</span>
              </p>
            </>
          )}
        </div>

        <div className="container mt-4">
          <p className="font-medium">
            {!fullName ? (
              <Skeleton count={1} width={337} height={24} />
            ) : (
              fullName
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

HeaderProfile.propTypes = {
  photosCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
  setFollowerCount: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    docId: PropTypes.string,
    userId: PropTypes.string,
    fullName: PropTypes.string,
    following: PropTypes.array,
    followers: PropTypes.array,
  }).isRequired,
};
export default HeaderProfile;
