import React from 'react';
import ContentFrame from '../../../shared/components/ContentFrame';
import { User } from '../../../shared/model/user';
import UserList from './UserList';
import ActionBar, { ActionButton } from '../../../shared/components/ActionBar';
import { Add } from '@material-ui/icons';
import { lightGreen } from '@material-ui/core/colors';
import UserForm from './UserForm';
import DrawerEmpty from '../../../shared/components/DrawerEmpty';
import { ScreenStrings } from '../../../shared/model/screen-strings';
import { Util } from '../../../shared/helpers/util';
import { MultiOption } from '../../../shared/components/MyMultiSelectField';

type Props = {
    load: boolean;
    formLoad?: boolean;
    list: User[] | null;
    permissions: MultiOption[];
    selectedItem: User;
    requestCreate: () => void;
    requestDelete: (user: User) => void;
    requestUpdate: (user: User) => void;
    formSubmit: (user: Partial<User>, userId: any) => void;
    requestTryAgain: () => void;
    showForm: boolean;
    closeForm: () => void;
    screenStrings: ScreenStrings;
};

function UserPage(props: Props) {
    const { screenStrings } = props;

    const submitBtnRef = React.useRef<HTMLButtonElement>(null);

    const isUpdate = Boolean(props.selectedItem.user_id);

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
                <ActionBar title={screenStrings.singular} buttons={actionButtons} />
                <UserList
                    list={props.list ?? []}
                    requestUpdate={props.requestUpdate}
                    requestDelete={props.requestDelete}
                    permissions={props.permissions ?? []}
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
                <UserForm
                    formLoad={props.formLoad}
                    formSubmit={props.formSubmit}
                    submitBtnRef={submitBtnRef}
                    selectedItem={props.selectedItem}
                    permissions={props.permissions ?? []}
                    isUpdate={isUpdate}
                />
            </DrawerEmpty>
        </React.Fragment>
    );
}

export default UserPage;
