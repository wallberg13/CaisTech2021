import React from 'react';
import { Button, createMuiTheme, ThemeProvider, Tooltip, useTheme } from '@material-ui/core';
import { FirstPage } from '@material-ui/icons';

type Props = {
    onClick: () => void;
    label: string;
    disabled?: boolean;
};

function FormCancelButton(props: Props) {
    const currentTheme = useTheme();

    const theme = createMuiTheme({
        ...currentTheme,
        palette: {
            ...currentTheme.palette,
            primary: currentTheme.palette.error,
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Tooltip title={props.label}>
                <Button disabled={props.disabled} onClick={props.onClick} color="primary" variant="text">
                    <FirstPage />
                </Button>
            </Tooltip>
        </ThemeProvider>
    );
}

export default FormCancelButton;
