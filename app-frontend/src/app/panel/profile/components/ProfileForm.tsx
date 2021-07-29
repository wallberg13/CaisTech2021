import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Grid, IconButton, InputAdornment } from '@material-ui/core';
import MyTextField from '../../../shared/components/MyTextField';
import { ValidationOptions } from '../../../shared/helpers/validation-options';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Profile } from '../../../shared/model/profile';
import FormCancelButton from '../../../shared/components/FormCancelButton';
import FormConfirmButton from '../../../shared/components/FormConfirmButton';

type Props = {
    formSubmit: (profile: Profile) => void;
    currentData: Profile;
    refreshData: (profile: Profile) => void;
    hasModified: boolean;
};

function ProfileForm(props: Props) {
    const { register, errors, watch, handleSubmit, reset } = useForm<Profile>({
        defaultValues: props.currentData,
    });

    const allFields = watch();

    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    React.useEffect(() => {
        props.refreshData(allFields);
    }, [allFields]);

    const buttonArea = (
        <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end">
                <Box mr={1}>
                    <FormCancelButton onClick={() => reset(props.currentData)} label="Resetar" />
                </Box>
                <FormConfirmButton type="submit" label="Salvar Alterações" />
            </Box>
        </Grid>
    );

    const inputProps = {
        color: 'secondary',
        fullWidth: true,
        variant: 'outlined',
    };

    return (
        <Box width="100%" clone>
            <form autoComplete="off" noValidate onSubmit={handleSubmit(props.formSubmit)}>
                <Grid container spacing={2} direction="column">
                    <Grid item xs={12}>
                        <MyTextField
                            register={register}
                            errors={errors}
                            validationOptions={ValidationOptions.minLengthRequiredOptions(6)}
                            label="Nome"
                            name="name"
                            required
                            {...inputProps}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <MyTextField
                            register={register}
                            errors={errors}
                            validationOptions={ValidationOptions.emailRequiredOptions()}
                            label="Username/Email"
                            type="username"
                            name="username"
                            required
                            {...inputProps}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <MyTextField
                            register={register}
                            errors={errors}
                            label="Nova Senha"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
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
                    {props.hasModified ? buttonArea : null}
                </Grid>
            </form>
        </Box>
    );
}

export default ProfileForm;
