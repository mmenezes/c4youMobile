import * as config from '../config';
import axios from 'axios';

class DashboardApi {
  static addLogReadings(name, type, value, remarks) {
    const axiosBody = {
      cust_name: name,
      type,
      value,
      remarks
    }
    const axiosOptions = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const request = axios.post(config.API_URL + 'addLogReadings', axiosBody, axiosOptions);

    return request;
  }
}

export default DashboardApi;
