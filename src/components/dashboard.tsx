import { useAuth } from 'hooks/useAuth';
import { Text } from '@mantine/core';

const Dashboard = () => {
  const auth = useAuth();

  return (
    <>
      {auth && (
        <Text size="xl" fw={700}>
          Это панель дэшборд, привет {auth.login}!
        </Text>
      )}
    </>
  );
};

export default Dashboard;
