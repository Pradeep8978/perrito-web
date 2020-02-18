import {connect} from 'react-redux';
import {createUser} from './../actions/auth.actions';
import createnew from '../views/createnew.jsx'

const mapStateToProps = state => ({
    loading: state.auth.loading,
    error: state.auth.error
});

const mapDispatchToProps = {
    createUser
}

export default connect(mapStateToProps, mapDispatchToProps)(createnew);