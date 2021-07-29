import React from 'react';
import ProfilePage from './components/ProfilePage';
import { User } from '../../shared/model/user';
import { useTracked } from '../../shared/states/app-state';
import { Profile } from '../../shared/model/profile';
import deepEqual from 'deep-equal';
import { UserService } from '../../shared/service/user-service';
import { useSnackbar } from 'material-ui-snackbar-provider';

const emptyProfile = new Profile('', '', '');
const emptyUser = new User('', '', []);

function ProfileScreen() {
    const [state, dispatch] = useTracked();
    const [load, setLoad] = React.useState(true);
    const [currentUser, setCurrentUser] = React.useState<User>(emptyUser);
    const [currentProfile, setCurrentProfile] = React.useState<Profile>(emptyProfile);
    const [hasModified, setHasModified] = React.useState<boolean>(false);

    const snackbar = useSnackbar();

    const { user } = state;

    const initialDataConfig = () => {
        const loading = !Boolean(user.user_id);

        setLoad(loading);

        if (loading) return;

        const initialProfile = new Profile(user.name, user.username, user.password ?? '');

        setCurrentUser(user);
        setCurrentProfile(initialProfile);
    };

    const refreshProfile = (profile: Profile) => {
        const hasModified = !deepEqual(profile, currentProfile);

        setHasModified(hasModified);

        if (currentUser.name !== profile.name) {
            const newCurrentUser = { ...currentUser };
            newCurrentUser.name = profile.name;
            setCurrentUser(newCurrentUser);
        }
    };

    const onSubmit = async (profile: Profile, currentPassword: string) => {
        setLoad(true);

        const { user } = state;

        const userUpdate = new User(profile.name, profile.username, user.read_write, profile.password);

        try {
            const updatedUser = await UserService.updateMe(userUpdate, currentPassword, user.user_id);

            setCurrentUser(updatedUser);
            dispatch({ type: 'setUser', user: updatedUser });
            setHasModified(false);

            const updatedProfile = new Profile(updatedUser.name, updatedUser.username, '');

            setCurrentProfile(updatedProfile);

            snackbar.showMessage('Seus dados foram atualizados com sucesso!');
        } catch (e) {
            if (e?.response?.status === 409) {
                return snackbar.showMessage('Já existe um usuário com esse email.');
            }

            snackbar.showMessage('Erro ao se conectar com o servidor, verifique sua internet');
        } finally {
            setLoad(false);
        }
    };

    React.useEffect(() => {
        initialDataConfig();
    }, [user]);

    return (
        <ProfilePage
            formSubmit={onSubmit}
            refreshProfile={refreshProfile}
            load={load}
            currentUser={currentUser}
            currentProfile={currentProfile}
            hasModified={hasModified}
        />
    );
}

export default ProfileScreen;
