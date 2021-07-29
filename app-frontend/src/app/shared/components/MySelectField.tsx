import { FormHelperText } from '@material-ui/core';
import React from 'react';
import { DeepMap } from 'react-hook-form/dist/types/utils';
import { Controller } from 'react-hook-form';
import Select from 'react-select';

export type MultiOption = {
    label: string | number;
    value: number | string;
};

type Props = {
    options: MultiOption[];
    errors: DeepMap<any, any>;
    disabled?: boolean;
    autoFocus?: boolean;
    label: string;
    name: string;
    control: any;
    fullWidth?: boolean;
    color?: 'secondary' | 'primary' | any;
    variant?: 'filled' | 'standard' | 'outlined' | any;
    required?: boolean;
    InputProps?: any;
};

function MySelectField(props: Props) {
    const errors = props?.errors;

    const name = props.name;

    const options = props.options;

    const optionList = options.map((option) => option.value);

    const hasError = !!errors[name];

    return (
        <>
            <Controller
                name={name}
                as={Select}
                defaultValue=""
                options={optionList}
                control={props.control}
                rules={{ required: true }}
            />
            {hasError && <FormHelperText>{errors[name].message}</FormHelperText>}
        </>
    );
}

export default MySelectField;
