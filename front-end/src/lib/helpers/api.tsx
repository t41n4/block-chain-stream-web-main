import { AxiosRequestConfig } from 'axios';


type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE';

const getAxiosParam = (
  url: string,
  method: Methods = 'GET',
  data: any = {},
  token: string = '',
  props?: any
): AxiosRequestConfig => {
  return {
    url: url,
    method: method,
    ...(token && { headers: { Authorization: 'Bearer ' + token } }),
    ...(Object.keys(data).length !== 0 && { data: data }),
    ...(props && { ...props }),
  };
};

export { getAxiosParam };
