import React from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import { red, green } from '@material-ui/core/colors';
import { Clear, Delete, Check } from '@material-ui/icons';

const useStyles = makeStyles({
    confirm: {
        color: green['700'],
    },
    delete: {
        color: red['700'],
    },
});

type Props = {
    Icon: typeof Delete;
    IconProps?: any;
    onConfirm?: () => void;
    onClick?: () => void;
    onCancel?: () => void;
    colored?: boolean;
    [x: string]: any;
};

const defaultProps: Props = {
    Icon: Delete,
    onConfirm: () => null,
    onClick: () => null,
    onCancel: () => null,
    IconProps: {},
};

function IconButtonWithConfirm({
    onConfirm,
    onCancel,
    onClick,
    Icon,
    IconProps,
    colored,
    ...props
}: Props): JSX.Element {
    const [show, changeShow] = React.useState(false);

    const classes = useStyles();

    const firstActionClick = () => {
        onClick && onClick();
        changeShow(true);
    };

    const confirmClick = () => {
        onConfirm && onConfirm();
        changeShow(false);
    };

    const cancelClick = () => {
        onCancel && onCancel();
        changeShow(false);
    };

    if (show) {
        return (
            <React.Fragment>
                <IconButton
                    onClick={cancelClick}
                    key={1}
                    className={colored ? classes.delete : ''}
                    // edge="end"
                >
                    <Clear />
                </IconButton>
                <IconButton onClick={confirmClick} key={2} className={colored ? classes.confirm : ''} edge="end">
                    <Check />
                </IconButton>
            </React.Fragment>
        );
    }

    return (
        <IconButton onClick={firstActionClick} key={3} {...props} edge="end">
            <Icon {...IconProps} />
        </IconButton>
    );
}

IconButtonWithConfirm.defaultProps = defaultProps;

export default IconButtonWithConfirm;
