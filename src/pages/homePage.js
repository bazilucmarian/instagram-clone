import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Page from '../components/Page';
import Sidebar from '../components/Sidebar';
import Timeline from '../components/Timeline';
import { useUserData } from './../hooks/useUserData';
import LoggedInUserContext from '../context/logged-in-user';

const HomePage = ({ user: loggedInUser }) => {
  const { activeUser, setActiveUser } = useUserData(loggedInUser.uid);

  return (
    <LoggedInUserContext.Provider value={{ activeUser, setActiveUser }}>
      <Page title="Home">
        <div className="bg-gray-brackground">
          <Header />
          <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
            <Timeline />
            <Sidebar />
          </div>
        </div>
      </Page>
    </LoggedInUserContext.Provider>
  );
};
HomePage.propTypes = {
  loggedInUser: PropTypes.object,
};

export default HomePage;
