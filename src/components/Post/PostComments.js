import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import AddComment from './PostAddComment';

const PostComments = ({
  docId,
  comments: allComments,
  posted,
  commentInput,
}) => {
  const [comments, setComments] = useState(allComments);
  const [commentsSlice, setCommentsSlice] = useState(3);

  const showNextComments = () => {
    setCommentsSlice(commentsSlice + 3);
  };

  return (
    <>
      <div className="p-4 pt-1 pb-4">
        {/* {comments.length >= 3 && (
          <p className="text-sm text-gray-base mb-1 cursor-pointer">
            View all {comments.length} comments
          </p>
        )} */}
        {comments.slice(0, commentsSlice).map((item) => (
          <p key={`${item.comment}- ${item.displayName}`} className="mb-1">
            <Link to={`/profile/${item.displayName}`}>
              <span className="mr-1 font-bold">{item.displayName}</span>
            </Link>
            <span>{item.comment}</span>
          </p>
        ))}
        {comments.length >= 3 && commentsSlice < comments.length && (
          <button
            type="button"
            onClick={showNextComments}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                showNextComments();
              }
            }}
            className="text-sm text-gray-base mb-3 cursor-pointer focus:outline-none"
          >
            View more comments
          </button>
        )}
        <p className="text-gray-base uppercase text-xs">
          {formatDistance(posted, new Date())} ago
        </p>
      </div>
      <AddComment
        docId={docId}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
      />
    </>
  );
};
PostComments.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  posted: PropTypes.number.isRequired,
  commentInput: PropTypes.object.isRequired,
};
export default PostComments;
