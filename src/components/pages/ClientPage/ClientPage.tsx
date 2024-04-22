import { useMediaQuery } from '@mantine/hooks';
import ClientPageMobile from './ClientPageMobile/ClientPageMobile';
import ClientPageDesktop from './ClientPageDesktop/ClientPageDesktop';

const ClientPage = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return <>{isMobile ? <ClientPageMobile /> : <ClientPageDesktop />}</>;
};

export default ClientPage;
