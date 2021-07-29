import React from 'react';
import { Button, Theme } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

type StyleProps = {
    materialColor?: { [x: string]: string };
};

const useStyles = makeStyles((theme: Theme) => ({
    root: (props: StyleProps) => {
        const color = props.materialColor ?? grey;

        return {
            color: theme.palette.getContrastText(color[500]),
            backgroundColor: color[500],
            '&:hover': {
                backgroundColor: color[700],
            },
        };
    },
}));

type Props = {
    color?: { [x: string]: string };
    [x: string]: any;
};

function ColorButton({ color, ...rest }: Props) {
    const classes = useStyles({ materialColor: color });

    const { className } = rest;

    return <Button className={clsx(classes.root, className)} {...rest} />;
}

export default ColorButton;
