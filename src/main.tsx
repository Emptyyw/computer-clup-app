import ReactDOM from 'react-dom/client';
import App from 'App.tsx';
import './index.css';
import { MantineProvider, createTheme, MantineColorsTuple } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { store } from 'store/store';
import { Provider } from 'react-redux';

const myColor: MantineColorsTuple = [
  '#00D6C1',
  '#00D6C1',
  '#00D6C1',
  '#00D6C1',
  '#00D6C1',
  '#00D6C1',
  '#00D6C1',
  '#00D6C1',
  '#00D6C1',
  '#00D6C1',
];

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'myColor',

  colors: {
    myColor,
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <MantineProvider theme={theme}>
    <ModalsProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ModalsProvider>
  </MantineProvider>,
);
