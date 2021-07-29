import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SplashScreen from './splash/SplashScreen';
import LoginScreen from './login/LoginScreen';
import PanelScreen from './panel/PanelScreen';
import { LOGIN_ROUTE, PANEL_ALL_ROUTE } from './shared/constants/route';

function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={PANEL_ALL_ROUTE}>
                    <PanelScreen />
                </Route>
                <Route exact path={LOGIN_ROUTE}>
                    <LoginScreen />
                </Route>
                <Route exact path="/">
                    <SplashScreen />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Router;
