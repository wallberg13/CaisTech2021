import React from 'react';
import { Button, createMuiTheme, ThemeProvider, useTheme } from '@material-ui/core';
import { Check } from '@material-ui/icons';

type Props = {
    onClick?: () => void;
    label: string;
    disabled?: boolean;
    fullWidth?: boolean;
    type?: 'button' | 'submit';
};

function FormConfirmButton(props: Props) {
    const currentTheme = useTheme();

    const theme = createMuiTheme({
        palette: {
            primary: currentTheme.palette.success,
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Button
                color="primary"
                disabled={props.disabled}
                onClick={props.onClick}
                variant="outlined"
                fullWidth={props.fullWidth}
                endIcon={<Check />}
                type={props.type}
            >
                {props.label}
            </Button>
        </ThemeProvider>
    );
}

export default FormConfirmButton;
