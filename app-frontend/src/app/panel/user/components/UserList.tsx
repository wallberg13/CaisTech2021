import React from 'react';
import { User } from '../../../shared/model/user';
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
import { GravatarUrl } from '../../../shared/helpers/gravatar-url';
import { Util } from '../../../shared/helpers/util';
import { Delete } from '@material-ui/icons';
import IconButtonWithConfirm from '../../../shared/components/IconButtonWithConfirm';
import { MultiOption } from '../../../shared/components/MyMultiSelectField';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    inline: {
        display: 'inline',
    },
});

type Props = {
    list: User[];
    requestDelete: (user: User) => void;
    requestUpdate: (user: User) => void;
    permissions: MultiOption[];
};

function UserList({ list, requestUpdate, requestDelete }: Props) {
    const classes = useStyles();

    const listTiles = list.map((item: User, idx: number) => {
        const profileImage = GravatarUrl.get(item.username);

        return (
            <React.Fragment key={'user-item-' + idx}>
                <ListItem alignItems="flex-start" button onClick={() => requestUpdate(item)}>
                    <ListItemAvatar>
                        <Avatar alt={item.name} src={profileImage} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={item.name}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    {item.username}
                                </Typography>
                                {` — `}
                                <Chip
                                    size="small"
                                    label={Util.roleNumberToBrlString(item.read_write ? item.read_write[0] : -1)}
                                    color="primary"
                                    component="span"
                                />
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

export default UserList;
