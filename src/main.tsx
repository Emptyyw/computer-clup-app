import ReactDOM from 'react-dom/client';
import App from 'App.tsx';
import './index.css';
import { MantineProvider, createTheme, MantineColorsTuple } from '@mantine/core';

const myColor: MantineColorsTuple = [
  '#f6ecff',
  '#e7d6fb',
  '#caabf1',
  '#ac7ce8',
  '#9354e0',
  '#833cdb',
  '#7b2eda',
  '#6921c2',
  '#5d1cae',
  '#501599',
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
    <App />
  </MantineProvider>,
);
