import React from 'react';
import { ScreenStrings } from '../../shared/model/screen-strings';
import { useSnackbar } from 'material-ui-snackbar-provider';
import { Util } from '../../shared/helpers/util';
import { Permission } from '../../shared/model/permission';
import { PermissionService } from '../../shared/service/permission-service';
import PermissionPage from './components/PermissionPage';
import { OltService } from '../../shared/service/olt-service';
import { MultiOption } from '../../shared/components/MyMultiSelectField';

function PermissionScreen() {
    const screenStrings = new ScreenStrings('Profile', 'Profiles');
    const defaultPermission = new Permission('', [], 0);

    const [load, setLoad] = React.useState<boolean>(true);
    const [formLoad, setFormLoad] = React.useState<boolean>(false);

    const [list, setList] = React.useState<Permission[] | null>([]);
    const [olts, setOlts] = React.useState<MultiOption[] | null>([]);
    const [selectedItem, setSelectedItem] = React.useState<Permission>(defaultPermission);
    const [showForm, setShowForm] = React.useState(false);
    const snackbar = useSnackbar();

    const closeShowForm = () => setShowForm(false);

    const createOrUpdateUser = async (permission: Permission, permissionId: any): Promise<void> => {
        const isUpdate = Boolean(permissionId);

        setFormLoad(true);

        try {
            isUpdate
                ? await PermissionService.update(permission, permissionId)
                : await PermissionService.create(permission);

            snackbar.showMessage(
                isUpdate
                    ? `${screenStrings.singular} atualizado com sucesso!`
                    : `${screenStrings.singular} criado com sucesso!`,
            );

            await findAllPermissions().then();

            setShowForm(false);
        } catch ({ response }) {
            snackbar.showMessage(`[ SYSTEM ] ${response.data.message}`);
        } finally {
            setFormLoad(false);
        }
    };

    const onRequestCreateOrUpdate = (permission?: Permission) => {
        setSelectedItem(permission ? permission : defaultPermission);
        setShowForm(true);
    };

    const deletePermission = async (permission: Permission): Promise<void> => {
        const currentList = list ?? [];

        setLoad(true);

        try {
            await PermissionService.delete(permission);

            const changedList = Util.deleteItem<Permission>(permission, currentList);

            setList(changedList);

            snackbar.showMessage(`${screenStrings.singular} deletado com sucesso!`);
        } catch ({ response }) {
            snackbar.showMessage(`[ SYSTEM ] ${response.data.message}`);
        } finally {
            setLoad(false);
        }
    };

    const onRequestDelete = (permission: Permission) => {
        deletePermission(permission).then();
    };

    const onFormSubmit = (partialPermission: Partial<Permission>, permissionId: any) => {
        const permission = new Permission(
            partialPermission.description ?? '',
            partialPermission.equips_id ?? [],
            partialPermission.read_write ?? 0,
        );

        createOrUpdateUser(permission, permissionId).then();
    };

    const findAllPermissions = async (): Promise<void> => {
        if (!load) setLoad(true);

        try {
            const permissions = await PermissionService.findAll();
            setList(permissions);

            const olts = await OltService.findAllForPermission();
            setOlts(olts);
        } catch (e) {
            setList(null);
        } finally {
            setLoad(false);
        }
    };

    React.useEffect(() => {
        findAllPermissions().then();
    }, []);

    return (
        <PermissionPage
            load={load}
            formLoad={formLoad}
            list={list}
            olts={olts ?? []}
            selectedItem={selectedItem}
            requestUpdate={onRequestCreateOrUpdate}
            requestCreate={onRequestCreateOrUpdate}
            requestDelete={onRequestDelete}
            requestTryAgain={findAllPermissions}
            showForm={showForm}
            closeForm={closeShowForm}
            screenStrings={screenStrings}
            formSubmit={onFormSubmit}
        />
    );
}

export default PermissionScreen;
