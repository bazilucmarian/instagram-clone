import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  updateLoggedInUserFollowing,
  updateFollowedUserFollowers,
} from '../services/firebase';

const SuggestedProfile = ({
  profileDocId,
  username,
  profileId,
  userId,
  loggedInUserDocId,
}) => {
  const [followed, setFollowed] = useState(false);

  const handleFollowUser = async () => {
    setFollowed(true);
    // create 2 firebase functions
    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
    // update the following array in the logged in user (in this case, my profile)
    await updateFollowedUserFollowers(profileDocId, userId, false);
    // update the followers array of the user who has been followed
  };

  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center">
        <img
          className="rounded-full flex w-8 mr-3"
          src={`/images/avatars/${username}.jpg`}
          alt=""
        />
        <Link to={`/p/${username}`}>
          <p className="font-bold text-sm">{username}</p>
        </Link>
      </div>

      <button
        className="text-xs font-bold text-blue-medium"
        type="button"
        onClick={handleFollowUser}
      >
        Follow
      </button>
    </div>
  ) : (
    ''
  );
};
SuggestedProfile.propTypes = {
  profileDocId: PropTypes.string,
  username: PropTypes.string,
  profileId: PropTypes.string,
  userId: PropTypes.string,
  loggedInUserDocId: PropTypes.string,
};
export default SuggestedProfile;
