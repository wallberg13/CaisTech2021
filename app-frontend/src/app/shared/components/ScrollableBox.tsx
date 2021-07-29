import { Box } from '@material-ui/core';
import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(3),
        overflowY: 'auto',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
    },
}));

function ScrollableBox(props: { children: any }) {
    const classes = useStyles();

    return <Box className={classes.root}>{props.children}</Box>;
}

export default ScrollableBox;
