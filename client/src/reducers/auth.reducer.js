import * as types from './../constants/types';

const authReducer = (state = {}, {type, payload}) => {
    console.log("paylod", payload)
    switch(type){
        case types.USER_SIGNUP_LOADING:
        case types.USER_SIGNIN_LOADING:
            return {
                ...state,
                loading: true,
                error: null,
                token: null
            }
        case types.USER_SIGNUP_SUCCESS:
        case types.USER_SIGNIN_SUCCESS:
            return {
                ...state,
                loading: false,
                token: payload
            }
        case types.USER_SIGNUP_FAILURE:
        case types.USER_SIGNIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: true
            }   
        default:
            return state;     
    }
}

export default authReducer;