import axios from 'axios';
import { Login } from '../model/login';
import { ResponseToken } from '../model/response-token';
import { MAIN_URL } from '../constants/api';
import { ApiUtil } from '../helpers/api-util';
import { User } from '../model/user';

export class AuthService {
    private static tokenKey = 'token';
    private static tokenValue?: string;

    static getToken(): string {
        if (this.tokenValue) return this.tokenValue;
        return localStorage.getItem(this.tokenKey) ?? '';
    }

    static removeToken(): void {
        this.tokenValue = undefined;
        localStorage.removeItem(this.tokenKey);
    }

    private static setToken(token: string): void {
        this.tokenValue = token;
        localStorage.setItem(this.tokenKey, token);
    }

    static async login(login: Login): Promise<User> {
        try {
            const response = await axios.post<ResponseToken>(`${MAIN_URL}/auth`, login);

            const responseToken = ResponseToken.fromJson(response.data);

            this.setToken(responseToken.token);

            const user = User.fromJson(response.data);

            return user;
        } catch (e) {
            throw e;
        }
    }

    static async logout(): Promise<void> {
        const token = await this.getToken();

        this.removeToken();

        await axios.post(`${MAIN_URL}/auth/logout`, null, ApiUtil.axiosDefaultConfig(token));
    }

    static async refresh(): Promise<void> {
        const token = await this.getToken();

        await axios.post(`${MAIN_URL}/auth/refresh`, null, ApiUtil.axiosDefaultConfig(token));

        // const responseToken = ResponseToken.fromJson(response.data);

        this.setToken(token);
    }

    static async checkToken(): Promise<User> {
        const token = await this.getToken();

        const response = await axios.get(`${MAIN_URL}/auth/verify_token`, ApiUtil.axiosDefaultConfig(token));

        return User.fromJson(response.data);
    }
}
