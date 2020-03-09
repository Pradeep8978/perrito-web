import {connect} from 'react-redux';
import {fetchOrderList} from './../actions/products.actions';
import Orders from '../components/Orders/order'

const mapStateToProps = state => {
    debugger;
    return({   
    OrderList: state.products.OrderList,
    loading: state.products.loading,
    error: state.products.error,
})};
 
const mapDispatchToProps = {
    
    fetchOrderList
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);