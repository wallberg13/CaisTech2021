import { Role } from '../model/enum/role';
import { RefObject } from 'react';
import * as FileSaver from 'file-saver';
import { Parser } from 'json2csv';
import { MultiOption } from '../components/MyMultiSelectField';

export class Util {
    static isActive(active: number): string {
        switch (active) {
            case 0:
                return '10px solid rgb(195, 74, 74)';
            case 1:
                return '10px solid rgb(139, 195, 74)';
            default:
                return 'none';
        }
    }

    static equipHostname(equips: MultiOption[], equip: number): any {
        if (equip) {
            const equipsSelected = equips.filter((item) => item.value === equip);

            return equipsSelected[0].label;
        }
        return '?';
    }

    static capitalize(s: string): string {
        if (typeof s !== 'string') return '';
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    static roleNumberToBrlString(numberRole: any): string {
        switch (numberRole) {
            case 2:
                return 'Administrador';
            case 1:
                return 'Operador';
            case 0:
                return 'View';
            default:
                return '?';
        }
    }

    static roleToBrlString(role: Role): string {
        switch (role) {
            case Role.Admin:
                return 'Administrador';
            case Role.Operator:
                return 'Operador';
            case Role.View:
                return 'View';
            default:
                return '?';
        }
    }

    static roleToBrlNumber(role: Role): number {
        switch (role) {
            case Role.Admin:
                return 2;
            case Role.Operator:
                return 1;
            case Role.View:
                return 0;
            default:
                return -1;
        }
    }

    static refFormSubmit(btnRef: RefObject<HTMLButtonElement>) {
        const { current: button } = btnRef;
        button && button.click();
    }

    static addItem<T>(item: T, list: T[], onStart = false): T[] {
        return onStart ? [item, ...list] : [...list, item];
    }

    static updateItem<T>(oldItem: T, newItem: T, list: T[]): T[] {
        const index = list.indexOf(oldItem);

        const copyList = [...list];
        copyList.splice(index, 1, newItem);

        return copyList;
    }

    static deleteItem<T>(item: T, list: T[]): T[] {
        const index = list.indexOf(item);

        const copyList = [...list];

        copyList.splice(index, 1);

        return copyList;
    }

    static hasPermission(userRoles: Role[], neededRoles: Role[]): boolean {
        return Boolean(neededRoles.filter((item) => userRoles.includes(item)).length);
    }

    static jsonToCsvDownload(json: any, filename: string): void {
        const parser = new Parser();

        const csv = parser.parse(json);

        const blob = new Blob([csv], { type: 'text/plain;charset=utf-8' });

        FileSaver.saveAs(blob, `${filename}.csv`);
    }
}
