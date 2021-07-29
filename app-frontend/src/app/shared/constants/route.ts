// MAIN ROUTES
export const LOGIN_ROUTE = '/login';
export const PANEL_ROUTE = '/panel';

// PANEL ROUTES
export const PANEL_NOTFOUND_ROUTE = `${PANEL_ROUTE}*`;
export const PANEL_ALL_ROUTE = `${PANEL_ROUTE}/*`;
export const HOME_ROUTE = `${PANEL_ROUTE}/home`;
export const PROFILE_ROUTE = `${PANEL_ROUTE}/profile`;
export const PERMISSION_ROUTE = `${PANEL_ROUTE}/permission`;
export const USER_ROUTE = `${PANEL_ROUTE}/user`;
