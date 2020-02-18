import * as types from '../constants/types';

const INITIAL_STATE = {
    productList: [],
    createLoading: false,
    createError: null,
    updateLoading: false,
    updateError: null,
    deleteLoading: false,
    deleteError: null,
    ViewDetails: null
}

const ProductsReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case types.FETCH_PRODUCT_LIST_LOADING:
            return {
                ...state,
                loading: true,
                error: null,
                productList: []
            }
        case types.FETCH_PRODUCT_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                productList: payload
            }
        case types.FETCH_PRODUCT_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload
            }

        case types.CREATE_NEW_PRODUCT_LOADING:
            return {
                ...state,
                createLoading: true,
                createError: null,
            }
        case types.CREATE_NEW_PRODUCT_SUCCESS:
            return {
                ...state,
                createLoading: false
            }
        case types.CREATE_NEW_PRODUCT_FAILURE:
            return {
                ...state,
                createLoading: false,
                createError: payload
            }
        
      case types.PRESERVE_PRODUCT_DETAILS:
        return {
            ...state,
             ViewDetails : payload,
            
        }


        case types.UPDATE_PRODUCT_LOADING:
            return {
                ...state,
                updateLoading: true,
                updateError: null,
            }
        case types.UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                updateLoading: false
            }
        case types.UPDATE_PRODUCT_FAILURE:
            return {
                ...state,
                updateLoading: false,
                updateError: payload
            }


        case types.DELETE_PRODUCT_LOADING:
            return {
                ...state,
                deleteLoading: true,
                deleteError: null,
            }
        case types.DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                deleteLoading: false
            }
        case types.DELETE_PRODUCT_FAILURE:
            return {
                ...state,
                deleteLoading: false,
                deleteError: payload
            }

        default:
            return state;
    }
}

export default ProductsReducer;