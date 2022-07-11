import { ThemeProvider } from 'styled-components';

import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'dark'
    }
});

const theme = {
    colors: {
        blue: 'rgb(29, 155, 240)',
        green: 'rgb(0, 186, 124)',
        pink: 'rgb(249, 24, 128)',
        black: '#000',
        white: '#fff',
        '#e7e9ea': '#e7e9ea',
        '#71767b': '#71767b',
        '#2f3336': '#2f3336'
    },
    font: {
        weights: {
            bold: 700
        }
    }
};

export const ThemeContextWrapper = ({ children }) => (
    <MuiThemeProvider theme={darkTheme}>
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    </MuiThemeProvider>
);
