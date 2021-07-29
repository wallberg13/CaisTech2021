import { User } from '../model/user';
import { AuthService } from './auth-service';
import axios from 'axios';
import { MAIN_URL } from '../constants/api';
import { ApiUtil } from '../helpers/api-util';

export class UserService {
    static async findMe(): Promise<User> {
        const token = AuthService.getToken();

        const response = await axios.get(`${MAIN_URL}/users/me`, ApiUtil.axiosDefaultConfig(token));

        return User.fromJson(response.data);
    }

    static async findAll(): Promise<User[]> {
        const token = AuthService.getToken();

        const response = await axios.get<any[]>(`${MAIN_URL}/users`, ApiUtil.axiosDefaultConfig(token));

        return response.data.map((data) => User.fromJsonUsers(data));
    }

    static async create(user: User): Promise<void> {
        const token = AuthService.getToken();

        await axios.post(`${MAIN_URL}/users`, user, ApiUtil.axiosDefaultConfig(token));

        return;
    }

    static async update(user: User): Promise<void> {
        const token = AuthService.getToken();

        const { user_id: userId, ...partialUser } = user;

        await axios.put(`${MAIN_URL}/users/${userId}`, partialUser, ApiUtil.axiosDefaultConfig(token));

        return;
    }

    static async updateMe(user: User, currentPassword: string, userId: any): Promise<User> {
        try {
            const token = AuthService.getToken();

            const partialUser = user.password
                ? {
                      name: user.name,
                      username: user.username,
                      password: user.password,
                      old_password: currentPassword,
                  }
                : {
                      name: user.name,
                      username: user.username,
                  };

            await axios.put(`${MAIN_URL}/users/${userId}`, partialUser, ApiUtil.axiosDefaultConfig(token));

            const updatedUser = await AuthService.checkToken();

            return updatedUser;
        } catch (e) {
            throw e;
        }
    }

    static async delete(user: User): Promise<void> {
        const token = AuthService.getToken();

        await axios.delete<void>(`${MAIN_URL}/users/${user.user_id ?? ''}`, ApiUtil.axiosDefaultConfig(token));

        return;
    }
}
