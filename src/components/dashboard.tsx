import { useAuth } from 'hooks/use-auth';
import React from 'react';

const Dashboard = () => {
  const { login } = useAuth();

  return (
    <div>
      <h1>Hello! {login} Welcome to the dashboard!</h1>
    </div>
  );
};

export default Dashboard;
