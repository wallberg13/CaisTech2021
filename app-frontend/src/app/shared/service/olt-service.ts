import axios from 'axios';
import { MAIN_URL } from '../constants/api';
import { ApiUtil } from '../helpers/api-util';
import { Olt } from '../model/olt/olt';
import { AuthService } from './auth-service';
import { MultiOption } from '../components/MyMultiSelectField';

export class OltService {
    static async findAllForPermission(): Promise<MultiOption[]> {
        const token = AuthService.getToken();

        const response = await axios.get<any[]>(`${MAIN_URL}/olts`, ApiUtil.axiosDefaultConfig(token));

        return response.data.map((data) => Olt.fromPermission(data));
    }
}
