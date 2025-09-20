import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
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
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#141615', 
      paper: '#141615',   
    },
    text: {
      primary: '#DFA857',  
      secondary: '#C3B599',
    },
    primary: {
      main: '#DFA857',
      dark: '#B8941F',
    },
    secondary: {
      main: '#28302B',
    },
    divider: '#232A26', 
  },
});
