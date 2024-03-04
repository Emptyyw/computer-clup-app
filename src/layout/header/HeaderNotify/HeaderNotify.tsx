import { FC } from 'react';
import { IconBellFilled } from '@tabler/icons-react';
import { ActionIcon } from '@mantine/core';

export const HeaderNotify: FC = () => {
    return (
        <ActionIcon radius="lg" variant="subtle" size="xl">
            <IconBellFilled />
        </ActionIcon>
    );
};
