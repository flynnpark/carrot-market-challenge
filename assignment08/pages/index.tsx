import { NextPage } from 'next';
import React from 'react';
import useUser from '../lib/client/useUser';

const Home: NextPage = () => {
  const { user } = useUser();

  return (
    <div>
      <h1>{user?.name}</h1>
      <h3>{user?.email}</h3>
    </div>
  );
};

export default Home;
