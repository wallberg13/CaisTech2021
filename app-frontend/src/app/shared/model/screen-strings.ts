export class ScreenStrings {
    singular: string;
    plural: string;

    constructor(singular?: string, plural?: string) {
        this.singular = singular ?? '?';
        this.plural = plural ?? '?';
    }
}
