import React from 'react';
import { User } from '../../../shared/model/user';
import { Avatar, Box, Card, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import cover from '../../../../assets/images/cover.jpg';
import { GravatarUrl } from '../../../shared/helpers/gravatar-url';
import { Util } from '../../../shared/helpers/util';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            background: `url('${cover}') center center`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
        },
        white: {
            color: '#FFFFFF',
        },
    }),
);

type Props = {
    user: User;
};

function ProfileCover(props: Props) {
    const classes = useStyles();

    const { username, name, read_write } = props.user;

    const profileImage = GravatarUrl.get(username, 512);

    const stringRoles = Object.values(read_write ?? -1)
        .map((role) => Util.roleToBrlString(role))
        .join(', ');

    return (
        <Box width="100%" clone>
            <Card className={classes.root} elevation={5}>
                <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" p={5}>
                    <Box
                        p="3px"
                        bgcolor="#fff"
                        width="fit-content"
                        borderRadius="100%"
                        mr={{ xs: 0, md: 3 }}
                        mb={{ xs: 1, sm: 2, md: 0 }}
                    >
                        <Box height={100} width={100} clone>
                            <Avatar alt={name} src={profileImage} />
                        </Box>
                    </Box>
                    <div>
                        <Box
                            fontWeight="fontWeightBold"
                            fontSize={{
                                xs: 'h6.fontSize',
                                sm: 'h5.fontSize',
                                md: 'h4.fontSize',
                            }}
                            clone
                            className={classes.white}
                        >
                            <Typography component="h1" align="center" variant="inherit" noWrap>
                                {name}
                            </Typography>
                        </Box>
                        <Box
                            fontWeight="fontWeightLight"
                            textAlign={{
                                xs: 'center',
                                md: 'left',
                            }}
                            fontSize={{
                                xs: 'caption.fontSize',
                                md: 'body1.fontSize',
                            }}
                            clone
                            className={classes.white}
                        >
                            <Typography component="h2" variant="inherit" noWrap>
                                {stringRoles}
                            </Typography>
                        </Box>
                    </div>
                </Box>
            </Card>
        </Box>
    );
}

export default ProfileCover;
