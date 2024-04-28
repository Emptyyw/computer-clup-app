import { Button, TextInput, NativeSelect, InputBase } from '@mantine/core';
import { IMaskInput } from 'react-imask';
import { FC } from 'react';
import { IProfileUpdateById, updateUser } from 'redux/slice/userSlice';
import { useAppDispatch } from 'hooks/redux-hooks';
import { useTranslation } from 'react-i18next';
import { User } from 'api/db';
import { useForm } from '@mantine/form';

type Props = {
  user: User;
};

export const ModalForm: FC<Props> = ({ user }) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const form = useForm({
    initialValues: {
      userId: user.id,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      login: user.login || '',
      phoneNum: user.phoneNum || '',
      role: user.role || '',
    },
  });

  const handleSubmitForm = (values: {
    userId: string;
    firstName: string;
    lastName: string;
    login: string;
    phoneNum: string;
    role: string;
  }) => {
    const updateData: IProfileUpdateById = {
      updates: {
        firstName: values.firstName,
        lastName: values.lastName,
        login: values.login,
        phoneNum: values.phoneNum,
        role: values.role,
      },
      userId: values.userId,
    };
    dispatch(updateUser(updateData));
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmitForm)}>
      <TextInput
        p="md"
        placeholder={t('editpage.Enter user name')}
        value={user.firstName}
        {...form.getInputProps('firstName')}
      />
      <TextInput
        p="md"
        placeholder={t('editpage.Enter user last name')}
        value={user.lastName}
        {...form.getInputProps('lastName')}
      />
      <TextInput
        p="md"
        placeholder={t('editpage.Enter user login')}
        value={user.login}
        {...form.getInputProps('login')}
      />
      <InputBase
        p="md"
        component={IMaskInput}
        value={user.phoneNum}
        mask="+000 (000) 000-0000"
        placeholder={t('editpage.Enter the user phone number')}
        {...form.getInputProps('phoneNum')}
      />
      <NativeSelect
        value={user.role}
        {...form.getInputProps('role')}
        data={['admin', 'user']}
      />
      <Button fullWidth type="submit" mt="md">
        {t('editpage.Submit')}
      </Button>
    </form>
  );
};
