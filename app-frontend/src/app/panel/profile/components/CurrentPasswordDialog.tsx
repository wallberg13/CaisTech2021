import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useForm } from 'react-hook-form';
import { IconButton, InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff, VpnKey } from '@material-ui/icons';
import { ValidationOptions } from '../../../shared/helpers/validation-options';
import MyTextField from '../../../shared/components/MyTextField';

type Props = {
    open: boolean;
    onClose: () => void;
    onSubmitCurrentPassword: (currentPassword: string) => void;
};

export default function CurrentPasswordDialog(props: Props): JSX.Element {
    const { register, handleSubmit, errors } = useForm<{
        currentPassword: string;
    }>({
        defaultValues: {
            currentPassword: '',
        },
    });

    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    const onSubmit = handleSubmit(({ currentPassword }) => {
        props.onClose();
        props.onSubmitCurrentPassword(currentPassword);
    });

    return (
        <Dialog open={props.open} onClose={() => props.onClose()}>
            <form noValidate onSubmit={onSubmit}>
                <DialogTitle>Digite sua senha atual</DialogTitle>
                <DialogContent>
                    <MyTextField
                        errors={errors}
                        register={register}
                        validationOptions={ValidationOptions.requiredOptions()}
                        label="Senha Atual"
                        fullWidth
                        type={showPassword ? 'text' : 'password'}
                        color="secondary"
                        variant="filled"
                        name="currentPassword"
                        required
                        autoFocus
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <VpnKey />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => props.onClose()}>Cancelar</Button>
                    <Button type="submit" color="secondary">
                        Confirmar Alterações
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
