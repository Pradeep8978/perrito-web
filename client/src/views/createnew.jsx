
import React from "react";
import { contriesData } from './states'
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    FormFeedback,
    Input,
    Row,
    Col,
    Label,

} from "reactstrap";
import { validationConfig } from './validations';
import Datetime from 'react-datetime';
import './createNew.scss'

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.jsx";

class createnew extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            formValues: {
                name: '',
                phone: '',
                address_line_1: '',
                address_line_2: '',
                email: '',
                alternate_phone: '',
                gender: '',
                date_of_birth: '',
                room_number: '',
                // profile: '',
                designation: '',
                idproof: '',
                city: '',
                state: '',
                pincode: '',
                date_of_joining: ''
            },
            formErrors: {},
            file: '',
            imagePreviewUrl: '',
            statesData: contriesData
        }
        this._handleImageChange = this._handleImageChange.bind(this);

    }
    changeHandler = (e) => {
        const { formValues, formErrors } = this.state;
        formValues[e.target.name] = e.target.value;
        const validationFunc = validationConfig[e.target.name];
        formErrors[e.target.name] = validationFunc ? validationFunc(e.target.value) : "";
        this.setState({
            formValues,
            formErrors
        });
    }

    _handleImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

    onChangeDate = (value, name) => {
        const { formValues,formErrors } = this.state;
      
        try {
            value = (typeof value === 'string') ? value : value.format("DD/MM/YYYY");
            const validationFunc = validationConfig[name];
            formErrors[name] = validationFunc ? validationFunc(value) : "";
            formValues[name] = value
            this.setState({
                formValues,
                formErrors
            })
        } catch (e) { }

    }

    validateAllFields = () => {
        const { formValues } = this.state;
        const formErrors = {};
        let isValid = true;
        Object.keys(formValues).forEach(key => {
          const validationFunc = validationConfig[key];
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
        // const {formValues} = this.state;
        if(!this.validateAllFields()) return;
     
      }

    render() {
        console.log(this.state.formValues)
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} />);
        }
        const { formValues, formErrors } = this.state
        return (
            <>
                <PanelHeader size="sm" />
                <div className="content">
                    <Row>
                        <Col md="8">
                            <Card>
                                <CardHeader>
                                    <h5 className="title">Create New</h5>
                                </CardHeader>
                                <CardBody>
                                    <Form onSubmit={this.handleSubmit}>
                                        <Row>
                                            <Col className="pr-1" md="6">
                                                <FormGroup>
                                                    <label> Name</label>
                                                    <Input
                                                        defaultValue=""
                                                        placeholder="Enter Name"
                                                        type="text"
                                                        name="name"
                                                        invalid={formErrors.name}
                                                        onChange={this.changeHandler}
                                                        value={this.state.formValues.name}
                                                    />
                                                    <FormFeedback>{formErrors.name}</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                            <Col className="pl-1" md="6">
                                                <FormGroup>
                                                    <label>Email</label>
                                                    <Input
                                                        defaultValue=""
                                                        placeholder="Enter Email"
                                                        type="email"
                                                        name="email"
                                                        invalid={formErrors.email}
                                                        onChange={this.changeHandler}
                                                        value={this.state.formValues.email}
                                                    />
                                                    <FormFeedback>{formErrors.email}</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="pr-1" md="6">
                                                <FormGroup>
                                                    <label>Phone Number</label>
                                                    <Input
                                                        defaultValue=""
                                                        placeholder="Phone Number"
                                                        type="text"
                                                        name="phone"
                                                        invalid={formErrors.phone}
                                                        value={this.state.formValues.phone}
                                                        onChange={this.changeHandler}
                                                    />
                                                    <FormFeedback>{formErrors.phone}</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                            <Col className="pl-1" md="6">
                                                <FormGroup>
                                                    <label>Alternate Phone Number</label>
                                                    <Input
                                                        defaultValue=""
                                                        placeholder="Alternate Phone Number"
                                                        type="text"
                                                        name="alternate_phone"
                                                        invalid={formErrors.alternate_phone}
                                                        value={this.state.formValues.alternate_phone}
                                                        onChange={this.changeHandler}
                                                    />
                                                    <FormFeedback>{formErrors.alternate_phone}</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>

                                            <Col className="pr-1" md="6" >
                                                <label>Gender</label>
                                                <FormGroup check className="form-check-radio" style={{ display: "flex" }}>
                                                    <Label check>
                                                        <Input
                                                            defaultValue="male"
                                                            id="male"
                                                            checked={this.state.formValues.gender === 'male'}
                                                            name="gender"
                                                            type="radio"
                                                            onChange={this.changeHandler}
                                                        ></Input>
                                                        <span className="form-check-sign"></span>
                                                        Male
                                                  </Label>
                                                    <Label check>
                                                        <Input
                                                            // defaultChecked
                                                            defaultValue="female"
                                                            id="female"
                                                            checked={this.state.formValues.gender === 'female'}
                                                            name="gender"
                                                            type="radio"
                                                            onChange={this.changeHandler}
                                                        ></Input>
                                                        <span className="form-check-sign"></span>
                                                        female
                                                   </Label>
                                                </FormGroup>

                                            </Col>
                                            <Col className="pl-1" md="6">
                                                <label>Date of Birth</label>
                                                <FormGroup>
                                                    <Datetime
                                                        name="date_of_birth"
                                                        value={this.state.formValues.date_of_birth}
                                                        dateFormat={"DD/MM/YYYY"}
                                                        closeOnSelect
                                                        onChange={(val) => this.onChangeDate(val, "date_of_birth")}
                                                        inputProps={{ placeholder: "Date Of Birth" }}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="pr-1" md="6">
                                                <FormGroup>
                                                    <label>Room Number</label>
                                                    <Input
                                                        defaultValue=""
                                                        placeholder="Room Number"
                                                        type="number"
                                                        name="room_number"
                                                        invalid={formErrors.room_number}
                                                        value={this.state.formValues.room_number}
                                                        onChange={this.changeHandler}
                                                    />
                                                    <FormFeedback>{formErrors.room_number}</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                            <Col className="pl-1" md="6">
                                                <FormGroup>
                                                    <Button className="mt-4">Choose Profile picture</Button>
                                                    <Input type="file" name="profile" onChange={this._handleImageChange} />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="pr-1" md="6">
                                                <FormGroup>
                                                    <label htmlFor="slect_Designation">Designation</label>
                                                    <Input id="slect_Designation" type="select"
                                                        name="designation"
                                                        value={this.state.formValues.designation}
                                                        onChange={this.changeHandler}>
                                                        <option value="none" selected  >
                                                            Select an Option
                                                       </option>
                                                        <option>Student</option>
                                                        <option>Employee</option>
                                                        <option>Other</option>

                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col className="pl-1" md="6">
                                                <FormGroup>
                                                    <Button className="mt-4">Id Proof</Button>
                                                    <Input type="file"
                                                        name="idproof"
                                                        value={this.state.formValues.idproof}
                                                        onChange={this.changeHandler} />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12">
                                                <FormGroup>
                                                    <label>Address line 1</label>
                                                    <Input
                                                        defaultValue=""
                                                        placeholder="Home Address"
                                                        type="text"
                                                        name="address_line_1"
                                                        invalid={formErrors.address_line_1}
                                                        value={this.state.formValues.address_line_1}
                                                        onChange={this.changeHandler}
                                                    />
                                                    <FormFeedback>{formErrors.address_line_1}</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12">
                                                <FormGroup>
                                                    <label>Address line 2</label>
                                                    <Input
                                                        defaultValue=""
                                                        placeholder="Home Address"
                                                        type="text"
                                                        name="address_line_2"
                                                        invalid={formErrors.address_line_2}
                                                        value={this.state.formValues.address_line_2}
                                                        onChange={this.changeHandler}
                                                    />
                                                    <FormFeedback>{formErrors.address_line_2}</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="pr-1" md="4">
                                                <FormGroup>
                                                    <label>City</label>
                                                    <Input
                                                        defaultValue=""
                                                        placeholder="City"
                                                        type="text"
                                                        name="city"
                                                        invalid={formErrors.city}
                                                        value={this.state.formValues.city}
                                                        onChange={this.changeHandler}
                                                    />
                                                    <FormFeedback>{formErrors.city}</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                            <Col className="px-1" md="4">
                                                <FormGroup>
                                                    <label htmlFor="slectedStates">states</label>
                                                    <Input id="slectedStates" type="select"
                                                        name="state"
                                                        value={this.state.formValues.state}
                                                        onChange={this.changeHandler} 
                                                        invalid={formErrors.state}
                                                        >
                                                        {this.state.statesData.map((item, i) => {
                                                            return <option value={item.value}>{item.label}</option>
                                                        }
                                                        )}
                                                    </Input>
                                                    <FormFeedback>{formErrors.state}</FormFeedback>

                                                </FormGroup>
                                            </Col>
                                            <Col className="pl-1" md="4">
                                                <FormGroup>
                                                    <label>Postal Code</label>
                                                    <Input placeholder="PinCode"
                                                        type="number"
                                                        name="pincode"
                                                        invalid={formErrors.pincode}
                                                        value={this.state.formValues.pincode}
                                                        onChange={this.changeHandler} />
                                                    <FormFeedback>{formErrors.pincode}</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12">
                                                <label>Date of Joining</label>
                                                <FormGroup>
                                                    <Datetime
                                                        name="date_of_joining"
                                                        value={this.state.formValues.date_of_joining}
                                                        dateFormat={"DD/MM/YYYY"}
                                                        closeOnSelect
                                                        invalid={formErrors.date_of_joining}
                                                        onChange={(val) => this.onChangeDate(val, "date_of_joining")}
                                                        inputProps={{ placeholder: "Date Of Joining" }}
                                                    />
                                                    <FormFeedback>{formErrors.date_of_joining}</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Button>Clear</Button>
                                            <Button type="submit">Submit</Button>
                                        </Row>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="4">
                            <Card className="card-user">
                                <div className="image">
                                    <img alt="..." src={require("assets/img/bg5.jpg")} />
                                </div>
                                <CardBody>
                                    <div className="author" style={{ textAlign: "-webkit-center" }}>
                                        <a href="#pablo" onClick={e => e.preventDefault()}>
                                            {/* <img
                                                alt="..."
                                                className="avatar border-gray"
                                                src={require({$imagePreview})}
                                            /> */}
                                            <div className="avatar border-gray">
                                                {$imagePreview}
                                            </div>

                                            <h5 className="title">{this.state.formValues.name}</h5>
                                        </a>
                                        <p className="description"><b>Phone Number:</b>  {this.state.formValues.phone}</p>
                                    </div>
                                    <p className="description text-center">
                                        <b>Address:</b><span className="show-addreess"> {this.state.formValues.address_line_1}</span>
                                    </p>
                                    <p className="description text-center">
                                        <span className="show-addreess"> {this.state.formValues.address_line_2}</span>
                                    </p>
                                </CardBody>
                                {/* <hr />
                                <div className="button-container">
                                    <Button
                                        className="btn-neutral btn-icon btn-round"
                                        color="default"
                                        href="#pablo"
                                        onClick={e => e.preventDefault()}
                                        size="lg"
                                    >
                                        <i className="fab fa-facebook-f" />
                                    </Button>
                                    <Button
                                        className="btn-neutral btn-icon btn-round"
                                        color="default"
                                        href="#pablo"
                                        onClick={e => e.preventDefault()}
                                        size="lg"
                                    >
                                        <i className="fab fa-twitter" />
                                    </Button>
                                    <Button
                                        className="btn-neutral btn-icon btn-round"
                                        color="default"
                                        href="#pablo"
                                        onClick={e => e.preventDefault()}
                                        size="lg"
                                    >
                                        <i className="fab fa-google-plus-g" />
                                    </Button>
                                </div> */}
                            </Card>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}

export default createnew;
