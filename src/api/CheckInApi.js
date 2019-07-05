import * as config from '../config';
import axios from 'axios';

class CheckInApi {
  static getCustomerDetails(username) {
    const axiosOptions = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const request = axios.get(config.API_URL + 'getCustomerDetails?userName=' + username, axiosOptions);

    return request;
  }

  static checkIn(name, medications, orderDate) {
    const axiosBody = {
      cust_name: name,
      medications,
      order_date: orderDate
    }
    const axiosOptions = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const request = axios.post(config.API_URL + 'checkin', axiosBody, axiosOptions);

    return request;
  }
}

export default CheckInApi;
