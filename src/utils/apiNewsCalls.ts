import axios from 'axios';
import constants from './defaultConstants';

const baseURL = constants.DEFAULT_APINEWS_BACKEND_URL;
export const API = axios.create({ baseURL });
API.defaults.headers.common.Token = 'c3c6ade0e32ff0d3d5aa5e1653559515';
API.defaults.headers.common.Secret = '0830161def93d5375d45311653559515';

export const getArticles = async () => {
  const { data } = await API.get('/articles?host=thesimonproject.com&body=1');
  return data.info.items;
};
