import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
  FormFeedback,
  Alert
} from "reactstrap";

// core components
// import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import { validateConfig } from "../sign-up/validations";

import TransparentFooter from "components/Footers/TransparentFooter.js";
import { Link } from "react-router-dom";

class LoginPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstFocus: false,
      setFirstFocus: false,
      lastFocus: false,
      setLastFocus: false,
      emailFocus: false,
      setEmailFocus: false,
      passwordFocus: false,
      setPasswordFocus: false,
      formValues: {
        role:"admin",
        email: "",
        password: "",
        role: "admin"
      },
      formErrors: {}
    }
  }
  componentDidMount() {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;

  }

  componentWillUnmount() {
    document.body.classList.remove("login-page");
    document.body.classList.remove("sidebar-collapse");
  }

  onChangeHandler = (e) => {
    const { formValues, formErrors } = this.state;
    formValues[e.target.name] = e.target.value;
    const validationFunc = validateConfig[e.target.name];
    formErrors[e.target.name] = validationFunc ? validationFunc(e.target.value) : "";
    this.setState({
      formValues,
      formErrors
    })
  }

  validateAllFields = () => {
    const { formValues } = this.state;
    const formErrors = {};
    let isValid = true;
    Object.keys(formValues).forEach(key => {
      const validationFunc = validateConfig[key];
      const errormessage = validationFunc ? validationFunc(formValues[key]) : "";
      formErrors[key] = errormessage;
      if(errormessage) isValid = false;
    });
    this.setState({
      formErrors
    });
    return isValid;
  }

  handleSubmit = e => {
    e.preventDefault();
    const {formValues} = this.state;
    if(!this.validateAllFields()) return;
    this.props.signinUser(formValues)
    .then(()=>{
      this.props.history.push("/admin")
    })
  }

  render(){
    const {firstFocus, lastFocus, formErrors, formValues} = this.state;
    const {loading, error} = this.props;
    console.log("loding", loading )
  return (
    <>
      {/* <ExamplesNavbar /> */}
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/login.jpg") + ")"
          }}
        ></div>
        <div className="content">
          <Container>
            <Col className="ml-auto mr-auto" md="4">
              <Card className="card-login card-plain">
                <Form action="" className="form" method="">
                {error && <Alert>{error}</Alert>}
                  <CardHeader className="text-center">
                    <div className="logo-container">
                      <img
                        alt="..."
                        src={require("assets/img/now-logo.png")}
                      ></img>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (firstFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons users_circle-08"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        type="text"
                        name="email"
                        onChange={this.onChangeHandler}
                        invalid={formErrors.email}
                        // onFocus={() => setFirstFocus(true)}
                        // onBlur={() => setFirstFocus(false)}
                      ></Input>
                       <FormFeedback className="errormessage">{formErrors.email}</FormFeedback>
                    </InputGroup>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (lastFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons text_caps-small"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        name="password"
                        onChange={this.onChangeHandler}
                        type="text"
                        invalid={formErrors.password}
                        // onFocus={() => setLastFocus(true)}
                        // onBlur={() => setLastFocus(false)}
                      ></Input>
                    </InputGroup>
                       <FormFeedback className="errormessage">{formErrors.password}</FormFeedback>
                  </CardBody>
                
                  <CardFooter className="text-center">
                    <Button
                      block
                      className="btn-round"
                      color="info"
                      type="submit"
                      disabled={loading}
                      onClick={this.handleSubmit}
                      // size="lg"
                    >
                       {loading ? 'Please wait...' : 'Login'}
                    </Button>
                    <div className="pull-left">
                      <h6>
                        <Link
                          className="link"
                          href='/login'
                        >
                          Create Account
                        </Link>
                      </h6>
                    </div>
                    <div className="pull-right">
                      <h6>
                        <a
                          className="link"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          Need Help?
                        </a>
                      </h6>
                    </div>
                  </CardFooter>
                </Form>
              </Card>
            </Col>
          </Container>
        </div>
        <TransparentFooter />
      </div>
    </>
  );
                    }
}

export default LoginPage;
