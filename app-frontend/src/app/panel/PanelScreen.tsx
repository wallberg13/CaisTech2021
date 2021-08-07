import React from 'react';
import PanelRouter from './PanelRouter';
import PanelFrame from '../shared/components/PanelFrame';
import logoWhite from '../../assets/images/white-logo.svg';
import logoBlue from '../../assets/images/black-logo.svg';
import { menu } from '../shared/constants/menu';
import { MenuItem } from '../shared/model/menu-item';
import { useHistory } from 'react-router-dom';
import { LOGIN_ROUTE, PANEL_NOTFOUND_ROUTE } from '../shared/constants/route';
import { AuthService } from '../shared/service/auth-service';
import { useConfirm } from 'material-ui-confirm';
import { useTracked } from '../shared/states/app-state';
import { useTheme } from '@material-ui/core';

function PanelScreen() {
    const [state, dispatch] = useTracked();
    const history = useHistory();
    const confirm = useConfirm();
    const [load, setLoad] = React.useState(false);

    const theme = useTheme();
    const user = state.user;
    const menuItems = menu(user.read_write ?? []);

    const doLogout = () => {
        confirm({
            title: 'Sair do Painel?',
            description: 'Isso fará você voltar a tela de login.',
            cancellationText: 'Voltar',
            confirmationText: 'Sair',
        })
            .then(async () => {
                try {
                    setLoad(true);

                    await AuthService.logout();
                } catch (e) {
                } finally {
                    history.push(LOGIN_ROUTE);
                }
            })
            .catch(() => null);
    };

    const toPage = (menuItem: MenuItem) => {
        if (menuItem === menuItems.get('exit')) return doLogout();
        history.push(menuItem.actionAdornment ?? PANEL_NOTFOUND_ROUTE);
    };

    const verifyTokenUser = React.useCallback(async () => {
        const token = AuthService.getToken();

        if (token.length === 0) return history.push(LOGIN_ROUTE);

        try {
            if (!state.user.user_id) {
                const user = await AuthService.checkToken();

                dispatch({ type: 'setUser', user });
            }

            setLoad(false);
        } catch (e) {
            AuthService.removeToken();
            history.push(LOGIN_ROUTE);
        }
    }, []);

    React.useEffect(() => {
        verifyTokenUser().then();
    }, [verifyTokenUser]);

    return (
        <PanelFrame
            title={user.name}
            logo={theme.palette.type === 'light' ? logoBlue : logoWhite}
            menu={menuItems}
            onMenuTilePress={toPage}
            load={load}
        >
            <PanelRouter />
        </PanelFrame>
    );
}

export default PanelScreen;
