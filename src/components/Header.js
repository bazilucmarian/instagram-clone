import React, { useContext } from 'react';
import UserContext from '../context/userContext';
import FirebaseContext from '../context/firebaseContext';
import { DEFAULT_IMAGE_PATH } from '../constants/paths';
import * as ROUTES from '../constants/routes';
import { Link } from 'react-router-dom';
import HomeIcon from '../icons/HomeIcon';
import LogoutIcon from '../icons/LogoutIcon';
import { useUserData } from '../hooks/useUserData';

const Header = () => {
  const { user: loggedInUser } = useContext(UserContext); //fetch user from firebase auth
  const { activeUser } = useUserData(loggedInUser?.uid); //fetch userData (followers, following) based on id from firestore
  const { firebase } = useContext(FirebaseContext); //here we use firebase.auth().signOut()

  return (
    <header className="h-16 bg-white border-b border-gray-primary mb-8">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between items-center h-full ">
          <Link to={ROUTES.MAIN_PAGE} aria-label="Instagram Logo">
            <img
              src="/images/logo.png"
              alt="Instagram"
              className="mt-2 w-6/12"
            />
          </Link>

          <div className="text-gray-700 text-center flex items-center align-items">
            {loggedInUser ? (
              <>
                <Link to={ROUTES.MAIN_PAGE} aria-label="MainPage">
                  <HomeIcon />
                </Link>
                <button
                  type="button"
                  title="Sign Out"
                  onClick={() => firebase.auth().signOut()}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      console.log('prees');
                      firebase.auth().signOut();
                    }
                  }}
                >
                  <LogoutIcon />
                </button>
                {activeUser && (
                  <Link to={`/profile/${activeUser.username}`}>
                    <img
                      className="rounded-full h-8 w-8 flex"
                      src={`/images/avatars/${activeUser?.username}.jpg`}
                      alt={`${activeUser && activeUser?.username} profile  .`}
                      onError={(e) => {
                        e.target.src = DEFAULT_IMAGE_PATH;
                      }}
                    />
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <button
                    type="button"
                    className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                  >
                    Log In
                  </button>
                </Link>
                <Link to={ROUTES.SIGN_UP}>
                  <button
                    type="button"
                    className="font-bold text-sm rounded text-blue-medium w-20 h-8"
                  >
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
