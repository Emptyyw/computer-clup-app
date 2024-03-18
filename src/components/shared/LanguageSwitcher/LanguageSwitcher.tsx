import { FC, useState } from 'react';
import { UnstyledButton, Menu, Image, Group } from '@mantine/core';
import classes from 'components/shared/LanguageSwitcher/LanguageSwitcher.module.css';
import { useTranslation } from 'react-i18next';
import { langSwitcher } from 'Enum/Enum';
import { data } from 'config/languageConfig';

export const LanguageSwitcher: FC = () => {
  const { i18n } = useTranslation();
  const savedLanguage = localStorage.getItem('language');
  const initialLanguage = data.find(item => item.code === savedLanguage) || data[0];
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState(initialLanguage);

  const setLang = (item: { label: string; image: string; code: string }) => {
    return () => {
      setSelected(item);
      changeLanguage(item.code as langSwitcher);
    };
  };

  const changeLanguage = (language: langSwitcher) => {
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
  };

  return (
    <Menu
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      width="auto"
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton className={classes.control} data-expanded={opened || undefined}>
          <Group gap="xs">
            <Image src={selected.image} width={22} height={22} />
            <span className={classes.label}>{selected.label}</span>
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        {data.map(item => (
          <Menu.Item
            leftSection={<Image src={item.image} width={35} height={25} />}
            onClick={setLang(item)}
            key={item.label}
          >
            {item.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};
export default LanguageSwitcher;
