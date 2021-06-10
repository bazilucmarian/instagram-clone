import { useEffect } from 'react';

const Page = ({ title, children }) => {
  useEffect(() => {
    document.title = `${title} | Instagram`;
    window.scrollTo(0, 0);
  }, [title]);
  return children;
};

export default Page;
