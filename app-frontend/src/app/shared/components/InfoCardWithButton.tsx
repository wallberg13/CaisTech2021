import React from 'react';
import { Box, Button, Card, Theme, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

type StyleProps = {
    buttonColor?: { [x: string]: string };
    textColor?: { [x: string]: string };
};

const useStyles = makeStyles((theme: Theme) => ({
    button: (props: StyleProps) => {
        const color = props.buttonColor ? props.buttonColor : grey;

        return {
            color: theme.palette.getContrastText(color[500]),
            backgroundColor: color[500],
            '&:hover': {
                backgroundColor: color[700],
            },
        };
    },
    text: (props: StyleProps) => {
        const color = props.textColor ? props.textColor : grey;
        return {
            color: color[500],
        };
    },
}));

type Props = {
    onClick?: () => void;
    buttonText: string;
    icon: JSX.Element;
    buttonIcon: JSX.Element;
    description: string;
    buttonColor?: { [x: string]: string };
    textColor?: { [x: string]: string };
};

function InfoCardWithButton(props: Props) {
    const classes = useStyles({
        buttonColor: props.buttonColor,
        textColor: props.textColor,
    });

    const showButton = !!props.onClick;

    return (
        <Card elevation={3}>
            <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" clone>
                <Box p={[1, 2]}>
                    <Box
                        display="flex"
                        width="100%"
                        flexDirection={['column', 'row']}
                        mb={showButton ? [1, 2] : 0}
                        alignItems="center"
                    >
                        <Box fontSize={60} className={classes.text} clone>
                            {props.icon}
                        </Box>
                        <Box flexGrow={1} ml={1} maxWidth={180}>
                            <Box textAlign={['center', 'left']} clone>
                                <Typography variant="body1" className={classes.text}>
                                    {props.description}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    {!showButton ? null : (
                        <Button
                            variant="contained"
                            fullWidth
                            startIcon={props.buttonIcon}
                            onClick={props.onClick}
                            className={classes.button}
                        >
                            {props.buttonText}
                        </Button>
                    )}
                </Box>
            </Box>
        </Card>
    );
}

export default InfoCardWithButton;
