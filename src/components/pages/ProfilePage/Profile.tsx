import { Box, Group } from '@mantine/core';
import UserInfo from 'components/pages/ProfilePage/UserInfo';
import { Link, Outlet } from 'react-router-dom';
import classes from 'components/pages/ProfilePage/Profile.module.css';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { mockdata } from 'config/profileConfig';

const Profile = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);

  const mainItems = mockdata.map((item, index) => (
    <Link
      to={item.route}
      key={item.label}
      className={classes.mainLink}
      data-active={index === active || undefined}
      onClick={() => {
        setActive(index);
      }}
    >
      {t(item.label)}
    </Link>
  ));

  return (
    <>
      <UserInfo />
      <Box className={classes.links} visibleFrom="sm">
        <Group gap={0} justify="flex-start">
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
