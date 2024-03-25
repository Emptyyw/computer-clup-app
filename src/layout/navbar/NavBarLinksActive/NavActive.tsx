import { Tooltip, UnstyledButton, rem } from '@mantine/core';
import classes from 'src/layout/navbar/NavBar.module.css';
import { IconHome2 } from '@tabler/icons-react';

type Props = {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  onClick?(): void;
};

export const NavActive = ({ icon: Icon, label, active, onClick }: Props) => {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={`${classes.link} ${active ? classes.active : ''}`}
        data-active={active || undefined}
      >
        <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
};
