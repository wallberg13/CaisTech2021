import React from 'react';
import ContentFrame from '../../../shared/components/ContentFrame';
import ActionBar, { ActionButton } from '../../../shared/components/ActionBar';
import { Add } from '@material-ui/icons';
import { lightGreen } from '@material-ui/core/colors';
import DrawerEmpty from '../../../shared/components/DrawerEmpty';
import { ScreenStrings } from '../../../shared/model/screen-strings';
import { Util } from '../../../shared/helpers/util';
import { Permission } from '../../../shared/model/permission';
import PermissionList from './PermissionList';
import PermissionForm from './PermissionForm';
import { MultiOption } from '../../../shared/components/MySelectField';

type Props = {
    load: boolean;
    formLoad?: boolean;
    list: Permission[] | null;
    olts: MultiOption[];
    selectedItem: Permission;
    requestCreate: () => void;
    requestDelete: (permission: Permission) => void;
    requestUpdate: (permission: Permission) => void;
    formSubmit: (permission: Partial<Permission>, permissionId: any) => void;
    requestTryAgain: () => void;
    showForm: boolean;
    closeForm: () => void;
    screenStrings: ScreenStrings;
};

function PermissionPage(props: Props) {
    const { screenStrings } = props;

    const submitBtnRef = React.useRef<HTMLButtonElement>(null);

    const isUpdate = Boolean(props.selectedItem.id);

    const textOfCreate = `New ${screenStrings.singular}`;

    const textOfBtnFormSubmit = isUpdate ? 'Edit' : 'Create';
    const textOfFormTitle = isUpdate ? `Edit ${screenStrings.singular}` : `Create New ${screenStrings.singular}`;

    const actionButtons: ActionButton[] = [
        {
            icon: <Add />,
            label: textOfCreate,
            color: lightGreen,
            onAction: () => props.requestCreate(),
        },
    ];

    return (
        <React.Fragment>
            <ContentFrame
                load={props.load}
                list={props.list}
                buttonCreateText={textOfCreate}
                onCreateClick={() => props.requestCreate()}
                onTryAgainClick={() => props.requestTryAgain()}
            >
                <ActionBar title={`${screenStrings.singular} Permissions`} buttons={actionButtons} />
                <PermissionList
                    list={props.list ?? []}
                    requestUpdate={props.requestUpdate}
                    requestDelete={props.requestDelete}
                    olts={props.olts ?? []}
                />
            </ContentFrame>
            <DrawerEmpty
                load={props.formLoad}
                onAccept={() => Util.refFormSubmit(submitBtnRef)}
                onClose={props.closeForm}
                open={props.showForm}
                acceptButtonText={textOfBtnFormSubmit}
                title={textOfFormTitle}
            >
                <PermissionForm
                    formLoad={props.formLoad}
                    formSubmit={props.formSubmit}
                    submitBtnRef={submitBtnRef}
                    selectedItem={props.selectedItem}
                    olts={props.olts ?? []}
                    isUpdate={isUpdate}
                />
            </DrawerEmpty>
        </React.Fragment>
    );
}

export default PermissionPage;
