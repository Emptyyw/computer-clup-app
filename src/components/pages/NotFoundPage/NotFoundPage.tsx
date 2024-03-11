import {
  Image,
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
  useComputedColorScheme,
} from '@mantine/core';
import imageDark from 'assets/404page/ninjadark.png';
import ImageWhite from 'assets/404page/ninjawithe.png';
import classes from 'components/pages/NotFoundPage/NotFoundPage.module.css';
import { auth } from 'firebase/firebase';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const colorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
  const image: string = colorScheme === 'light' ? ImageWhite : imageDark;
  const navigate = useNavigate();
  const { t } = useTranslation();

  const getBack = () => {
    if (auth.currentUser) {
      return navigate('DASHBOARD_ROUTE');
    } else {
      return 'HOME_ROUTE';
    }
  };

  return (
    <Container className={classes.root}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <Image src={image} className={classes.mobileImage} />
        <div>
          <Title className={classes.title}>{t('404.title')}</Title>
          <Text c="dimmed" size="lg">
            {t('404.description')}
          </Text>
          <Button
            onClick={getBack}
            variant="outline"
            size="md"
            mt="xl"
            className={classes.control}
          >
            {t('404.goBack')}
          </Button>
        </div>
        <Image src={image} className={classes.desktopImage} />
      </SimpleGrid>
    </Container>
  );
}
export default NotFoundPage;
