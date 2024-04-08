import { FC, useEffect, useState } from 'react';
import { Box, Button, Flex, Image, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import error404 from 'assets/404page/404-Error-amico.svg';
import { myColor } from 'main';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from 'Enum/Enum';
import { auth } from 'firebase/firebase';
import { useMediaQuery } from '@mantine/hooks';

export const Error404: FC = () => {
  const [counter, setCounter] = useState(5);

  const navigate = useNavigate();

  const { t } = useTranslation();

  const isMatches = useMediaQuery('(max-width: 900px)');
  const isSmallBoxScreen = useMediaQuery('(max-width: 500px)');

  const onClickBackHandler = () => {
    return auth.currentUser
      ? navigate(RoutePaths.DASHBOARD_ROUTE)
      : navigate(RoutePaths.HOME_ROUTE);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      onClickBackHandler();
    }, 5000);

    const interval = setInterval(() => {
      setCounter(prevCounter => (prevCounter > 0 ? prevCounter - 1 : 0));
    }, 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [navigate]);

  return (
    <Flex
      p={30}
      gap="xs"
      justify="center"
      align="center"
      direction={isMatches ? 'column' : 'row'}
    >
      <Box w={isSmallBoxScreen ? '100%' : 500}>
        <Text fw={900} fz={34} mb={15}>
          {t('404.title')}{' '}
        </Text>
        <Text c={myColor[3]} mb={20}>
          {t('404.description')}
        </Text>
        <Button variant="outline" color="grape" onClick={onClickBackHandler}>
          {t('404.backButton')} ({counter})
        </Button>
      </Box>
      <Box w={isSmallBoxScreen ? '100%' : 500}>
        <Image src={error404} alt="error-404" />
      </Box>
    </Flex>
  );
};
