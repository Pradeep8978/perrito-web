import {connect} from 'react-redux';
import {signinUser} from './../actions/auth.actions';
import Signin from './../components/sign-in/Signin';

const mapStateToProps = state => ({
    loading: state.auth.loading,
    error: state.auth.error
});

const mapDispatchToProps = {
    signinUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);