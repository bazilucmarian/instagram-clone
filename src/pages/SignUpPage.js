import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import Page from '../components/Page';
import { useForm } from '../hooks/Form';
import {
  doesUsernameExist,
  createUser,
  updateCollectionWithNewUser,
} from '../services/firebase';

const SignupPage = () => {
  const { inputs, handleChange, resetForm } = useForm({
    username: '',
    fullname: '',
    emailAddress: '',
    password: '',
  });

  const [error, setError] = useState('');
  const { emailAddress, password, fullname, username } = inputs;
  const history = useHistory();

  const isInvalid =
    fullname === '' ||
    username === '' ||
    emailAddress === '' ||
    password === '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usernameExists = await doesUsernameExist(username);

    if (!usernameExists) {
      try {
        const createdUserResult = await createUser({ emailAddress, password });
        await createdUserResult.user.updateProfile({ displayName: username });
        // firebase user collection (Create a document)
        const id = createdUserResult.user.uid;
        await updateCollectionWithNewUser({
          id,
          username,
          fullname,
          emailAddress,
        });

        history.push(ROUTES.MAIN_PAGE);
      } catch (error) {
        resetForm();
        setError(error.message);
      }
    } else {
      resetForm();
      setError('This username is already taken, please try another ! 🙂');
    }
  };

  return (
    <Page title="Sign Up">
      <div className="container flex mx-auto max-w-screen-md items-center h-screen">
        <div className="flex w-3/5">
          <img
            src="/images/iphone-with-profile.jpg"
            alt="iPhone with Instagram app"
          />
        </div>
        <div className="flex flex-col w-2/5">
          <div className="flex flex-col bg-white p-4 border items-center border-gray-primary mb-4 rounded">
            <h1 className="flex justify-center w-full">
              <img
                src="/images/logo.png"
                alt="Instagram"
                className="mt-2 w-6/12 mb-4"
              />
            </h1>
            {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

            <form onSubmit={handleSubmit} method="POST">
              <input
                aria-label="Enter your username"
                autoComplete="username"
                name="username"
                type="text"
                placeholder="Username"
                className="text-sm text-gray-base w-full mr-3 py-5 px-5 h-2 border border-gray-primary rounded mb-2"
                onChange={handleChange}
                value={username || ''}
              />
              <input
                aria-label="fullname"
                autoComplete="fullname"
                name="fullname"
                type="text"
                placeholder="Full name"
                className="text-sm text-gray-base w-full mr-3 py-5 px-5 h-2 border border-gray-primary rounded mb-2"
                onChange={handleChange}
                value={fullname || ''}
              />
              <input
                aria-label="Enter your email address"
                autoComplete="email"
                name="emailAddress"
                type="text"
                placeholder="Email address"
                className="text-sm text-gray-base w-full mr-3 py-5 px-5 h-2 border border-gray-primary rounded mb-2"
                onChange={handleChange}
                value={emailAddress || ''}
              />
              <input
                aria-label="Enter your password"
                autoComplete="password"
                name="password"
                type="password"
                placeholder="Password"
                className="text-sm text-gray-base w-full mr-3 py-5 px-5 h-2 border border-gray-primary rounded mb-2"
                onChange={handleChange}
                value={password || ''}
              />
              <button
                disabled={isInvalid}
                type="submit"
                className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${
                  isInvalid && 'opacity-50'
                }`}
              >
                Sign Up
              </button>
            </form>
          </div>
          <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
            <p className="text-sm">
              Have an account?{'  '}
              <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default SignupPage;
