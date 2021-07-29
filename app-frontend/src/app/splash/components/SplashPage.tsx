import { makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import logo from '../../../assets/images/white-logo.svg';
import { style } from '../../shared/constants/style';
import { Box, CircularProgress } from '@material-ui/core';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme: Theme) => ({
    root: {
        background: style.mainGradient,
        flexGrow: 1,
        height: '100%',
    },
    progress: {
        color: '#fff',
    },
}));

function SplashPage() {
    const classes = useStyles();

    return (
        <Box className={classes.root} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Box width={[200, 300]} clone>
                <img src={logo} alt="Logo" />
            </Box>
            <Box mt={5} clone>
                <CircularProgress className={classes.progress} thickness={6} size={40} />
            </Box>
        </Box>
    );
}

export default SplashPage;
