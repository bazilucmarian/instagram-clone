import React from 'react';

const CommentIcon = ({ handleFocus = () => '', color }) => {
  return (
    <svg
      onClick={handleFocus}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          handleFocus();
        }
      }}
      className={`w-8 text-${color}-light select-none cursor-pointer focus:outline-none`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      tabIndex={0}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  );
};

export default CommentIcon;
