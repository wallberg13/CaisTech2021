import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { PANEL_NOTFOUND_ROUTE, PROFILE_ROUTE, USER_ROUTE, PERMISSION_ROUTE } from '../shared/constants/route';
import { Box } from '@material-ui/core';
import ProfileScreen from './profile/ProfileScreen';
import UserScreen from './user/UserScreen';
import PermissionScreen from './permission/PermissionScreen';

function PanelRouter() {
    return (
        <Switch>
            {/** PROFILE ROUTES */}
            <Route path={PROFILE_ROUTE}>
                <ProfileScreen />
            </Route>
            <Route path={PERMISSION_ROUTE}>
                <PermissionScreen />
            </Route>
            <Route path={USER_ROUTE}>
                <UserScreen />
            </Route>

            <Route path={PANEL_NOTFOUND_ROUTE}>
                <Box flexGrow={1} display="flex" alignItems="center" justifyContent="center">
                    Not Found
                </Box>
            </Route>
        </Switch>
    );
}

export default PanelRouter;
