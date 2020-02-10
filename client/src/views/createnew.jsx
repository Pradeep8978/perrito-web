
import React from "react";
import { contriesData } from './states'
import Axios from 'axios'

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
    Container,

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
                images: [],
                discription: [''],
                specifications: [{
                    label: '',
                    value: ''
                }],
                dimesions:{
                    height: '',
                    width: '',
                    weight: ''
                },
                seller_info: {
                    name: '',
                    email: '',
                    city:'',
                    phone:'',
                    address_line_1: '',
                    address_line_2: '',
                    state: '',
                    pincode: ''
                },
                important_info:'',
                price: ''
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
    addDiscripton = () => {
        let { formValues } = this.state;
        formValues.discription.push('')
        this.setState({
            formValues
        })
    }

    addSpecifications = () => {
        let { formValues } = this.state;
        formValues.specifications.push({ label: '', value: '' })
        this.setState({
            formValues
        })
    }
    changeDiscriptionHandler = (e, i) => {
        // debugger;
        let { formValues } = this.state;
        formValues.discription[i] = e.target.value;
        this.setState({
            formValues
        })
    }
    changeSpecificationHandler = (e, i) => {
        // debugger;
        let { formValues } = this.state;
        formValues.specifications[i][e.target.name] = e.target.value;
        this.setState({
            formValues
        })
    }

    changeDimesionsHandler = (e) => {
        const { formValues } = this.state;
        formValues.dimesions[e.target.name] = e.target.value;
        this.setState({
            formValues,
        });
    }

    changeSellerInfosHandler = (e) => {
        const { formValues } = this.state;
        formValues.seller_info[e.target.name] = e.target.value;
        this.setState({
            formValues,
        });
    }


    fileSelectedHandler = (file: any) => {

        let { formValues } = this.state;
        formValues.images.push(file);
        this.setState({
            formValues
        })

        // let addedFiles = this.state.formValues.images.concat(file)
        // this.setState({ images: addedFiles })
        console.log("upload file " + this.state.formValues.images)
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
        const { formValues, formErrors } = this.state;

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
            if (errormessage) isValid = false;
        });
        this.setState({
            formErrors
        });
        return isValid;
    }

    handleSubmit = e => {
        e.preventDefault();
        const { formValues } = this.state;
        if (!this.validateAllFields()) return;
        const url = '/products/create' ;
        return Axios.post(url, formValues)
        .then(res => {
            console.log('formvalues new ', res.data);
            this.props.history.push("/admin/products")
        })
        .catch(err => {
            throw err;
        })

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
                        <Col md="12">
                            <Card>
                                <CardHeader>
                                    <h5 className="title">Create New</h5>
                                </CardHeader>
                                <CardBody>
                                    <Form onSubmit={this.handleSubmit}>
                                        <Row>
                                            <Col className="pr-1" md="12">
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
                                        </Row>
                                        <Row>
                                            <Col className="pr-1" md="6">
                                                <label>Images</label>
                                                <FormGroup>
                                                    <Button className="mt-4">Images</Button>
                                                    <Input type="file"
                                                        name="images"
                                                        value={this.state.formValues.images}
                                                        onChange={this.fileSelectedHandler}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Container>
                                            <Row>
                                                <Col className="pr-1" md="10">
                                                    <FormGroup>
                                                        <Label for="discription"> Discription</Label>
                                                        {
                                                            this.state.formValues.discription.map((item, i) => {
                                                                return <Input type="textarea" name="text" id="discription"
                                                                    name="discription"
                                                                    value={item}
                                                                    invalid={formErrors.discription}
                                                                    onChange={(e) => { this.changeDiscriptionHandler(e, i) }}
                                                                    style={{ border: "1px solid #E3E3E3", borderRadius: "20px", marginBottom: "20px" }} />

                                                            })
                                                        }
                                                        <FormFeedback>{formErrors.discription}</FormFeedback>
                                                    </FormGroup>
                                                </Col>
                                                <Col className="pr-1" md="2">
                                                    <Button type="button" onClick={this.addDiscripton} >Add</Button>
                                                </Col>
                                            </Row>
                                        </Container>


                                        <label>Specifications</label>
                                        <Row>
                                            <Col className="pl-1" md="10">
                                                {
                                                    this.state.formValues.specifications.map((item, i) => {
                                                        return <Container>
                                                            <Row>
                                                                <Col className="pl-1" md="6">
                                                                    <FormGroup>
                                                                        <Input
                                                                            defaultValue=""
                                                                            placeholder="Label"
                                                                            type=""
                                                                            name="label"
                                                                            invalid={formErrors.room_number}
                                                                            value={item.label}
                                                                            onChange={(e) => { this.changeSpecificationHandler(e, i) }}
                                                                        />
                                                                        <FormFeedback>{formErrors.room_number}</FormFeedback>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col className="pl-1" md="6">
                                                                    <FormGroup>
                                                                        <Input
                                                                            defaultValue=""
                                                                            placeholder="Label Name"
                                                                            type=""
                                                                            name="value"
                                                                            invalid={formErrors.value}
                                                                            value={item.value}
                                                                            onChange={(e) => { this.changeSpecificationHandler(e, i) }}
                                                                        />
                                                                        <FormFeedback>{formErrors.value}</FormFeedback>
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                        </Container>
                                                    })
                                                }
                                            </Col>
                                            <Col className="pl-1" md="2">
                                                <Button onClick={this.addSpecifications} >Add</Button>

                                            </Col>
                                        </Row>
                                        <label>Dimesions</label>
                                        <Row>
                                            <Col className="pr-1" md="4">
                                                <Label>Height</Label>
                                                <FormGroup>
                                                    <Input
                                                        defaultValue=""
                                                        placeholder="Height"
                                                        type="number"
                                                        name="height"
                                                        invalid={formErrors.dimesions}
                                                        value={this.state.formValues.dimesions.height}
                                                        onChange={this.changeDimesionsHandler}

                                                    />
                                                    <FormFeedback>{formErrors.dimesions}</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                            <Col className="pr-1" md="4">
                                                <Label>width</Label>
                                                <FormGroup>
                                                    <Input
                                                        defaultValue=""
                                                        placeholder="width"
                                                        type="number"
                                                        name="width"
                                                        invalid={formErrors.dimesions}
                                                        value={this.state.formValues.dimesions.width}
                                                        onChange={this.changeDimesionsHandler}
                                                    />
                                                    <FormFeedback>{formErrors.dimesions}</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                            <Col className="pr-1" md="4">
                                                <Label>weight</Label>
                                                <FormGroup>
                                                    <Input
                                                        defaultValue=""
                                                        placeholder="Weight"
                                                        type="number"
                                                        name="weight"
                                                        invalid={formErrors.dimesions}
                                                        value={this.state.formValues.dimesions.weight}
                                                        onChange={this.changeDimesionsHandler}
                                                    />
                                                    <FormFeedback>{formErrors.dimesions}</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <h5>Seller Information</h5>
                                        <Row>
                                            <Col className="pl-1" md="6">
                                                <Label>Name</Label>
                                                <FormGroup>
                                                    <Input
                                                        defaultValue=""
                                                        placeholder="Name"
                                                        type="text"
                                                        name="name"
                                                        invalid={formErrors.room_number}
                                                        value={this.state.formValues.seller_info.name}
                                                        onChange={this.changeSellerInfosHandler}
                                                    />
                                                    <FormFeedback>{formErrors.room_number}</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                            <Col className="pr-1" md="6">
                                                <Label>Email</Label>
                                                <FormGroup>
                                                    <Input
                                                        defaultValue=""
                                                        placeholder="Enter email"
                                                        type="email"
                                                        name="email"
                                                        invalid={formErrors.sellername}
                                                        value={this.state.formValues.seller_info.email}
                                                        onChange={this.changeSellerInfosHandler}
                                                    />
                                                    <FormFeedback>{formErrors.sellername}</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="pl-1" md="6">
                                                <Label>City</Label>
                                                <FormGroup>
                                                    <Input
                                                        defaultValue=""
                                                        placeholder="Enter City"
                                                        type=""
                                                        name="city"
                                                        invalid={formErrors.room_number}
                                                        value={this.state.formValues.seller_info.city}
                                                        onChange={this.changeSellerInfosHandler}
                                                    />
                                                    <FormFeedback>{formErrors.room_number}</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                            <Col className="pr-1" md="6">
                                                <Label>State</Label>
                                                <FormGroup>
                                                    <Input
                                                        defaultValue=""
                                                        placeholder="Enter state"
                                                        type="text"
                                                        name="state"
                                                        invalid={formErrors.sellerAddress}
                                                        value={this.state.formValues.seller_info.state}
                                                        onChange={this.changeSellerInfosHandler}
                                                    />
                                                    <FormFeedback>{formErrors.sellerAddress}</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="pl-1" md="6">
                                                <Label>Address 1</Label>
                                                <FormGroup>
                                                    <Input
                                                        defaultValue=""
                                                        placeholder="Enter Address"
                                                        type=""
                                                        name="address_line_1"
                                                        invalid={formErrors.room_number}
                                                        value={this.state.formValues.seller_info.address_line_1}
                                                        onChange={this.changeSellerInfosHandler}
                                                    />
                                                    <FormFeedback>{formErrors.room_number}</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                            <Col className="pr-1" md="6">
                                                <Label>Address 2</Label>
                                                <FormGroup>
                                                    <Input
                                                        defaultValue=""
                                                        placeholder="Enter Address"
                                                        type="text"
                                                        name="address_line_2"
                                                        invalid={formErrors.sellerAddress}
                                                        value={this.state.formValues.seller_info.address_line_2}
                                                        onChange={this.changeSellerInfosHandler}
                                                    />
                                                    <FormFeedback>{formErrors.sellerAddress}</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="pl-1" md="6">
                                            <Label>Phone</Label>
                                                <FormGroup>
                                                    <Input
                                                        defaultValue=""
                                                        placeholder="Enter Phone"
                                                        type="number"
                                                        name="phone"
                                                        invalid={formErrors.room_number}
                                                        value={this.state.formValues.seller_info.phone}
                                                        onChange={this.changeSellerInfosHandler}
                                                    />
                                                    <FormFeedback>{formErrors.room_number}</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                            <Col className="pr-1" md="6">
                                                <Label>Pincode</Label>
                                                <FormGroup>
                                                    <Input
                                                        defaultValue=""
                                                        placeholder="Enter Pincode"
                                                        type="number"
                                                        name="pincode"
                                                        invalid={formErrors.sellerEmail}
                                                        value={this.state.formValues.seller_info.pincode}
                                                        onChange={this.changeSellerInfosHandler}
                                                    />
                                                    <FormFeedback>{formErrors.sellerEmail}</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="pl-1" md="8">
                                                <Label>Important Information</Label>
                                                <FormGroup>
                                                    <Input
                                                        defaultValue=""
                                                        placeholder="Enter Information"
                                                        type=""
                                                        name="important_info"
                                                        invalid={formErrors.room_number}
                                                        value={this.state.formValues.important_info}
                                                        onChange={this.changeHandler}
                                                    />
                                                    <FormFeedback>{formErrors.room_number}</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                            <Col className="pr-1" md="4">
                                                <Label>Prcice</Label>
                                                <FormGroup>
                                                    <Input
                                                        defaultValue=""
                                                        placeholder="Enter Prcice"
                                                        type="text"
                                                        name="price"
                                                        invalid={formErrors.sellerAddress}
                                                        value={this.state.formValues.price}
                                                        onChange={this.changeHandler}
                                                    />
                                                    <FormFeedback>{formErrors.sellerAddress}</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Button>Clear</Button>
                                            <Button type="submit" >Submit</Button>
                                        </Row>
                                        
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}

export default createnew;
