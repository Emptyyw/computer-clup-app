import { Button, ButtonProps } from '@mantine/core';
import { IconBrandGithubFilled } from '@tabler/icons-react';

export function GitHubButton(
  props: ButtonProps & React.ComponentPropsWithoutRef<'button'>,
) {
  return <Button leftSection={<IconBrandGithubFilled />} variant="default" {...props} />;
}
