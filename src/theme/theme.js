import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#F9F7F1',
      paper: '#F9F7F1',
    },
    text: {
      primary: '#2E2E2E',
      secondary: '#5A5A5A',
    },
    primary: {
      main: '#D4AF37',
    },
    secondary: {
      main: '#BFA14A',
    },
    divider: '#E0DCC9',
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1E1E1E',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#EDEDED',
      secondary: '#B0B0B0',
    },
    primary: {
      main: '#FFD700',
    },
    secondary: {
      main: '#C9B037',
    },
    divider: '#3A3A3A',
  },
});

export { lightTheme, darkTheme };