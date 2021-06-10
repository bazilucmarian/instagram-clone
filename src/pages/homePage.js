import React from 'react';
import Header from '../components/Header';
import Page from '../components/Page';
import Sidebar from '../components/Sidebar';
import Timeline from '../components/Timeline';

const HomePage = () => {
  return (
    <Page title="Home">
      <div className="bg-greay-brackground">
        <Header />
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
          <Timeline />
          <Sidebar />
        </div>
      </div>
    </Page>
  );
};

export default HomePage;
