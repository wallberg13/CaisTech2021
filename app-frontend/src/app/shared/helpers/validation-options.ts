export class ValidationOptions {
    private static requiredMessage = 'Campo Obrigatório';
    private static emailMessage = 'O Campo Precisa ser um Email';
    private static minLengthMessage = (value: number) => `O Campo Precisa ter no mínimo ${value} Caracteres`;
    private static minMessage = (value: number) => `O menor número para esse campo é ${value}`;
    private static maxMessage = (value: number) => `O maior número para esse campo é ${value}`;

    static requiredOptions(): any {
        return { required: { value: true, message: this.requiredMessage } };
    }

    static verifyField(field: any) {
        if (/^ *$/.test(field)) {
            return null;
        }
        return field;
    }

    static emailOptions(): any {
        return {
            pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
                message: this.emailMessage,
            },
        };
    }

    static emailRequiredOptions(): any {
        return {
            ...this.emailOptions(),
            ...this.requiredOptions(),
        };
    }

    static minLengthOptions(value = 4): any {
        return {
            minLength: {
                value,
                message: this.minLengthMessage(value),
            },
        };
    }

    static minLengthRequiredOptions(value = 4): any {
        return {
            ...this.minLengthOptions(value),
            ...this.requiredOptions(),
        };
    }

    static minAndMaxOptions(min?: number, max?: number): any {
        const maxObject = max === undefined ? {} : { max: { value: max, message: this.maxMessage(max) } };
        const minObject = min === undefined ? {} : { min: { value: min, message: this.minMessage(min) } };

        return {
            ...maxObject,
            ...minObject,
        };
    }

    static minAndMaxRequiredOptions(min?: number, max?: number): any {
        return {
            ...this.minAndMaxOptions(min, max),
            ...this.requiredOptions(),
        };
    }
}
