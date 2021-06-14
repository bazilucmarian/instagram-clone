import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ReactLoader } from './components/Loader';
import * as ROUTES from './constants/routes';
import { useUser } from './hooks/useUser';
import UserContext from './context/userContext';

import ProtectedRoute from './helpers/protected-route';
import IsUserLoggedIn from './helpers/is-user-logged-in';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const NotFoundPage = lazy(() => import('./pages/not-found'));
const HomePage = lazy(() => import('./pages/homePage'));
const ProfilePage = lazy(() => import('./pages/profilePage'));

const App = () => {
  const { user } = useUser();

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<ReactLoader />}>
          <Switch>
            <ProtectedRoute user={user} path={ROUTES.MAIN_PAGE} exact>
              <HomePage />
            </ProtectedRoute>

            <IsUserLoggedIn
              user={user}
              path={ROUTES.LOGIN}
              redirectPath={ROUTES.MAIN_PAGE}
              exact
            >
              <LoginPage />
            </IsUserLoggedIn>
            <IsUserLoggedIn
              user={user}
              path={ROUTES.SIGN_UP}
              redirectPath={ROUTES.MAIN_PAGE}
              exact
            >
              <SignUpPage />
            </IsUserLoggedIn>
            <Route path={ROUTES.PROFILE} component={ProfilePage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
