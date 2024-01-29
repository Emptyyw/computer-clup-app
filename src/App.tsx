import './App.css';
import { Text } from '@mantine/core';
import { ActionToggle } from './components/shared/ActionToggle/ActionToggle';
import '@mantine/core/styles.css';

function App() {
  return (
    <div>
      <ActionToggle />
      <Text>Hello!</Text>
    </div>
  );
}

export default App;
