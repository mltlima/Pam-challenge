import axios from 'axios';

import url from './api';

interface User {
    username: string;
    password: string;
}

function signUp(userSignUp: User){
    return axios.post(`${url}/signup`, userSignUp);
}
  
function signIn(userSignIn: User){
    return axios.post(`${url}/signin`, userSignIn);
}

function getBalance(token: string): Promise<any>{
    return axios.get(`${url}/accounts/balance`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

function transfer(token: string, transferData: any): Promise<any>{
    return axios.post(`${url}/accounts/transfer`, transferData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

function getTransactions(token: string): Promise<any>{
    return axios.get(`${url}/accounts/history`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
  
const userApi = {
    signUp,
    signIn,
    getBalance,
    transfer,
    getTransactions
}
  
export default userApi;