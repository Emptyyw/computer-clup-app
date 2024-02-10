import './App.css';
import { Container } from '@mantine/core';
import '@mantine/core/styles.css';
import './components//18next/i18n';
import { AuthenticationForm } from 'components/Auth/AuthForm';
import { HeaderMenu } from 'layout/header/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from 'components/dashboard';
import 'firebase/firebase';
import { Paths, Types } from 'Enum/Enum';

const currentLogin = Paths.Login;
const currentTypeLogin = Types.Login;
const currentRegister = Paths.Register;
const currentTypeRegister = Types.Register;
const currentDashboard = Paths.Dashboard;

const App = () => {
  return (
    <Router>
      <HeaderMenu />
      <Container>
        <Routes>
          <Route
            path={currentLogin}
            element={<AuthenticationForm type={currentTypeLogin} />}
          />
          <Route
            path={currentRegister}
            element={<AuthenticationForm type={currentTypeRegister} />}
          />
          <Route path={currentDashboard} element={<Dashboard />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
