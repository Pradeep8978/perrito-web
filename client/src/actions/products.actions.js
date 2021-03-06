import * as types from '../constants/types';
import Axios from 'axios'

// preserve state 
export const preserveProductDetails = ( data )=> ({
    type: types.PRESERVE_PRODUCT_DETAILS,
    payload:  data,
})

//fetch reviews
const fetchReviewsLoading = () => ({
    type: types.FETCH_REVIEWS_LOADING
});

const fetchReviewsSuccess = (data) => ({
    type: types.FETCH_REVIEWS_SUCCESS,
    payload: data
});

const fetchReviewsFailure = error => ({
    type: types.FETCH_REVIEWS_FAILURE,
    paylod: error
});
//fetch Order list
const fetchOrderLoading = () => ({
    type: types.FETCH_ORDER_LIST_LOADING
});

const fetchOrderSuccess = (data) => ({
    type: types.FETCH_ORDER_LIST_SUCCESS,
    payload: data
});

const fetchOrderFailure = error => ({
    type: types.FETCH_ORDER_LIST_FAILURE,
    paylod: error
});


//fetch product list
const fetchProductsLoading = () => ({
    type: types.FETCH_PRODUCT_LIST_LOADING
});

const fetchProductsSuccess = (data) => ({
    type: types.FETCH_PRODUCT_LIST_SUCCESS,
    payload: data
});

const fetchProductsFailure = error => ({
    type: types.FETCH_PRODUCT_LIST_FAILURE,
    paylod: error
});

//create Product
const createProductLoading = () => ({
    type: types.CREATE_NEW_PRODUCT_LOADING
});

const createProductSuccess = (data) => ({
    type: types.CREATE_NEW_PRODUCT_SUCCESS,
    payload: data
});

const createProductFailure = error => ({
    type: types.CREATE_NEW_PRODUCT_FAILURE,
    paylod: error
});

//Update Product
const updateProductLoading = () => ({
    type: types.UPDATE_PRODUCT_LOADING
});

const updateProductSuccess = (data) => ({
    type: types.UPDATE_PRODUCT_SUCCESS,
    payload: data
});

const updateProductFailure = error => ({
    type: types.UPDATE_PRODUCT_FAILURE,
    paylod: error
});

//Delete Product
const deleteProductLoading = () => ({
    type: types.DELETE_PRODUCT_LOADING
});

const deleteProductSuccess = (data) => ({
    type: types.DELETE_PRODUCT_SUCCESS,
    payload: data
});

const deleteProductFailure = error => ({
    type: types.DELETE_PRODUCT_FAILURE,
    paylod: error
});

export const fetchProducts = () => dispatch => {
    dispatch(fetchProductsLoading());
    const url = '/products/list';
    return Axios.get(url)
    .then(res => {
        dispatch(fetchProductsSuccess(res.data));
        return res; 
    })
    .catch(err => {
        dispatch(fetchProductsFailure(err));
        throw err;
    })
}

export const createNewProduct = (bodyParams) => dispatch => {
    dispatch(createProductLoading());
    const url = '/products/create';
    return Axios.post(url, bodyParams)
    .then(res => {
        dispatch(createProductSuccess(res.data));
        return res;
    })
    .catch(err => {
        dispatch(createProductFailure(err));
        throw err;
    })
} 

export const updateProduct = (bodyParams) => dispatch => {  
    dispatch(updateProductLoading());
    const url = '/products/update';
    return Axios.put(url, bodyParams)
    .then(res => {
        dispatch(updateProductSuccess(res.data));
        return res;
    })
    .catch(err => {
        dispatch(updateProductFailure(err));
        throw err;
    })
}

export const deleteProduct = (id) => dispatch => {
    dispatch(deleteProductLoading());
    const url = `/products/delete/${id}`;
    return Axios.delete(url)
    .then(res => {
        dispatch(deleteProductSuccess(res.data));
        return res;
    })
    .catch(err => {
        dispatch(deleteProductFailure(err));
        throw err;
    })
}

export const fetchOrderList = () => dispatch => {
    dispatch(fetchOrderLoading());
    const url = '/orders/order/list/all';
    return Axios.get(url)
    .then(res => {
        dispatch(fetchOrderSuccess(res.data));
        return res; 
    })
    .catch(err => {
        dispatch(fetchOrderFailure(err));
        throw err;
    })
}

export const fetchReviews = (id) => dispatch => { debugger;
    dispatch(fetchReviewsLoading());
    const url = `/reviews/customerReview/list/${id}`;
    return Axios.get(url)
    .then(res => {
        dispatch(fetchReviewsSuccess(res.data));
        return res; 
    })
    .catch(err => {
        dispatch(fetchReviewsFailure(err));
        throw err;
    })
}