import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    moh: Palette['primary'];
  }

  interface PaletteOptions {
    moh?: PaletteOptions['primary'];
  }
}

// Update the Button's color options to include an ochre option

const mohColors = createTheme({
  palette: {
    moh: {
      main: '#379541',
      light: '#A1FFAA',
      dark: '#37613B',
      contrastText: '#FFFFFF',
    },
  },
});

export default mohColors;
