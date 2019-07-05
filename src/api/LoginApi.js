import * as config from '../config';
import axios from 'axios';

class LoginApi {
  static login(username, password, uuid) {
    const axiosBody = {
      username,
      password
    }
    const axiosOptions = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const request = axios.post(config.LOGIN_API_URL + 'login', axiosBody, axiosOptions);

    return request;
  }
}

export default LoginApi;
