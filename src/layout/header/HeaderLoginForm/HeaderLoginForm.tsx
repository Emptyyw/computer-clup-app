import { FC } from 'react';
import { Button } from '@mantine/core';

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RoutePaths } from 'Enum/Enum';

export const HeaderLoginForm: FC = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const handleLoginClick = () => {
    navigate(RoutePaths.LOGIN_ROUTE);
  };

  const handleSignupClick = () => {
    navigate(RoutePaths.REGISTRATION_ROUTE);
  };

  return (
    <>
      <Button onClick={handleSignupClick}>{t('header.sign up')}</Button>
      <Button onClick={handleLoginClick} variant="default">
        {t('header.log in')}
      </Button>
    </>
  );
};
