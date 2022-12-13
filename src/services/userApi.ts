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

function getClassrooms(token: string): Promise<any>{
    return axios.get(`${url}/classroom`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

function createClassroom(token: string, teacherId: number): Promise<any>{
    return axios.post(`${url}/classroom`, teacherId, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
  
const userApi = {
    signUp,
    signIn,
    getClassrooms,
    createClassroom
}
  
export default userApi;