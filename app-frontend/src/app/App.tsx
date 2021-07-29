import React from 'react';
import Router from './Router';
import { theme } from './shared/constants/theme';
import { CssBaseline, SnackbarProps } from '@material-ui/core';
import { SnackbarProvider } from 'material-ui-snackbar-provider';
import { ConfirmProvider, ConfirmProviderProps } from 'material-ui-confirm';
import { Provider } from './shared/states/app-state';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import ThemeProvider from '../app/shared/hooks/theme';
import ptBrLocale from 'date-fns/locale/pt-BR';

const snackbarProps: Partial<SnackbarProps> = {
    autoHideDuration: 2700,
    anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
    },
};

const confirmProps: Partial<ConfirmProviderProps> = {
    defaultOptions: {
        confirmationButtonProps: {
            color: 'secondary',
        },
    },
};

function App() {
    return (
        <Provider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <ConfirmProvider {...confirmProps}>
                    <SnackbarProvider SnackbarProps={snackbarProps}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBrLocale}>
                            <Router />
                        </MuiPickersUtilsProvider>
                    </SnackbarProvider>
                </ConfirmProvider>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
