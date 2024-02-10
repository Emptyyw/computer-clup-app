import { useAuth } from 'hooks/useAuth';
import { Text } from '@mantine/core';

const Dashboard = () => {
  const user = useAuth();
  const isAuthenticated = !!user.token;

  return (
    <>
      {isAuthenticated ? (
        <Text size="xl" fw={700}>
          Привет, {user.login}!
        </Text>
      ) : (
        <Text size="xl" fw={700}>
          Пожалуйста, войдите в систему.
        </Text>
      )}
    </>
  );
};

export default Dashboard;
