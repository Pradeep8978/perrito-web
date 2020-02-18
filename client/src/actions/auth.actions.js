import * as types from './../constants/types';
import Axios from 'axios'

const signupLoading = () => ({
    type: types.USER_SIGNUP_LOADING
});

const signupSuccess = (data) => ({
    type: types.USER_SIGNUP_SUCCESS,
    payload: data
});

const signupFailure = error => ({
    type: types.USER_SIGNUP_FAILURE,
    paylod: error
});

const signinLoading = () => ({
    type: types.USER_SIGNIN_LOADING
});

const signinSuccess = (data) => ({
    type: types.USER_SIGNIN_SUCCESS,
    payload: data
});

const signinFailure = error => ({
    type: types.USER_SIGNIN_FAILURE,
    paylod: error
});

const setAuthHeader = (token) => {
    Axios.defaults.headers.Authorization = token;
    localStorage.setItem('token', token);
}


export const signupUser = (bodyParams) => dispatch => {
    dispatch(signupLoading());
    const url = '/admin/signup';
    return Axios.post(url, bodyParams)
    .then(res => {
        dispatch(signupSuccess(res.data.token));
        setAuthHeader(res.data.token);
        return res;
    })
    .catch(err => {
        dispatch(signupFailure(err));
        throw err;
    })
}

export const signinUser = (bodyParams) => dispatch => {
    dispatch(signinLoading());
    const url = '/admin/signin';
    return Axios.post(url, bodyParams)
    .then(res => {
        dispatch(signinSuccess(res.data.token));
        setAuthHeader(res.data.token);
        return res;
    })
    .catch(err => {
        dispatch(signinFailure(err));
        throw err;
    })
}


export const createUser = (bodyParams) => {
    const url = '/product/create' ;
     return Axios.post(url, bodyParams)
     .then(res => {
         return res;
     })
     .catch(err => {
         throw err;
     })
}