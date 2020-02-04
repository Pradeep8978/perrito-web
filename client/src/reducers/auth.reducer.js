import * as types from './../constants/types';

const authReducer = (state = {}, {type, payload}) => {
    switch(type){
        case types.USER_SIGNUP_LOADING:
        case types.USER_SIGNIN_LOADING:
            return {
                loading: true,
                error: null,
                token: null
            }
        case types.USER_SIGNUP_SUCCESS:
        case types.USER_SIGNIN_SUCCESS:
            return {
                loading: false,
                token: payload
            }
        case types.USER_SIGNUP_FAILURE:
        case types.USER_SIGNIN_FAILURE:
            return {
                loading: false,
                error: payload
            }   
        default:
            return state;     
    }
}

export default authReducer;