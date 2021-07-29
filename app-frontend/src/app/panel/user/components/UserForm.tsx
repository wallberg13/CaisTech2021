import React, { FormEvent } from 'react';
import { User } from '../../../shared/model/user';
import { useForm } from 'react-hook-form';
import { Grid, IconButton, InputAdornment } from '@material-ui/core';
import MyTextField from '../../../shared/components/MyTextField';
import { ValidationOptions } from '../../../shared/helpers/validation-options';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import ButtonSubmit from '../../../shared/components/ButtonSubmit';
import MyMultiSelectField, { MultiOption } from '../../../shared/components/MyMultiSelectField';

type Props = {
    formLoad?: boolean;
    submitBtnRef: React.RefObject<HTMLButtonElement>;
    formSubmit: (user: Partial<User>, userId: any, reset: () => void) => void;
    selectedItem: User;
    permissions: MultiOption[];
    isUpdate: boolean;
    load?: boolean;
};

function UserForm(props: Props) {
    const { register, handleSubmit, reset, watch, trigger, control, errors } = useForm<User>({
        defaultValues: props.selectedItem,
    });

    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    // Sistema de validação personalizado
    const customSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await trigger();

        if (Object.keys(errors).length === 0) {
            await handleSubmit((data) => {
                const userId = props.isUpdate ? props.selectedItem.user_id : undefined;
                props.formSubmit(data, userId, reset);
            })(e);
        }
    };

    const inputProps = {
        color: 'secondary',
        fullWidth: true,
        variant: 'filled',
        disabled: props.formLoad,
    };

    watch();

    return (
        <form autoComplete="off" noValidate onSubmit={customSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <MyTextField
                        register={register}
                        errors={errors}
                        validationOptions={ValidationOptions.requiredOptions()}
                        label="Nome"
                        name="name"
                        disabled={props.formLoad}
                        required
                        {...inputProps}
                    />
                </Grid>
                <Grid item xs={12}>
                    <MyTextField
                        register={register}
                        errors={errors}
                        validationOptions={ValidationOptions.requiredOptions()}
                        label="Username/Email"
                        type="email"
                        name="username"
                        disabled={props.formLoad}
                        {...inputProps}
                    />
                </Grid>
                <Grid item xs={12}>
                    <MyTextField
                        register={register}
                        errors={errors}
                        label="Senha"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        disabled={props.formLoad}
                        required
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        {...inputProps}
                    />
                </Grid>
                <Grid item xs={12}>
                    <MyMultiSelectField
                        errors={errors}
                        control={control}
                        options={props.permissions}
                        label="Permission"
                        required
                        name="profile_id"
                        {...inputProps}
                    />
                </Grid>
            </Grid>
            <ButtonSubmit ref={props.submitBtnRef} />
        </form>
    );
}

export default UserForm;
