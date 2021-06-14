import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { DEFAULT_IMAGE_PATH } from '../constants/paths';
import PropTypes from 'prop-types';

const User = ({ username, fullname }) => {
  return !username || !fullname ? (
    <Skeleton count={1} height={61} />
  ) : (
    <Link
      to={`/profile/${username}`}
      className="grid grid-cols-4 gap-4 mb-6 items-center"
    >
      <div className="flex items-center justify-between col-span-1">
        <img
          className="rounded-full w-16 flex mr-3"
          alt=""
          src={`/images/avatars/${username}.jpg`}
          onError={(e) => {
            e.target.src = DEFAULT_IMAGE_PATH;
          }}
        />
      </div>
      <div className="col-span-3">
        <p className="font-bold text-sm">{username}</p>
        <p className="text-sm">{fullname}</p>
      </div>
    </Link>
  );
};

User.propTypes = {
  username: PropTypes.string,
  fullname: PropTypes.string,
};

export default memo(User);
