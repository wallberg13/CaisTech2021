import React from 'react';
import { Login } from '../shared/model/login';
import LoginPage from './components/LoginPage';
import { useSnackbar } from 'material-ui-snackbar-provider';
import { useHistory } from 'react-router-dom';
import { AuthService } from '../shared/service/auth-service';
import { USER_ROUTE } from '../shared/constants/route';
import { useTracked } from '../shared/states/app-state';

function LoginScreen() {
    const [load, toggleLoad] = React.useState<boolean>(false);
    const snackbar = useSnackbar();
    const history = useHistory();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [state, dispatch] = useTracked();

    const doLogin = async (login: Login) => {
        try {
            toggleLoad(true);

            const user = await AuthService.login(login);

            // const user = await UserService.findMe();
            dispatch({ type: 'setUser', user });

            history.push(USER_ROUTE);
        } catch (e) {
            toggleLoad(false);

            if (e?.response?.status === 401) return snackbar.showMessage('Email ou(e) senha incorreto!');

            snackbar.showMessage('Não foi possível se conectar com o servidor, verifique sua internet!');
        }
    };

    return <LoginPage formSubmit={doLogin} load={load} />;
}

export default LoginScreen;
