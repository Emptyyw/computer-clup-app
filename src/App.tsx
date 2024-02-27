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
  const isAuthenticated = auth && !!auth.login;

  return (
    <Router>
      <HeaderMenu />
      <div className="wrapper">
        {isAuthenticated && (
          <Paper className="navbar">
            <Navbar />
          </Paper>
        )}
        <div className="item">
          <AppRouter />
        </div>
      </div>
    </Router>
  );
};
export default App;
