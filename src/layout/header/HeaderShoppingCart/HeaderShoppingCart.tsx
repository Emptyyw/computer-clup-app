import { FC } from 'react';
import { IconShoppingCartFilled } from '@tabler/icons-react';
import { ActionIcon } from '@mantine/core';

export const HeaderShoppingCart: FC = () => {
    return (
        <ActionIcon radius="lg" variant="subtle" size="xl">
            <IconShoppingCartFilled />
        </ActionIcon>
    );
};
