import React from 'react';
import {
    Avatar,
    Chip,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    makeStyles,
    Typography,
} from '@material-ui/core';
import { Util } from '../../../shared/helpers/util';
import { Delete } from '@material-ui/icons';
import IconButtonWithConfirm from '../../../shared/components/IconButtonWithConfirm';
import { Permission } from '../../../shared/model/permission';
import { MultiOption } from '../../../shared/components/MyMultiSelectField';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    inline: {
        display: 'inline',
    },
    chip: {
        marginRight: 10,
    },
});

type Props = {
    list: Permission[];
    requestDelete: (Permission: Permission) => void;
    requestUpdate: (user: Permission) => void;
    equips: MultiOption[];
};

function PermissionList({ list, requestUpdate, requestDelete, equips }: Props) {
    const classes = useStyles();

    const listTiles = list.map((item: Permission, idx: number) => {
        /** const roleString = item.read_write
            .map<string>((role) => Util.roleToBrlString(role))
            .join(', '); */

        const listequips = item.equips_id.length ? (
            item.equips_id.map((item: number, idx: number) => (
                <Chip
                    key={'equip-item-' + idx}
                    component="span"
                    size="small"
                    label={Util.equipHostname(equips, item)}
                    color="secondary"
                    className={classes.chip}
                />
            ))
        ) : (
            <Chip size="small" label="FULL equips" component="span" color="secondary" />
        );

        return (
            <React.Fragment key={'permission-item-' + idx}>
                <ListItem alignItems="flex-start" button onClick={() => requestUpdate(item)}>
                    <ListItemAvatar>
                        <Avatar>{idx + 1}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={item.description}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    Permission:
                                </Typography>
                                {` — `}
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    <Chip
                                        size="small"
                                        label={Util.roleNumberToBrlString(item.read_write)}
                                        color="primary"
                                        component="span"
                                    />
                                </Typography>
                                {` — `}
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    {listequips}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                    <ListItemSecondaryAction>
                        <IconButtonWithConfirm Icon={Delete} colored onConfirm={() => requestDelete(item)} />
                    </ListItemSecondaryAction>
                </ListItem>
                {idx !== list.length - 1 ? <Divider variant="inset" component="li" /> : null}
            </React.Fragment>
        );
    });

    return (
        <List className={classes.root} dense disablePadding>
            {listTiles}
        </List>
    );
}

export default PermissionList;
