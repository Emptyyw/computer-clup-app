import { Accordion, ActionIcon, Anchor, Center, Group, rem } from '@mantine/core';
import { IconCornerDownRight } from '@tabler/icons-react';
import { RoutePaths } from 'Enum/Enum';
import { Link } from 'react-router-dom';
import ClientEditPage from '../ClientEditPage/ClientEditPage';
import { FC } from 'react';

type Props = {
  id: string;
  firstName?: string;
  lastName?: string;
  phoneNum?: string;
  login: string;
  email: string;
  role: string;
  avatarUrl?: string;
};
export const AccordionControl: FC<Props> = props => {
  return (
    <Center>
      <Accordion.Control {...props} />
      <Group wrap="wrap" justify="space-between">
        <Anchor size="xl">
          <ClientEditPage user={props} />
        </Anchor>
        <Anchor
          size="xl"
          aria-label="Profile"
          component={Link}
          to={`${RoutePaths.CLIENT_PROFILE_ROUTE}/${props.id}`}
        >
          <ActionIcon
            color="#008a7c"
            radius="xl"
            variant="light"
            size="lg"
            aria-label="Edit"
          >
            <IconCornerDownRight
              style={{ width: rem(22), height: rem(22) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Anchor>
      </Group>
    </Center>
  );
};
