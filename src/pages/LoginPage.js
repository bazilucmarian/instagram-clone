import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebaseContext';
import * as ROUTES from '../constants/routes';
import Page from '../components/Page';
import { useForm } from '../hooks/Form';

const LoginPage = () => {
  const { inputs, handleChange, resetForm } = useForm({
    emailAddress: '',
    password: '',
  });
  const { emailAddress, password } = inputs;
  const [error, setError] = useState('');
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const isInvalid = emailAddress === '' || password === '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
      resetForm();
      history.push(ROUTES.MAIN_PAGE);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Page title="Login">
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
                Log In
              </button>
            </form>
          </div>
          <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
            <p className="text-sm">
              Don't have an account?{'  '}
              <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default LoginPage;
