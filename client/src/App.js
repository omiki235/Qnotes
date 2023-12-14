import './App.css';
import { CssBaseline, createTheme } from '@mui/material';
import Home from './pages/Home';
import AppLayout from './components/layout/AppLayout';

function App() {
  const theme = createTheme({
    palette: { mode: 'light' },
  });
  return (
    <div theme={theme}>
      <CssBaseline />
      <AppLayout />
      <Home />
    </div>
  );
}

export default App;
