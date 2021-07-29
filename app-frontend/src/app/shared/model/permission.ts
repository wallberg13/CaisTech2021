import { MultiOption } from '../components/MyMultiSelectField';

export class Permission {
    id?: number;
    description: string;
    olts_id: number[];
    read_write: number;
    active?: number;
    createdAt?: Date;
    updatedAt?: Date;
    deleted?: number;

    constructor(
        description: string,
        olts_id: number[],
        read_write: number,
        id?: number,
        active?: number,
        createdAt?: Date,
        updatedAt?: Date,
        deleted?: number,
    ) {
        this.id = id;
        this.description = description;
        this.olts_id = olts_id;
        this.read_write = read_write;
        this.active = active;
        this.createdAt = createdAt ? new Date(createdAt) : undefined;
        this.updatedAt = updatedAt ? new Date(updatedAt) : undefined;
        this.deleted = deleted;
    }

    static fromJson(data: any): Permission {
        return new Permission(
            data.description,
            data.olts_id,
            data.read_write,
            data.id,
            data.active,
            new Date(data.createdAt),
            new Date(data.updatedAt),
            data.deleted,
        );
    }

    static fromUsers(data: any): MultiOption {
        return {
            value: data.id,
            label: data.description,
        };
    }
}
