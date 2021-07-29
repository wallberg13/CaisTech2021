import React from 'react';
import { SwipeableDrawer, Typography, LinearProgress, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { ArrowForward } from '@material-ui/icons';
import FormCancelButton from './FormCancelButton';
import FormConfirmButton from './FormConfirmButton';

const useStyles = makeStyles((theme) => ({
    root: {
        transition: `${theme.transitions.duration.standard}ms`,
    },
    content: {
        padding: theme.spacing(2),
        overflowY: 'auto',
        flexGrow: 1,
    },
    titleArea: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        backgroundColor: theme.palette.primary.dark,
        ...theme.mixins.toolbar,
    },
    title: {
        padding: 0,
        marginLeft: theme.spacing(1),
    },
    buttonArea: {
        display: 'flex',
        padding: theme.spacing(2),
    },
}));

type Props = {
    title?: string;
    acceptButtonText?: string;
    cancelButtonText?: string;
    onAccept: () => void;
    open: boolean;
    onClose?: () => void;
    anchor?: 'right' | 'left' | 'top' | 'bottom' | undefined;
    load?: boolean;
    children?: JSX.Element | undefined;
};

const defaultProps: Props = {
    title: 'Sem Título',
    acceptButtonText: 'Salvar',
    cancelButtonText: 'Cancelar',
    onAccept: () => null,
    open: false,
    onClose: () => null,
    anchor: 'right',
    load: false,
};

function DrawerEmpty({
    title,
    acceptButtonText,
    cancelButtonText,
    onAccept,
    open,
    onClose,
    anchor,
    load,
    children,
}: Props) {
    const classes = useStyles();

    return (
        <SwipeableDrawer
            anchor={anchor}
            open={open}
            onClose={load ? () => null : () => onClose && onClose()}
            onOpen={() => null}
            disableSwipeToOpen
        >
            <Box
                display="flex"
                flexDirection="column"
                height="100%"
                width={[240, 280, 380, 500, 600]}
                className={classes.root}
            >
                <div className={classes.titleArea}>
                    <IconButton edge="start" color="inherit" onClick={onClose}>
                        <ArrowForward />
                    </IconButton>
                    <Typography className={classes.title} noWrap variant="h6">
                        {title}
                    </Typography>
                </div>
                {load ? <LinearProgress color="secondary" /> : null}
                <div className={classes.content}>{open ? children : null}</div>
                <div className={classes.buttonArea}>
                    <FormCancelButton
                        disabled={load}
                        onClick={() => onClose && onClose()}
                        label={cancelButtonText ?? ''}
                    />
                    <Box flexGrow={1} pl={1}>
                        <FormConfirmButton
                            disabled={load}
                            onClick={onAccept}
                            label={acceptButtonText ?? ''}
                            fullWidth
                        />
                    </Box>
                </div>
            </Box>
        </SwipeableDrawer>
    );
}

DrawerEmpty.defaultProps = defaultProps;

export default DrawerEmpty;
