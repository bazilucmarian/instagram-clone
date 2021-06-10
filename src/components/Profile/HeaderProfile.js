import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { useUserData } from '../../hooks/useUserData';
import { isUserFollowingProfile, toggleFollow } from '../../services/firebase';

const HeaderProfile = ({
  photosCount,
  followerCount,
  setFollowerCount,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    following = [],
    followers = [],
    username: profileUsername,
    fullName,
  },
}) => {
  const { activeUser } = useUserData();
  const [isFollowingProfile, setIsFollowingProfie] = useState(false);
  const activeBtnFollow =
    activeUser.username && activeUser.username !== profileUsername;

  useEffect(() => {
    const amIFollowingThisProfile = async () => {
      const isFollowing = await isUserFollowingProfile(
        activeUser.username,
        profileUserId
      );
      setIsFollowingProfie(!!isFollowing);
    };

    if (activeUser.username && profileUserId) {
      amIFollowingThisProfile();
    }
  }, [activeUser.username, profileUserId]);

  const handleToggleFollow = async () => {
    setIsFollowingProfie((isFollowingProfile) => !isFollowingProfile);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1,
    });
    await toggleFollow(
      isFollowingProfile,
      activeUser.docId,
      profileDocId,
      profileUserId,
      activeUser.userId
    );
  };

  return !profileUsername ? (
    <Skeleton count={1} width={800} height={200} />
  ) : (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center">
        <img
          src={`/images/avatars/${profileUsername}.jpg`}
          alt={`${profileUsername} profile pic w-40 flex`}
          className="rounded-full h-40"
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
          {followers === undefined || following === undefined ? (
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
