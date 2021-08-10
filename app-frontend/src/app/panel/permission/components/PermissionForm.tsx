import React, { FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { Grid } from '@material-ui/core';
import MyTextField from '../../../shared/components/MyTextField';
import { ValidationOptions } from '../../../shared/helpers/validation-options';
import ButtonSubmit from '../../../shared/components/ButtonSubmit';
import { Permission } from '../../../shared/model/permission';
import MyMultiSelectField, { MultiOption } from '../../../shared/components/MyMultiSelectField';

type Props = {
    formLoad?: boolean;
    submitBtnRef: React.RefObject<HTMLButtonElement>;
    formSubmit: (permission: Partial<Permission>, permissionId: any, reset?: () => void) => void;
    selectedItem: Permission;
    equips: MultiOption[];
    isUpdate: boolean;
    load?: boolean;
};

function PermissionForm(props: Props) {
    const { register, handleSubmit, reset, control, trigger, errors, watch } = useForm<Permission>({
        defaultValues: props.selectedItem,
    });

    // Sistema de validação personalizado
    const customSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await trigger();

        if (Object.keys(errors).length === 0) {
            await handleSubmit((data) => {
                const permissionId = props.isUpdate ? props.selectedItem.id : 0;
                props.formSubmit(data, permissionId, reset);
            })(e);
        }
    };

    const inputProps = {
        color: 'secondary',
        fullWidth: true,
        variant: 'filled',
        disabled: props.formLoad,
    };

    const multiSelectOptionsActive: MultiOption[] = [
        { value: 0, label: 'View User' },
        { value: 1, label: 'Operator User' },
        { value: 2, label: 'Admin User' },
    ];

    watch();

    return (
        <form autoComplete="off" noValidate onSubmit={customSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <MyTextField
                        register={register}
                        errors={errors}
                        validationOptions={ValidationOptions.minLengthRequiredOptions(6)}
                        label="Description"
                        name="description"
                        disabled={props.formLoad}
                        required
                        {...inputProps}
                    />
                </Grid>
                <Grid item xs={12}>
                    <MyMultiSelectField
                        errors={errors}
                        control={control}
                        options={multiSelectOptionsActive}
                        label="Permission"
                        required
                        name="read_write"
                        {...inputProps}
                    />
                </Grid>
                <Grid item xs={12}>
                    <MyMultiSelectField
                        errors={errors}
                        control={control}
                        options={props.equips}
                        label="Equips Allowed"
                        required
                        name="equips_id"
                        {...inputProps}
                        multiple={true}
                    />
                </Grid>
            </Grid>
            <ButtonSubmit ref={props.submitBtnRef} />
        </form>
    );
}

export default PermissionForm;
