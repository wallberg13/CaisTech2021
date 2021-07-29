import { Box, Button, CircularProgress, Grid, IconButton, InputAdornment } from '@material-ui/core';
import React from 'react';
import MyTextField from '../../shared/components/MyTextField';
import { ValidationOptions } from '../../shared/helpers/validation-options';
import { AlternateEmail, ArrowRight, Visibility, VisibilityOff, VpnKey } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import { Login } from '../../shared/model/login';

const useStyles = makeStyles({
    progress: {
        color: '#fff',
    },
});

type Props = {
    load?: boolean;
    // eslint-disable-next-line @typescript-eslint/ban-types
    formSubmit: (login: Login, reset: Function) => any;
};

function LoginForm({ load, formSubmit }: Props) {
    const classes = useStyles();

    const { register, handleSubmit, reset, errors } = useForm({
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    const onSubmit = handleSubmit(({ username, password }: Login) => {
        username = username.toLowerCase();

        const login = new Login(username, password);

        formSubmit(login, reset);
    });

    return (
        <form noValidate onSubmit={onSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <MyTextField
                        errors={errors}
                        register={register}
                        validationOptions={ValidationOptions.emailRequiredOptions()}
                        disabled={load}
                        autoFocus
                        label="Email"
                        fullWidth
                        color="secondary"
                        name="username"
                        variant="outlined"
                        type="email"
                        required
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AlternateEmail />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <MyTextField
                        errors={errors}
                        register={register}
                        validationOptions={ValidationOptions.minLengthRequiredOptions(4)}
                        disabled={load}
                        label="Senha"
                        fullWidth
                        type={showPassword ? 'text' : 'password'}
                        color="secondary"
                        variant="outlined"
                        name="password"
                        required
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <VpnKey />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center">
                        <Button disabled={load} variant="outlined" type="submit" endIcon={<ArrowRight />}>
                            Entrar
                        </Button>
                        {!load ? null : (
                            <Box ml={1} clone>
                                <CircularProgress size={20} thickness={5} className={classes.progress} />
                            </Box>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </form>
    );
}

export default LoginForm;
