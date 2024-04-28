import { Button, TextInput } from '@mantine/core';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { useTranslation } from 'react-i18next';
import { useForm } from '@mantine/form';
import { getUser } from 'redux/selectors/userSelectors';
import { IProfileUpdateById, updateUser } from 'redux/slice/userSlice';

type FormValues = {
  userId: string;
  firstName: string;
  lastName: string;
  login: string;
};

export const EditModalForm: FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const auth = useAppSelector(getUser);

  const form = useForm({
    initialValues: {
      userId: auth.id,
      firstName: auth.firstName || '',
      lastName: auth.lastName || '',
      login: auth.login || '',
    },
  });

  const handleSubmitForm = (values: FormValues) => {
    const updateData: IProfileUpdateById = {
      updates: {
        firstName: values.firstName,
        lastName: values.lastName,
        login: values.login,
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
        value={auth.firstName}
        {...form.getInputProps('firstName')}
      />
      <TextInput
        p="md"
        placeholder={t('editpage.Enter user last name')}
        value={auth.lastName}
        {...form.getInputProps('lastName')}
      />
      <TextInput
        p="md"
        placeholder={t('editpage.Enter user login')}
        value={auth.login}
        {...form.getInputProps('login')}
      />
      <Button fullWidth type="submit" mt="md">
        {t('editpage.Submit')}
      </Button>
    </form>
  );
};
