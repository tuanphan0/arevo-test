import axios from 'axios';
import qs from 'qs';
import AppConsts from '../lib/appConst';

const http = axios.create({
    baseURL: AppConsts.remoteServiceBaseUrl,
    timeout: 30000,
    paramsSerializer(params) {
        return qs.stringify(params, {
            encode: false,
        });
    },
});
export default http;
