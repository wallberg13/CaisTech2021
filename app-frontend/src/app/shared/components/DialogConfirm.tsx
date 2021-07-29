import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    makeStyles,
    IconButton,
    Button,
} from '@material-ui/core';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';

const useStyles = makeStyles((theme) => ({
    dialog: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(8),
    },
    dialogTitle: {
        textAlign: 'center',
    },
    dialogContent: {
        textAlign: 'center',
    },
    dialogAction: {
        justifyContent: 'center',
    },
    titleIcon: {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
            cursor: 'default',
        },
        '& .MuiSvgIcon-root': {
            fontSize: '8rem',
        },
    },
}));

type Props = {
    title: string;
    subTitle: string;
    isOpen: boolean;
    onCancel?: () => void;
    onConfirm?: () => void;
};

function DialogConfirm({ title, subTitle, isOpen, onCancel, onConfirm }: Props): JSX.Element {
    const classes = useStyles();

    const confirmClick = () => {
        onConfirm && onConfirm();
        onCancel && onCancel();
    };

    return (
        <Dialog open={isOpen} classes={{ paper: classes.dialog }}>
            <DialogTitle className={classes.dialogTitle}>
                <IconButton disableRipple className={classes.titleIcon}>
                    <NotListedLocationIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="subtitle2">{subTitle}</Typography>
            </DialogContent>
            <DialogActions className={classes.dialogAction}>
                <Button color="default" onClick={() => onCancel && onCancel()}>
                    No
                </Button>
                <Button color="secondary" onClick={confirmClick}>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogConfirm;
