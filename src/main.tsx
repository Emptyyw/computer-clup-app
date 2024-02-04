import ReactDOM from 'react-dom/client';
import App from 'App.tsx';
import './index.css';
import { MantineProvider, createTheme, MantineColorsTuple } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { store } from 'store/store';
import { Provider } from 'react-redux';

const myColor: MantineColorsTuple = [
  '#e4fffe',
  '#d0fffa',
  '#a1fef5',
  '#6ffef0',
  '#4dfeeb',
  '#3cfee8',
  '#30fee7',
  '#21e2cd',
  '#00c9b6',
  '#00ae9c',
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
