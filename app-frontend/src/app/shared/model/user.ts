import { Role } from './enum/role';

export class User {
    user_id?: string;
    name: string;
    username: string;
    password?: string;
    read_write?: Role[];
    createdAt?: Date;
    updatedAt?: Date;
    profile_id?: number | string;

    static fromJson(data: any): User {
        return new User(
            data.user.name,
            data.user.username,
            data.user.read_write,
            data.profile_id,
            undefined,
            new Date(data.user.createdAt),
            new Date(data.user.updatedAt),
            data.user.user_id,
        );
    }

    static fromJsonUsers(data: any): User {
        return new User(
            data.name,
            data.username,
            data.read_write,
            data.profile_id,
            undefined,
            new Date(data.createdAt),
            new Date(data.updatedAt),
            data.user_id,
        );
    }

    constructor(
        name: string,
        username: string,
        read_write?: Role[],
        profile_id?: number | string,
        password?: string,
        createdAt?: Date,
        updatedAt?: Date,
        user_id?: string,
    ) {
        this.name = name;
        this.username = username;
        this.read_write = read_write;
        this.profile_id = profile_id;
        this.user_id = user_id;
        this.password = password;
        this.createdAt = createdAt ? new Date(createdAt) : undefined;
        this.updatedAt = updatedAt ? new Date(updatedAt) : undefined;
    }
}
