/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { InputBaseComponentProps, InputProps, TextField } from '@material-ui/core';
import { DeepMap } from 'react-hook-form/dist/types/utils';

type Props = {
    errors: DeepMap<any, any>;
    register: any;
    name: any;
    validationOptions?: any;
    disabled?: boolean;
    autoFocus?: boolean;
    label: string;
    fullWidth?: boolean;
    color?: any;
    variant?: any;
    required?: boolean;
    InputProps?: InputProps;
    inputProps?: InputBaseComponentProps;
    type?: any;
    multiline?: any;
    rows?: any;
    className?: any;
    defaultValue?: any;
    returned?: any;
};

export default function MyTextField({
    errors,
    register,
    name,
    validationOptions,
    disabled,
    autoFocus,
    label,
    fullWidth,
    color,
    variant,
    required,
    InputProps,
    inputProps,
    type,
    multiline,
    rows,
    className,
    defaultValue,
}: Props): JSX.Element {
    const customErrors = errors[name] ? errors : errors['oltCredentials'] ?? errors['oltSettings'];
    const customName = name.split('.').pop();

    //const refsRegister = Object.assign({}, validationOptions ?? {}, returned ?? {});

    return (
        <TextField
            error={customErrors ? !!customErrors[customName] : !!customErrors}
            helperText={customErrors && customErrors[customName] ? customErrors[customName].message : undefined}
            name={name}
            inputRef={register(validationOptions)}
            disabled={disabled}
            label={label}
            autoFocus={autoFocus}
            fullWidth={fullWidth}
            color={color}
            variant={variant}
            required={required}
            InputProps={InputProps}
            inputProps={inputProps}
            type={type}
            multiline={multiline}
            rows={rows}
            className={className}
            InputLabelProps={{ shrink: true }}
            defaultValue={defaultValue}
        />
    );
}
