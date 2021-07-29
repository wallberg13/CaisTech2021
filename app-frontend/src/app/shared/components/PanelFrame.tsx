import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import { MenuItem } from '../model/menu-item';
import { Action } from '../model/enum/action';
import { useRouteMatch } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { useChangeTheme } from '../hooks/theme';
import useTheme from '@material-ui/core/styles/useTheme';
import { Brightness4, Brightness7 } from '@material-ui/icons';
import { useHistory } from 'react-router';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            display: 'flex',
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: 36,
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            width: theme.spacing(7) + 1,
            // [theme.breakpoints.up('sm')]: {
            //   width: theme.spacing(7) + 1,
            // },
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
        },
        content: {
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
        },
        contentChildren: {
            display: 'flex',
            flexGrow: 1,
            position: 'relative',
        },
        fullScreenLoad: {
            transition: `${theme.transitions.duration.short}ms`,
            position: 'absolute',
            display: 'flex',
            zIndex: theme.zIndex.modal,
            backgroundColor: theme.palette.background.default,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
        },
    }),
);

type Props = {
    logo: string;
    children?: JSX.Element;
    menu: Map<string, MenuItem>;
    title: string;
    onMenuTilePress: (menuItem: MenuItem) => void;
    load: boolean;
};

function PanelFrame(props: Props) {
    const classes = useStyles();

    const theme = useTheme();
    const changeTheme = useChangeTheme();

    const [open, setOpen] = React.useState(false);

    const match = useRouteMatch();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const history = useHistory();

    const { menu, onMenuTilePress } = props;

    const groupedItems: JSX.Element[][] = [];

    let index = -1;
    let currentGroup = '';

    const currentUrl = match.url;

    // Join By Group
    menu.forEach((menuItem: MenuItem, key: string) => {
        const isSelected: boolean = menuItem.action === Action.route ? currentUrl === menuItem.actionAdornment : false;

        const item = (
            <ListItem
                button
                key={key}
                onClick={isSelected ? () => null : () => onMenuTilePress(menuItem)}
                selected={isSelected}
            >
                <ListItemIcon>{menuItem.icon}</ListItemIcon>
                <ListItemText primary={menuItem.title} />
            </ListItem>
        );

        if (currentGroup !== menuItem.group) groupedItems[++index] = [];

        if (menuItem.show) groupedItems[index].push(item);

        currentGroup = menuItem.group;
    });

    const menuTiles = groupedItems.map((item, index) => (
        <React.Fragment key={'list-item-' + index}>
            <Divider />
            <List>{item}</List>
        </React.Fragment>
    ));

    if (props.load) {
        return (
            <Box className={classes.fullScreenLoad}>
                <CircularProgress color="secondary" size={80} thickness={2} />
            </Box>
        );
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography style={{ flexGrow: 1 }} variant="h6" noWrap>
                        {props.title}
                    </Typography>
                    <IconButton title="Toggle light/dark mode" onClick={() => changeTheme()}>
                        {theme.palette.type === 'light' ? <Brightness4 /> : <Brightness7 />}
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <Box flexGrow={1} display="flex" alignItems="center" justifyContent="center">
                        <Box
                            height={40}
                            clone
                            onClick={() => history.push('/panel/olts')}
                            style={{ cursor: 'pointer' }}
                        >
                            <img src={props.logo} alt="Logo" />
                        </Box>
                    </Box>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                {menuTiles}
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <div className={classes.contentChildren}>{props.children}</div>
            </main>
        </div>
    );
}

export default PanelFrame;
