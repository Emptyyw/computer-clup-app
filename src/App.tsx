import './App.css';
import '@mantine/core/styles.css';
import { HeaderMenu } from 'layout/header/Header';
import { BrowserRouter as Router } from 'react-router-dom';
import 'firebase/firebase';
import AppRouter from 'routes/AppRouter';
import { useAuth } from 'hooks/useAuth';
import { Navbar } from 'layout/navbar/NavBar';
import { Paper } from '@mantine/core';

const App = () => {
  const auth = useAuth();
  const isAuthenticated = auth.user && !!auth.user.login;

  return (
    <Router>
      <HeaderMenu />
      <div style={{ display: 'flex' }}>
        {isAuthenticated && (
          <Paper style={{ flex: '0 0 240px' }}>
            <Navbar />
          </Paper>
        )}
        <div style={{ flex: '1 0 auto' }}>
          <AppRouter />
        </div>
      </div>
    </Router>
  );
};
export default App;
