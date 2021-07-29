import axios from 'axios';
import { MultiOption } from '../components/MyMultiSelectField';
import { MAIN_URL } from '../constants/api';
import { ApiUtil } from '../helpers/api-util';
import { Permission } from '../model/permission';
import { AuthService } from './auth-service';

export class PermissionService {
    static async findAll(): Promise<any[]> {
        const token = AuthService.getToken();

        const response = await axios.get<any[]>(`${MAIN_URL}/profiles`, ApiUtil.axiosDefaultConfig(token));

        return response.data.map((data) => Permission.fromJson(data));
    }

    static async findAllForUsers(): Promise<MultiOption[]> {
        const token = AuthService.getToken();

        const response = await axios.get<any[]>(`${MAIN_URL}/profiles`, ApiUtil.axiosDefaultConfig(token));

        return response.data.map((data) => Permission.fromUsers(data));
    }

    static async delete(permission: Permission): Promise<void> {
        const token = AuthService.getToken();

        await axios.delete<void>(`${MAIN_URL}/profiles/${permission.id ?? ''}`, ApiUtil.axiosDefaultConfig(token));

        return;
    }

    static async create(permission: Permission): Promise<void> {
        const token = AuthService.getToken();

        await axios.post(`${MAIN_URL}/profiles`, permission, ApiUtil.axiosDefaultConfig(token));

        return;
    }

    static async update(permission: Permission, permissionId: any): Promise<void> {
        const token = AuthService.getToken();

        await axios.put(`${MAIN_URL}/profiles/${permissionId}`, permission, ApiUtil.axiosDefaultConfig(token));

        return;
    }
}
