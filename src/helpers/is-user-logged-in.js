import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function IsUserLoggedIn({
  user,
  redirectPath,
  children,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (!user) return children;
        if (user) {
          return <Redirect to={{ pathname: redirectPath }} />;
        }
        return null;
      }}
    />
  );
}

IsUserLoggedIn.propTypes = {
  user: PropTypes.object,
  redirectPath: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
};
