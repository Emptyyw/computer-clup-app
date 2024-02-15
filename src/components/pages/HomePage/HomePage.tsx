import {
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  rem,
} from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import classes from './HomePage.module.css';
import image from 'assets/logo/shuriken.png';
import { useNavigate } from 'react-router-dom';
import { REGISTRATION_ROUTE } from 'utils/constsRoutes';
import { GoogleButton } from 'components/shared/AuthButton/GoogleButton';
import { useTranslation } from 'react-i18next';

function HomePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSignupClick = () => {
    navigate(REGISTRATION_ROUTE);
  };

  return (
    <Container>
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            {t('app.title')} <br /> {t('app.subtitle')}
          </Title>
          <Text c="dimmed" mt="md">
            {t('homePage.description')}
          </Text>

          <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>{t('homePage.listItem1')}</b> – {t('homePage.listItem1Description')}
            </List.Item>
            <List.Item>
              <b>{t('homePage.listItem2')}</b> – {t('homePage.listItem2Description')}
            </List.Item>
            <List.Item>
              <b>{t('homePage.listItem3')}</b> – {t('homePage.listItem3Description')}
            </List.Item>
          </List>

          <Group mt={30}>
            <Button
              onClick={handleSignupClick}
              radius="xl"
              size="md"
              className={classes.control}
            >
              {t('homePage.getStartedButton')}
            </Button>
            <GoogleButton
              variant="default"
              radius="xl"
              size="md"
              className={classes.control}
            >
              {t('homePage.googleAuthorizationButton')}
            </GoogleButton>
          </Group>
        </div>
        <Image src={image} className={classes.image} />
      </div>
    </Container>
  );
}
export default HomePage;
