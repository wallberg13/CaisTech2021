import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#00264B',
        },
        secondary: {
            main: '#0090FF',
        },
        background: {
            default: '#141414', // 141414
            paper: '#1B1B1B', // #1B1B1B
        },
        type: 'dark', // light dark
    },
});

export const themeChart = createMuiTheme({
    palette: {
        primary: {
            main: '#00264B',
        },
        secondary: {
            main: '#0090FF',
        },
        background: {
            default: '#fafafa', // 141414
            paper: '#fff', // #1B1B1B
        },
        type: 'light', // light dark
    },
});
