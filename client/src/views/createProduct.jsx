
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
import './createProduct.scss'

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.jsx";
import { fileToBase64 } from './DocumentService';


class createnew extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            formValues: {
                categories: '',
                name: '',
                images: [],
                description: [''],
                specifications: [{
                    label: '',
                    value: ''
                }],
                dimensions: {
                    height: '',
                    width: '',
                    weight: ''
                },
                seller_info: {
                    name: '',
                    email: '',
                    city: '',
                    phone: '',
                    address_line_1: '',
                    address_line_2: '',
                    state: '',
                    pincode: ''
                },
                important_info: '',
                price: '',
                tags: [],
                count: ''
            },
            tagText: '',
            formErrors: {},
            file: '',
            imagePreviewUrl: '',
            statesData: contriesData,
            isUpdate: false
        }
        // this._handleImageChange = this._handleImageChange.bind(this);

    }

    componentWillMount() {
        const { selectedProduct } = this.props;
        if (selectedProduct && window.location.href.includes('update')) {
            this.setState({
                formValues: selectedProduct,
                isUpdate: true
            })
        }
    }
    componentDidMount() {
        const url = '/products/list';
        Axios.get('url' + this.props.match.params)
            .then(res => {
                this.setState({
                    formValues: res.data
                })
            })
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
        formValues.description.push('')
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
        let { formValues } = this.state;
        formValues.description[i] = e.target.value;
        this.setState({
            formValues
        })
    }
    changeSpecificationHandler = (e, i) => {
        let { formValues } = this.state;
        formValues.specifications[i][e.target.name] = e.target.value;
        this.setState({
            formValues
        })
    }

    changeDimesionsHandler = (e) => {
        const { formValues } = this.state;
        formValues.dimensions[e.target.name] = e.target.value;
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
    tagsHandler = (e) => {
        const { formValues } = this.state;
        this.state.tagText = e.target.value;
        formValues.tags = this.state.tagText.split(' ');
        this.setState({
            formValues
        })
    }

    fileSelectedHandler = async (e) => {
        const images = Object.values(e.target.files).map(file => {
            console.log(file.size)
            return fileToBase64(file)
        });
        Promise.all(images)
            .then(res => {
                console.log("response images", res)
                this.setState(prevState => ({
                    formValues: {
                        ...prevState.formValues,
                        images: res
                    }
                }))
            })
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
        const url = '/products/create';
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
        console.log(this.state.formValues, this.state.tagText)
        const { formValues, formErrors, isUpdate } = this.state;
        const categories = ["Select", "Food", "Toys", "Accessories", "Health", "Grooming", "Bath"];
        const cardTitle = isUpdate ? 'Update Product Details' : 'Create New Product';
        return (
            <>
                <PanelHeader size="sm" />
                <div className="content">
                    <Card>
                        <CardBody>
                            {
                                formValues.images.map(data => {
                                    let url;
                                    if(data.includes('uploads')){
                                        url = data
                                    }else{
                                        url = `data:image/png;base64,${data}`
                                    }
                                    return (
                                        <img src={url} className="product-image" style={{ marginLeft: "5px" }} />
                                    )
                                })
                            }
                        </CardBody>
                    </Card>
                    <Row>
                        <Col md="8">
                            <Card>
                                <CardHeader>
                                    <h5 className="title">{cardTitle}</h5>
                                </CardHeader>
                                <CardBody>
                                    <Form onSubmit={this.handleSubmit}>

                                        <Row>
                                            <Col className="pr-1" md="6">
                                                <FormGroup>
                                                    <label>Categories</label>
                                                    <Input type="select" name="categories" onChange={this.changeHandler}>
                                                        {categories.map((item, i) => {
                                                            return <option key={i}>{item}</option>
                                                        })}

                                                    </Input>
                                                    <FormFeedback>{formErrors.name}</FormFeedback>
                                                </FormGroup>
                                            </Col>
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
                                        </Row>
                                        <Row>
                                            <Col className="pr-1" md="12">
                                                <FormGroup>
                                                    <label>Tags</label>
                                                    <Input
                                                        defaultValue=""
                                                        placeholder="Enter Tags"
                                                        type="text"
                                                        name="tagText"
                                                        invalid={formErrors.name}
                                                        onChange={this.tagsHandler}
                                                        value={this.state.tagText}
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
                                                        multiple
                                                        pattern="([^\s]+(\.(?i)(jpg|png|gif|bmp))$)"
                                                        onChange={this.fileSelectedHandler}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Container>
                                            <Row>
                                                <Col className="pr-1" md="10">
                                                    <FormGroup>
                                                        <Label for="discription">Description</Label>
                                                        {
                                                            this.state.formValues.description.map((item, i) => {
                                                                return <Input type="textarea" name="text" id="discription"
                                                                    name="description"
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
                                        <label>Dimensions</label>
                                        <Row>
                                            <Col className="pr-1" md="4">
                                                <Label>Height</Label>
                                                <FormGroup>
                                                    <Input
                                                        defaultValue=""
                                                        placeholder="Height"
                                                        type="number"
                                                        name="height"
                                                        invalid={formErrors.dimensions}
                                                        value={this.state.formValues.dimensions.height}
                                                        onChange={this.changeDimesionsHandler}

                                                    />
                                                    <FormFeedback>{formErrors.dimensions}</FormFeedback>
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
                                                        invalid={formErrors.dimensions}
                                                        value={this.state.formValues.dimensions.width}
                                                        onChange={this.changeDimesionsHandler}
                                                    />
                                                    <FormFeedback>{formErrors.dimensions}</FormFeedback>
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
                                                        invalid={formErrors.dimensions}
                                                        value={this.state.formValues.dimensions.weight}
                                                        onChange={this.changeDimesionsHandler}
                                                    />
                                                    <FormFeedback>{formErrors.dimensions}</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="pl-1" md="8">
                                                <Label>Products Count</Label>
                                                <FormGroup>
                                                    <Input
                                                        defaultValue=""
                                                        placeholder="Enter product count"
                                                        type="number"
                                                        name="count"
                                                        invalid={formErrors.room_number}
                                                        value={this.state.formValues.count}
                                                        onChange={this.changeHandler}
                                                    />
                                                    <FormFeedback>{formErrors.room_number}</FormFeedback>
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
                                        <Row className="offset-md-9">
                                            <Button color="danger">Clear</Button>
                                            <Button color="success" type="submit" >Submit</Button>
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
