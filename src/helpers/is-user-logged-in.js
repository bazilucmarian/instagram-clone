import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function IsUserLoggedIn({
  user,
  loggedInPath,
  children,
  ...rest
}) {
  console.log(loggedInPath);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (!user) return children;
        if (user) {
          return <Redirect to={{ pathname: loggedInPath }} />;
        }
        return null;
      }}
    />
  );
}

IsUserLoggedIn.propTypes = {
  user: PropTypes.object,
  loggedInPath: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
};
