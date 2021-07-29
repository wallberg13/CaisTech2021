import { format, formatISO } from 'date-fns';
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';

export default class ManageDate {
    static getTimeZone(): string {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    }

    static stringDateTime(date: string | Date): string {
        return format(new Date(date), 'dd/MM/yyyy HH:mm');
    }

    static stringDate(date: string | Date): string {
        return format(new Date(date), 'dd/MM/yyyy');
    }

    static localToGlobal(date: Date): Date {
        return zonedTimeToUtc(date, this.getTimeZone());
    }

    static globalToLocal(date: Date): Date {
        return utcToZonedTime(date, this.getTimeZone());
    }

    static toISODate(date: Date): Date {
        return new Date(formatISO(date));
    }
}
