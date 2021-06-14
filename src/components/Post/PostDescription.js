import React from 'react';
import PropTypes from 'prop-types';

const PostDescription = ({ caption, username }) => {
  return (
    <div className="p-4 pt-2 pb-1">
      <span className="mr-1 font-bold">{username}</span>
      <span>{caption}</span>
    </div>
  );
};
PostDescription.propTypes = {
  caption: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
export default PostDescription;
