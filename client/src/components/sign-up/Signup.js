import React from "react";
import { Link } from "react-router-dom";
import { validateConfig } from "./validations.js";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import TransparentFooter from "components/Footers/TransparentFooter.js";
import './Signup.scss';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  Col,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  FormFeedback,
  Alert
} from "reactstrap";
// import { render } from "node-sass";

// core components

class SignUp extends React.Component {
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
      signUpValues: {
        name: "",
        phone: "",
        email: "",
        password: ""
      },
      signUpErrors: {}
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

  ChangeHandler = (e) => {
    const { signUpValues, signUpErrors } = this.state;
    signUpValues[e.target.name] = e.target.value;
    const validationFunc = validateConfig[e.target.name];
    signUpErrors[e.target.name] = validationFunc ? validationFunc(e.target.value) : "";
    this.setState({
      signUpValues,
      signUpErrors
    })
  }

  validateAllFields = () => {
    const { signUpValues } = this.state;
    const signUpErrors = {};
    let isValid = true;
    Object.keys(signUpValues).forEach(key => {
      const validationFunc = validateConfig[key];
      const errormessage = validationFunc ? validationFunc(signUpValues[key]) : "";
      signUpErrors[key] = errormessage;
      if(errormessage) isValid = false;
    });
    this.setState({
      signUpErrors
    });
    return isValid;
  }

  handleSubmit = e => {
    e.preventDefault();
    const {signUpValues} = this.state;
    if(!this.validateAllFields()) return;
    this.props.signupUser(signUpValues)
    .then(()=>{
      this.props.history.push("/admin")
    })
  }


  render() {
    const { signUpErrors } = this.state;
    const {loading, error}  = this.props;
    // const {setFirstFocus} = false
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
              <h2>REGISTRATION</h2>
              <Col className="ml-auto mr-auto" md="6">
          {error && <Alert>{error}</Alert>}
                <Card className="card-login card-plain form-blog" >
                  <Form className="form" onSubmit={this.handleSubmit}>
                    <CardHeader className="text-center">
                      <div className="logo-container">
                        <img
                          alt="..."
                          src={require("assets/img/now-logo.png")}
                        ></img>
                      </div>
                    </CardHeader>
                    <CardBody className="form-sub" >
                      <InputGroup
                        className={
                          "no-border input-lg" +
                          (this.state.firstFocus ? " input-group-focus" : "")
                        }
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons users_circle-08"  ></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Name..."
                          type="text"
                          name="name"
                          value={this.state.signUpValues.name}
                          onChange={this.ChangeHandler}
                          invalid={signUpErrors.name}
                        ></Input>
                        <FormFeedback className="errormessage">{signUpErrors.name}</FormFeedback>
                      </InputGroup>
                      <InputGroup
                        className={
                          "no-border input-lg" +
                          (this.state.firstFocus ? " input-group-focus" : "")
                        }
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons tech_mobile" ></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input

                          placeholder="Phone..."
                          type="Number"
                          name="phone"
                          value={this.state.signUpValues.phone}
                          onChange={this.ChangeHandler}
                          invalid={signUpErrors.phone}
                        ></Input>
                        <FormFeedback className="errormessage">{signUpErrors.phone}</FormFeedback>
                      </InputGroup>
                      <InputGroup
                        className={
                          "no-border input-lg" +
                          (this.state.firstFocus ? " input-group-focus" : "")
                        }
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons ui-1_email-85" ></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Email..."
                          type="email"
                          name="email"
                          value={this.state.signUpValues.email}
                          onChange={this.ChangeHandler}
                          invalid={signUpErrors.email}
                        ></Input>
                        <FormFeedback className="errormessage">{signUpErrors.email}</FormFeedback>
                      </InputGroup>

                      <InputGroup
                        className={
                          "no-border input-lg" +
                          (this.state.lastFocus ? " input-group-focus" : "")
                        }
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons ui-1_lock-circle-open"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Password..."
                          type="password"
                          name="password"
                          value={this.state.signUpValues.password}
                          onChange={this.ChangeHandler}
                          invalid={signUpErrors.password}
                        ></Input>
                        <FormFeedback className="errormessage">{signUpErrors.password}</FormFeedback>
                      </InputGroup>
                    </CardBody>
                    <CardFooter className="text-center">
                      <Button
                        block
                        className="btn-round"
                        color="info"
                        type="submit"
                        disabled={loading}
                        // onClick={e => e.preventDefault()}
                        // size="lg"
                      >
                        {loading ? 'Signing In' : 'Sign In'}
                    </Button>
                      <div className="signup-bottomNames" >
                        <h6>
                          <a
                            className="link"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            Create Account
                        </a>
                        </h6>
                        <h6>
                          <a
                            className="link"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            Forgot Password
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
export default SignUp;
