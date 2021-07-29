import React from 'react';
import { Grid, makeStyles, Box, Theme } from '@material-ui/core';
import logo from '../../../assets/images/white-logo.svg';
import { Login } from '../../shared/model/login';
import LoginForm from './LoginForm';
import { style } from '../../shared/constants/style';

const useStyles = makeStyles(({ palette }: Theme) => ({
    root: {
        backgroundColor: palette.primary.main,
        background: style.mainGradient,
    },
}));

type Props = {
    // eslint-disable-next-line @typescript-eslint/ban-types
    formSubmit: (login: Login, reset: Function) => any;
    load?: boolean;
};

export default function LoginPage({ formSubmit, load }: Props): JSX.Element {
    const classes = useStyles();

    return (
        <Box p={4} flexGrow={1} className={classes.root} display="flex">
            <Grid container alignContent="center" justify="center">
                <Grid item xs={10} sm={6} md={4} lg={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Box height={[40, 60, 50]} clone>
                                <img src={logo} alt="Logo" />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <LoginForm load={load} formSubmit={formSubmit} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}
