/* eslint-disable @typescript-eslint/ban-types */
import { AxiosRequestConfig } from 'axios';

export class ApiUtil {
    static axiosDefaultConfig(token: string, others?: object): Partial<AxiosRequestConfig> {
        return {
            headers: { Authorization: `Bearer ${token}` },
            ...(others ?? {}),
        };
    }
}
