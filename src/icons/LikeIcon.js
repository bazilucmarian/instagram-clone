import React from 'react';

const LikeIcon = ({
  handleToggleLiked = () => '',
  toggleLiked = false,
  color,
}) => {
  return (
    <svg
      onClick={handleToggleLiked}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          handleToggleLiked();
        }
      }}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      tabIndex={0}
      className={`w-8 mr-4 select-none cursor-pointer focus:outline-none ${
        toggleLiked ? 'fill-red text-red-primary' : `text-${color}-light`
      }
      }`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  );
};

export default LikeIcon;
