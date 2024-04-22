import { Text } from '@mantine/core';
import { useAppSelector } from 'hooks/redux-hooks';
import { getUser } from 'redux/selectors/userSelectors';

const Dashboard = () => {
  const auth = useAppSelector(getUser);

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
