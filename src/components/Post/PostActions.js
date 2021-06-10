import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import FirebaseContext from '../../context/firebaseContext';
import UserContext from '../../context/userContext';
import LikeIcon from '../../icons/LikeIcon';
import CommentIcon from '../../icons/CommentIcon';

const PostActions = ({ docId, totalLikes, likedPhoto, handleFocus }) => {
  const {
    user: { uid: userId = '' },
  } = useContext(UserContext);
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const [isLiked, setIsLiked] = useState(likedPhoto);
  const [likes, setLikes] = useState(totalLikes);

  const handleToggleLiked = async () => {
    setIsLiked((isLiked) => !isLiked);

    await firebase
      .firestore()
      .collection('photos')
      .doc(docId)
      .update({
        likes: isLiked
          ? FieldValue.arrayRemove(userId)
          : FieldValue.arrayUnion(userId),
      });
    setLikes((likes) => (isLiked ? likes - 1 : likes + 1));
  };

  return (
    <>
      <div className="flex justify-between p-4">
        <div className="flex">
          <LikeIcon
            handleToggleLiked={handleToggleLiked}
            toggleLiked={isLiked}
            color="black"
          />
          <CommentIcon handleFocus={handleFocus} color="black" />
        </div>
      </div>
      <div className="p-4 py-0">
        <p className="font-bold">
          {likes === 1 ? `${likes} like` : `${likes} likes`}
        </p>
      </div>
    </>
  );
};

PostActions.propTypes = {
  docId: PropTypes.string.isRequired,
  totalLikes: PropTypes.number.isRequired,
  likedPhoto: PropTypes.bool.isRequired,
  handleFocus: PropTypes.func.isRequired,
};
export default PostActions;
