import { DOMAIN, LOGIN, MODULEAUTH, REGISTER } from '@/constant/app.constant';
import axios from 'axios';

export const authService = {
  register: (data: {
    address: string;
    password: string;
    name: string;
    email: string;
    phone: string;
  }) => {
    return axios.post(`${DOMAIN}/${MODULEAUTH}/${REGISTER}`, data); 
  },
  login : (data : {
    email: string;
    password: string;
  }) => {
    return axios.post(`${DOMAIN}/${MODULEAUTH}/${LOGIN}`, data)
  }
};