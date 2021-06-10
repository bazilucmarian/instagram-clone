import React from 'react';
import Page from '../components/Page';
import Header from '../components/Header';
const NotFound = () => {
  return (
    <Page title="Not Found">
      <div className="bg-gray-background">
        <Header />
        <div className="mx-auto max-w-screen-lg">
          <p className="text-center text-2xl">Not Found !</p>
        </div>
      </div>
    </Page>
  );
};

export default NotFound;
