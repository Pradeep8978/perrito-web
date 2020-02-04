import {combineReducers} from 'redux';
import auth from './../reducers/auth.reducer';
import products from './../reducers/products.reducer';

export default combineReducers({
    auth,
    products
});
