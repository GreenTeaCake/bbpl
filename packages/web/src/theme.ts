import { createTheme } from '@mui/material/styles';

export const THEME = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2d42ff',
    },
    secondary: {
      main: '#ffbf00',
    },
    error: {
      main: '#ae0000',
    },
    warning: {
      main: '#fff528',
    },
    info: {
      main: '#40c4ff',
    },
    success: {
      main: '#17cb73',
    },
  },
});
