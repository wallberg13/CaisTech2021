import React from 'react';
import UserPage from './components/UserPage';
import { UserService } from '../../shared/service/user-service';
import { User } from '../../shared/model/user';
import { ScreenStrings } from '../../shared/model/screen-strings';
import { useSnackbar } from 'material-ui-snackbar-provider';
import { Util } from '../../shared/helpers/util';
import { PermissionService } from '../../shared/service/permission-service';
import { MultiOption } from '../../shared/components/MyMultiSelectField';

function UserScreen() {
    const screenStrings = new ScreenStrings('User', 'Users');
    const defaultUser = new User('', '', [], '');

    const [load, setLoad] = React.useState<boolean>(true);
    const [formLoad, setFormLoad] = React.useState<boolean>(false);

    const [list, setList] = React.useState<User[] | null>([]);
    const [permissions, setPermissions] = React.useState<MultiOption[] | null>([]);
    const [selectedItem, setSelectedItem] = React.useState<User>(defaultUser);
    const [showForm, setShowForm] = React.useState(false);
    const snackbar = useSnackbar();

    const closeShowForm = () => setShowForm(false);

    const createOrUpdateUser = async (user: User): Promise<void> => {
        const isUpdate = Boolean(user.user_id);

        setFormLoad(true);

        try {
            isUpdate ? await UserService.update(user) : await UserService.create(user);

            snackbar.showMessage(
                isUpdate
                    ? `${screenStrings.singular} atualizado com sucesso!`
                    : `${screenStrings.singular} criado com sucesso!`,
            );

            await findAllUsers().then();

            setShowForm(false);
        } catch (e) {
            if (e?.response?.status === 409) {
                return snackbar.showMessage('Já existem um usuário com esse email.');
            }

            snackbar.showMessage('Erro ao se conectar com o servidor, verifique sua internet');
        } finally {
            setFormLoad(false);
        }
    };

    const onRequestCreateOrUpdate = (user?: User) => {
        setSelectedItem(user ? user : defaultUser);
        setShowForm(true);
    };

    const deleteUser = async (user: User): Promise<void> => {
        const currentList = list ?? [];

        setLoad(true);

        try {
            await UserService.delete(user);

            const changedList = Util.deleteItem<User>(user, currentList);

            setList(changedList);

            snackbar.showMessage(`${screenStrings.singular} deletado com sucesso!`);
        } catch ({ response }) {
            snackbar.showMessage(`[ SYSTEM ] ${response.data.message}`);
        } finally {
            setLoad(false);
        }
    };

    const onRequestDelete = (user: User) => {
        deleteUser(user).then();
    };

    const onFormSubmit = (partialUser: Partial<User>, userId: any) => {
        const user = userId
            ? new User(
                  partialUser.name ?? '',
                  partialUser.username ?? '',
                  undefined,
                  partialUser.profile_id ?? undefined,
                  partialUser.password ? partialUser.password : undefined,
                  undefined,
                  undefined,
                  userId,
              )
            : new User(
                  partialUser.name ?? '',
                  partialUser.username ?? '',
                  undefined,
                  partialUser.profile_id ?? undefined,
                  partialUser.password ? partialUser.password : undefined,
              );

        createOrUpdateUser(user).then();
    };

    const findAllUsers = async (): Promise<void> => {
        if (!load) setLoad(true);

        try {
            const users = await UserService.findAll();
            setList(users);

            const permission = await PermissionService.findAllForUsers();
            setPermissions(permission);
        } catch (e) {
            setList(null);
        } finally {
            setLoad(false);
        }
    };

    React.useEffect(() => {
        findAllUsers().then();
    }, []);

    return (
        <UserPage
            load={load}
            formLoad={formLoad}
            list={list}
            permissions={permissions ?? []}
            selectedItem={selectedItem}
            requestUpdate={onRequestCreateOrUpdate}
            requestCreate={onRequestCreateOrUpdate}
            requestDelete={onRequestDelete}
            requestTryAgain={findAllUsers}
            showForm={showForm}
            closeForm={closeShowForm}
            screenStrings={screenStrings}
            formSubmit={onFormSubmit}
        />
    );
}

export default UserScreen;
