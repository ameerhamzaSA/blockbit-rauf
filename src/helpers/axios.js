import { API_URL } from '../constants/defaultValues';
import axios from 'axios';

export default class API {
  constructor() {}

  async get(url, header) {
    if (header && header['Authorization']) {
      axios.defaults.headers.common['Authorization'] = header['Authorization'];
    }
    else{
      axios.defaults.headers.common['Authorization'] = '';
    }
    try {
      const response = await axios.get(`${API_URL}/${url}`, header);
      response.error = null;
      return response;
    } catch (err) {
      let error = err.response;
      error.error = error.statusText;
      return error;
    }
  }

  async post(url, formData, header) {
    if (header && header['Authorization']) {
      axios.defaults.headers.common['Authorization'] = header['Authorization'];
    }
    else{
      axios.defaults.headers.common['Authorization'] = '';
    }
    // if(header && header['Content-Type']){
    //   axios.defaults.headers.common['Content-Type'] = header['Content-Type'];
    // }
    try {
      const response = await axios.post(`${API_URL}/${url}`, formData, header);
      response.error = null;
      return response;
    } catch (err) {
      let error = err.response;
      error.error = error.statusText;
      return error;
    }
  }
}
