import React from 'react';
import SplashPage from './components/SplashPage';
import { useHistory } from 'react-router-dom';
import { AuthService } from '../shared/service/auth-service';
import { LOGIN_ROUTE, USER_ROUTE } from '../shared/constants/route';
import { useTracked } from '../shared/states/app-state';

function SplashScreen() {
    const history = useHistory();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [state, dispatch] = useTracked();

    const verifyUserLogin = async () => {
        const token = AuthService.getToken();

        if (token.length === 0) return history.push(LOGIN_ROUTE);

        try {
            //await AuthService.refresh();

            const user = await AuthService.checkToken();

            dispatch({ type: 'setUser', user });

            history.push(USER_ROUTE);
        } catch (e) {
            AuthService.removeToken();
            history.push(LOGIN_ROUTE);
        }
    };

    React.useEffect(() => {
        verifyUserLogin().then();
    });

    return <SplashPage />;
}

export default SplashScreen;
