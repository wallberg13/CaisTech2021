import React from 'react';
import ContentFrame from '../../../shared/components/ContentFrame';
import { User } from '../../../shared/model/user';
import ProfileCover from './ProfileCover';
import { Box, Card, CardContent, CardHeader } from '@material-ui/core';
import ProfileForm from './ProfileForm';
import { Profile } from '../../../shared/model/profile';
import CurrentPasswordDialog from './CurrentPasswordDialog';

type Props = {
    load: boolean;
    formSubmit: (profile: Profile, currentPassword: string) => void;
    currentUser: User;
    currentProfile: Profile;
    refreshProfile: (profile: Profile) => void;
    hasModified: boolean;
};

function ProfilePage(props: Props) {
    const { currentUser, hasModified, currentProfile, refreshProfile } = props;
    const [showPasswordDialog, setShowPasswordDialog] = React.useState<boolean>(false);
    const [partialSubmitData, setPartialSubmitData] = React.useState<Profile>(new Profile('', '', ''));

    const submitInterceptor = (profile: Profile) => {
        setPartialSubmitData(profile);
        setShowPasswordDialog(true);
    };

    const onCancelShowPasswordDialog = () => setShowPasswordDialog(false);

    const onSubmitCurrentPassword = (currentPassword: string) => {
        props.formSubmit(partialSubmitData, currentPassword);
    };

    return (
        <React.Fragment>
            <ContentFrame
                load={props.load}
                list={[null]} // Serve para que essa tela não fique como vázia.
            >
                <ProfileCover user={currentUser} />
                <Box mt={2} mb={1}>
                    <Card>
                        <CardHeader title="Suas Informações" />
                        <CardContent>
                            <ProfileForm
                                formSubmit={submitInterceptor}
                                currentData={currentProfile}
                                refreshData={refreshProfile}
                                hasModified={hasModified}
                            />
                        </CardContent>
                    </Card>
                </Box>
            </ContentFrame>
            <CurrentPasswordDialog
                open={showPasswordDialog}
                onClose={onCancelShowPasswordDialog}
                onSubmitCurrentPassword={onSubmitCurrentPassword}
            />
        </React.Fragment>
    );
}

export default ProfilePage;
