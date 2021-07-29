import React from 'react';
import { Box, Breadcrumbs, Divider, Hidden, IconButton, Typography } from '@material-ui/core';
import ColorButton from './ColorButton';

export type ActionButton = {
    label: string;
    icon?: JSX.Element;
    onAction: () => void;
    color?: { [x: string]: string };
};

type Props = {
    title?: string;
    buttons?: ActionButton[];
    breadcrumbs?: any[];
};

function ActionBar(props: Props) {
    const buttons = props.buttons ?? [];

    buttons.reverse();

    const listBreadcumbs =
        props.breadcrumbs &&
        props.breadcrumbs.map((item: any, idx: number) => {
            // const last = props.breadcrumbs?.length === idx + 1;
            return (
                <Typography key={'breadcrumbs-item-' + idx} component="h1" variant="h5" noWrap>
                    {item.breadcrumbs}
                </Typography>
            );
            /** if (last) {
                return (
                    <Typography key={'breadcrumbs-item-' + idx} component="h1" variant="h5" noWrap>
                        {item.breadcrumbs}
                    </Typography>
                );
            }

            return (
                <Link key={'breadcrumbs-item-' + idx} to={item.path} style={{ textDecoration: 'none' }}>
                    <Typography color="secondary" component="h1" variant="h5" noWrap>
                        {item.breadcrumbs}
                    </Typography>
                </Link>
            ); */
        });

    const largeActionButtons = buttons.map((button: ActionButton, idx: number) => (
        <Box ml={idx === 0 ? 0 : 2} key={'large-action-button-' + idx}>
            <ColorButton
                endIcon={button.icon}
                variant="contained"
                color={button.color}
                onClick={button.onAction}
                style={{ whiteSpace: 'nowrap' }}
            >
                {button.label}
            </ColorButton>
        </Box>
    ));

    const iconActionButtons = buttons.map((button: ActionButton, idx: number) => (
        <Box ml={idx === 0 ? 0 : 1} key={'icon-action-button-' + idx}>
            <Box color={button.color ? button.color[500] : 'white'} clone>
                <IconButton aria-label={button.label} onClick={button.onAction}>
                    {button.icon}
                </IconButton>
            </Box>
        </Box>
    ));

    const titleTile = (
        <Box display="flex" minWidth={50} alignItems="center" width="100%" maxWidth={640} mr={2}>
            <Typography component="h1" variant="h5" noWrap>
                {props.title}
            </Typography>
        </Box>
    );

    const breadcrumbsTile = (
        <Box display="flex" minWidth={50} alignItems="center" width="100%" maxWidth={640} mr={2}>
            <Breadcrumbs aria-label="breadcrumb">{listBreadcumbs}</Breadcrumbs>
        </Box>
    );

    return (
        <Box display="flex" flexDirection="column" width="100%">
            <Box display="flex" flexGrow={1}>
                {props.breadcrumbs ? breadcrumbsTile : props.title ? titleTile : null}
                <Box flexGrow={1} display="flex" alignItems="center" justifyContent="flex-end">
                    <Hidden smDown>{largeActionButtons}</Hidden>
                    <Hidden mdUp>{iconActionButtons}</Hidden>
                </Box>
            </Box>
            <Box mb={2} mt={2}>
                <Divider />
            </Box>
        </Box>
    );
}

export default ActionBar;
