import React from 'react';
import { MenuItem } from '../model/menu-item';
import { Action } from '../model/enum/action';
import { PROFILE_ROUTE, USER_ROUTE, PERMISSION_ROUTE } from './route';
import { ExitToApp, AccountCircle, People, SupervisedUserCircle } from '@material-ui/icons';
import { Role } from '../model/enum/role';
import { Util } from '../helpers/util';

export function menu(userRoles: Role[]): Map<string, MenuItem> {
    const menuItemMap = new Map<string, MenuItem>();

    // const allRoles = Object.values(Role);

    const testPermissions = (itemPermissions: Role[]): boolean => Util.hasPermission(userRoles, itemPermissions);

    menuItemMap.set(
        'permission',
        new MenuItem({
            title: 'Profiles',
            action: Action.route,
            group: 'main',
            icon: <SupervisedUserCircle />,
            show: testPermissions([Role.Admin]),
            actionAdornment: PERMISSION_ROUTE,
        }),
    );

    menuItemMap.set(
        'user',
        new MenuItem({
            title: 'Usuários',
            action: Action.route,
            group: 'main',
            icon: <People />,
            show: testPermissions([Role.Admin]),
            actionAdornment: USER_ROUTE,
        }),
    );

    menuItemMap.set(
        'profile',
        new MenuItem({
            title: 'Perfil',
            action: Action.route,
            group: 'settings',
            icon: <AccountCircle />,
            show: testPermissions([Role.Admin, Role.Operator]),
            actionAdornment: PROFILE_ROUTE,
        }),
    );

    menuItemMap.set(
        'exit',
        new MenuItem({
            title: 'Sair',
            action: Action.method,
            group: 'settings',
            icon: <ExitToApp />,
            show: true,
        }),
    );

    return menuItemMap;
}
