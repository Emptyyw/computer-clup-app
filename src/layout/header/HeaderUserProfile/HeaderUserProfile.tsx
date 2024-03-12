import { FC } from 'react';
import { ActionIcon, Avatar, Flex, Group, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'hooks/redux-hooks';
import { IconCoins } from '@tabler/icons-react';
import { myColor } from 'main';
import { getUser } from 'redux/selectors/userSelectors';
import { RoutePaths } from 'Enum/Enum.ts';

export const HeaderUserProfile: FC = () => {
  const user = useAppSelector(getUser);

  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(RoutePaths.PROFILE_ROUTE);
  };

  return (
    <>
      <ActionIcon
        variant="default"
        size="xl"
        aria-label="Toggle color scheme"
        radius="lg"
        onClick={handleProfileClick}
      >
        <Avatar radius="xl" src={user.avatarUrl} size="lg" />
      </ActionIcon>

      <Flex direction="column">
        <Text size="sm" fw={500}>
          {user.firstName ? user.firstName : user.login}
        </Text>

        <Group gap={1}>
          <ActionIcon radius="lg" variant="subtle" size="xl">
            <IconCoins color={myColor[2]} />
          </ActionIcon>

          <Text c={myColor[2]} fw={700}>
            0
          </Text>
        </Group>
      </Flex>
    </>
  );
};
