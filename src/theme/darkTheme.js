import { createTheme } from '@mui/material/styles';

// Solid colors only. No gradients anywhere in the app.
export const colors = {
  background: '#0b0f14',
  surface: '#121821',
  surfaceRaised: '#18212c',
  border: '#243142',
  accent: '#4fc3f7',
  textPrimary: '#e6edf3',
  textSecondary: '#8b98a9',
};

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: colors.accent },
    background: { default: colors.background, paper: colors.surface },
    text: { primary: colors.textPrimary, secondary: colors.textSecondary },
    divider: colors.border,
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 300 },
    h2: { fontWeight: 600 },
  },
  components: {
    // MUI's dark mode adds a translucent white gradient to elevated Paper.
    // Turn it off so every surface stays a flat, solid color.
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: colors.surface,
          border: `1px solid ${colors.border}`,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600 },
      },
    },
  },
});

export default darkTheme;
