import {connect} from 'react-redux';
import {signupUser} from './../actions/auth.actions';
import Signup from './../components/sign-up/Signup';

const mapStateToProps = state => ({
    loading: state.auth.loading,
    error: state.auth.error
});

const mapDispatchToProps = {
    signupUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);