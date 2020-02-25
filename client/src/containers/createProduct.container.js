import {connect} from 'react-redux';
import {createUser} from '../actions/auth.actions';
import createnew from '../views/createProduct.jsx'

const mapStateToProps = state => ({
    loading: state.auth.loading,
    error: state.auth.error,
    selectedProduct: state.products.selectedProduct
});

const mapDispatchToProps = {
    createUser
}

export default connect(mapStateToProps, mapDispatchToProps)(createnew);