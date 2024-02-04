import { Center, Container } from '@mantine/core';
import { useState } from 'react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

export const AuthInputPhone = () => {
  const [phone, setPhone] = useState('');

  return (
    <Container>
      <Center>
        <PhoneInput
          defaultCountry="br"
          value={phone}
          onChange={phone => setPhone(phone)}
        />
      </Center>
    </Container>
  );
};
