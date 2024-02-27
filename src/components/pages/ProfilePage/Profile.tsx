import { Anchor, Box, Group } from '@mantine/core';
import UserInfo from 'components/pages/ProfilePage/UserInfo';
import { Outlet, useNavigate } from 'react-router-dom';
import classes from 'components/pages/ProfilePage/Profile.module.css';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const mockdata = [
  { label: 'Teams', route: 'teams' },
  { label: 'Friends', route: 'friends' },
  { label: 'Statistics', route: 'statistics' },
];

const Profile = () => {
  const { t } = useTranslation();

  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  const mainItems = mockdata.map((item, index) => (
    <Anchor<'a'>
      key={item.label}
      className={classes.mainLink}
      data-active={index === active || undefined}
      onClick={event => {
        event.preventDefault();
        setActive(index);
        navigate(item.route);
      }}
    >
      {t(item.label)}
    </Anchor>
  ));

  return (
    <>
      <UserInfo />
      <Box className={classes.links} visibleFrom="sm">
        <Group gap={0} justify="flex-start" className={classes.mainLinks}>
          {mainItems}
        </Group>
      </Box>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Profile;
