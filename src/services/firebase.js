import { firebase, FieldValue } from '../lib/firebase';

export const doesUsernameExist = async (username) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.map((user) => user.data().length > 0);
};

export const getUserByUsername = async (username) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();
  const user = result.docs.map((item) => ({ ...item.data(), docId: item.id }));
  return user;
};

export const createUser = async ({ emailAddress, password }) => {
  return await firebase
    .auth()
    .createUserWithEmailAndPassword(emailAddress, password);
};

export const updateCollectionWithNewUser = async ({
  id,
  username,
  fullname,
  emailAddress,
}) => {
  return await firebase.firestore().collection('users').add({
    userId: id,
    username: username.toLowerCase(),
    fullname,
    emailAddress: emailAddress.toLowerCase(),
    following: [],
    dateCreated: Date.now(),
  });
};

// get user from the firestore where userId ===  userId provided by auth
export const getUserByUserId = async (userId) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get();
  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return user;
};

export const getSuggestedProfiles = async (userId, following) => {
  const result = await firebase.firestore().collection('users').limit(10).get();
  return result.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter(
      (profile) =>
        profile.userId !== userId && !following.includes(profile.userId)
    );
};

// update the currentUser which is logged in following array
export async function updateLoggedInUserFollowing(
  loggedInUserDocId, //currently logged in bazilucmarian
  profileId, // the user that marian requests to follow
  isFollowingProfile // true/false (am i currently following this person?)
) {
  console.log(loggedInUserDocId);
  console.log(profileId);
  console.log(isFollowingProfile);
  return firebase
    .firestore()
    .collection('users')
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId),
    });
}

// update the user who was unfollowed by someone
export const updateFollowedUserFollowers = async (
  profileDocId,
  userId,
  isFollowingProfile
) => {
  return firebase
    .firestore()
    .collection('users')
    .doc(profileDocId)
    .update({
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(userId)
        : FieldValue.arrayUnion(userId),
    });
};

export const getPhotos = async (userId, following) => {
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', 'in', following)
    .get();
  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }
      const user = await getUserByUserId(photo.userId);
      const { username } = user[0];

      return { username, ...photo, userLikedPhoto };
    })
  );

  return photosWithUserDetails;
};

// export const getUserIdByUsername=(username)=>{
//   const result=await firebase.firestore()

// }

export const getUserPhotosByUsername = async (username) => {
  const [{ userId }] = await getUserByUsername(username);

  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', '==', userId)
    .get();

  const photos = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return photos;
};

export const isUserFollowingProfile = async (
  loggedInUserUsername,
  profileUserId
) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', loggedInUserUsername)
    .where('following', 'array-contains', profileUserId)
    .get();
  const [response = {}] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
  return response.userId;
};

export const toggleFollow = async (
  isFollowingProfile,
  activeUserDocId,
  profileDocId,
  profileUserId,
  followingUserId
) => {
  await updateLoggedInUserFollowing(
    activeUserDocId, //currently user ID logged in (marian)
    profileUserId, //the profile id of the user I am looking at (ex: raphael)
    isFollowingProfile //trie /false (am i currently following this peerson?)
  );
  await updateFollowedUserFollowers(
    profileDocId, //currrently logged in user documnet id (marian doc id)
    followingUserId, //the user id that marian request to follow
    isFollowingProfile //true/falsse
  );
};
