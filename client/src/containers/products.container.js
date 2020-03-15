import {connect} from 'react-redux';
import {  fetchProducts,
    deleteProduct,
    preserveProductDetails,
    fetchReviews
} from './../actions/products.actions';
import Products from '../components/products/Product';

const mapStateToProps = state => {
    return({
        reviews:state.products.reviews,
    productList: state.products.productList,
    loading: state.products.loading,
    error: state.products.error,
})};
 
const mapDispatchToProps = {
    fetchProducts,
    deleteProduct,
    preserveProductDetails,
    fetchReviews
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);