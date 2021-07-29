/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Box,
    Checkbox,
    FilledInput,
    OutlinedInput,
    Input,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
    FormHelperText,
} from '@material-ui/core';
import React from 'react';
import { DeepMap } from 'react-hook-form/dist/types/utils';
import { Controller } from 'react-hook-form';

export type MultiOption = {
    label: string | number;
    value: number | string;
};

const ITEM_HEIGHT = 38;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        },
    },
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
    multiple?: boolean;
};

function MyMultiSelectField(props: Props) {
    const color = props.color ?? 'primary';
    const fullWidth = props.fullWidth ?? false;
    const variant = props.variant ?? 'standard';

    const inputProps = props.InputProps ? props.InputProps : {};

    const errors = props?.errors;

    const name = props.name;

    const options = props.options;

    let inputType: JSX.Element;

    switch (variant) {
        case 'filled':
            inputType = (
                <FilledInput
                    required={props.required}
                    autoFocus={props.autoFocus}
                    fullWidth={fullWidth}
                    {...inputProps}
                />
            );
            break;
        case 'outlined':
            inputType = (
                <OutlinedInput
                    required={props.required}
                    autoFocus={props.autoFocus}
                    fullWidth={fullWidth}
                    {...inputProps}
                />
            );
            break;
        default:
            inputType = (
                <Input required={props.required} autoFocus={props.autoFocus} fullWidth={fullWidth} {...inputProps} />
            );
    }

    const optionList = options.map((option) => option.value);

    const renderValue = (selected: any): string => {
        if (props.multiple) {
            const values = selected as string[];

            const indexes = values.map((value: string) => optionList.indexOf(value));

            const labels = indexes.map((i: number) => options[i].label);

            return labels.join(', ');
        }

        const labelSelected = options.filter((model) => model.value === selected);

        return String(labelSelected[0].label);
    };

    const hasError = !!errors[name];

    return (
        <Controller
            name={name}
            control={props.control}
            rules={{ required: props.required }}
            render={(controlProps) => {
                const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
                    props.multiple
                        ? controlProps.onChange(event.target.value as string[])
                        : controlProps.onChange(event.target.value);
                };

                const value = controlProps.value;

                const optionItems = optionList.map((optionItem) => {
                    const label = options[optionList.indexOf(optionItem)].label;

                    return (
                        <MenuItem key={optionItem} value={optionItem}>
                            {props.multiple ? (
                                <Checkbox checked={value.indexOf(optionItem) > -1} />
                            ) : (
                                <Checkbox checked={value === optionItem} />
                            )}
                            <ListItemText primary={label} />
                        </MenuItem>
                    );
                });

                return (
                    <Box minWidth={120} width={fullWidth ? '100%' : 150} clone>
                        <FormControl
                            variant={variant}
                            color={color}
                            disabled={props.disabled}
                            required={props.required}
                            error={hasError}
                        >
                            <InputLabel variant={variant} required={props.required}>
                                {props.label}
                            </InputLabel>
                            <Select
                                multiple={props.multiple ?? false}
                                value={controlProps.value}
                                onChange={handleChange}
                                variant={variant}
                                input={inputType}
                                renderValue={renderValue}
                                MenuProps={MenuProps}
                                disabled={props.disabled}
                                onBlur={controlProps.onBlur}
                            >
                                <MenuItem value="" disabled>
                                    <Checkbox checked={false} />
                                    <ListItemText primary="Please select" />
                                </MenuItem>
                                {optionItems}
                            </Select>
                            {hasError && <FormHelperText>{errors[name].message}</FormHelperText>}
                        </FormControl>
                    </Box>
                );
            }}
        />
    );
}

export default MyMultiSelectField;
