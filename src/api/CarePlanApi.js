import * as config from '../config';
import axios from 'axios';

class CarePlanApi {
  static getHealthTips(conditionType) {
    const axiosOptions = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const request = axios.get(config.API_URL + 'getHealthTips?condition_type=' + conditionType, axiosOptions);

    return request;
  }
}

export default CarePlanApi;
