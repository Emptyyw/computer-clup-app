import './App.css';
import { Container } from '@mantine/core';
import '@mantine/core/styles.css';
import './components//18next/i18n';
import { AuthenticationForm } from 'components/Auth/AuthForm';
import { HeaderMenu } from 'layout/header/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from 'components/dashboard';
import 'firebase/firebase';

const App = () => {
  return (
    <Router>
      <HeaderMenu />
      <Container>
        <Routes>
          <Route path="/login" element={<AuthenticationForm type="login" />} />
          <Route path="/register" element={<AuthenticationForm type="register" />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
