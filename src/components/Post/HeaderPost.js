import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const HeaderPost = ({ username }) => {
  return (
    <div className="flex border-b border-gray-primary h-4 p-4 py-8">
      <div className="flex items-center">
        <Link to={`/p/${username}`} className="flex items-center">
          <img
            className="rounded-full h-8 w-8 flex mr-3"
            alt={`${username} pic`}
            src={`/images/avatars/${username}.jpg`}
          />
          <p className="font-bold">{username}</p>
        </Link>
      </div>
    </div>
  );
};
HeaderPost.propTypes = {
  username: PropTypes.string.isRequired,
};
export default HeaderPost;
