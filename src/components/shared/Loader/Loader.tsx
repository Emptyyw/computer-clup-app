import { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { getStatus } from 'redux/selectors/userSelectors';

type Props = {
  loader: ReactNode;
  children?: ReactNode;
};

const LoaderRedux: FC<Props> = ({ loader, children }) => {
  const status = useSelector(getStatus);

  if (status === 'loading') {
    return <>{loader}</>;
  }

  return <>{children}</>;
};

export default LoaderRedux;
