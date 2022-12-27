import axios from 'axios';

export const endpoints = {
  async getData(): Promise<any[]> {
    return axios
      .get('/react-custom-table/api/data')
      .then((response) => Promise.resolve([...response.data]));
  },
};
