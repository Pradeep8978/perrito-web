import {connect} from 'react-redux';
import {fetchProducts, deleteProduct,preserveProductDetails} from './../actions/products.actions';
import Products from '../components/products/Product';

const mapStateToProps = state => {
    debugger
    return({
    productList: state.products.productList,
    loading: state.products.loading,
    error: state.products.error,
})};
 
const mapDispatchToProps = {
    fetchProducts,
    deleteProduct,
    preserveProductDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);