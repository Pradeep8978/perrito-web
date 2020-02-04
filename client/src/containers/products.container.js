import {connect} from 'react-redux';
import {fetchProducts, deleteProduct} from './../actions/products.actions';
import Products from '../components/products/Products';

const mapStateToProps = state => {
    debugger
    return({
    productList: state.products.productList,
    loading: state.products.loading,
    error: state.products.error
})};

const mapDispatchToProps = {
    fetchProducts,
    deleteProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);