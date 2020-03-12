
import React from "react";
// import { contriesData } from './states'
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
// import Dropdown from './../components/DropDown/DropDown';
import './createProduct.scss'

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.jsx";
import { fileToBase64 } from './DocumentService';



class createnew extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            formValues: {
                categories: [],
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
            // tags: '',
            formErrors: {},
            file: '',
            imagePreviewUrl: '',
            // statesData: contriesData,
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
    // componentDidMount() {
    //     const url = '/products/list';
    //     Axios.get('url' + this.props.match.params)
    //         .then(res => {
    //             this.setState({
    //                 formValues: res.data
    //             })
    //         })
    // }
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
        // this.state.tags = e.target.value;
        formValues.tags = e.target.value.split(' ');
        this.setState({
            formValues
        })
    }

    fileSelectedHandler = async (e) => {
        // const images = Object.values(e.target.files).map(file => {
        //     console.log(file.size)
        //     return fileToBase64(file)
        // });
        // Promise.all(images)
        //     .then(res => {
        //         console.log("response images", res)
        //         this.setState(prevState => ({
        //             formValues: {
        //                 ...prevState.formValues,
        //                 images: res
        //             }
        //         }))
        //     })
        const url = `/images/upload`;
        const { formValues } = this.state;
        let formData = new FormData();
        formData.append('image', e.target.files[0]);
        Axios.post(url, formData)
            .then(res => {
                formValues.images.push(res.data);
                this.setState({ formValues });
            })
    }

    onRemoveImage = index => {
        const { formValues } = this.state;
        formValues.images = formValues.images.filter((o, i) => i !== index);
        this.setState({ formValues })
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
        if (!formValues.categories.length) {
            formErrors.categories = 'Please select a category';
        }
        this.setState({
            formErrors
        });
        return isValid;
    }

    onSubmitCreate = () => {
        const { formValues } = this.state;
        const url = '/products/create';
        return Axios.post(url, formValues)
            .then(res => {
                console.log('formvalues new ', res.data);
                this.props.notify(2, 'Successfully Created');
                this.props.history.push("/admin/products")
            })
            .catch(err => {
                this.props.notify(3, 'Sorry unable to create Product. Make sure you fill all theee details');
                throw err;
            })
    }

    onSubmitUpdate = () => {
        const { formValues } = this.state;
        console.log("formValues====>", formValues)
        // this.props.updateProduct(formValues)
        const id = formValues._id
        Axios({
            method: "PUT",
            url: `/products/update/${id}`,
            data: formValues,
        }).then(res => {
            this.props.notify(2, 'Successfully Updated the product Details');
            this.props.history.push("/admin/products");
        })
            .catch(err => {
                console.log("erro", err)
                this.props.notify(3, 'Sorry unable to create Product. Make sure you fill all theee details');
            });

    }

    handleSubmit = e => {
        console.log("Update", this.state.isUpdate)
        e.preventDefault();
        if (!this.validateAllFields()) return;
        if (this.state.isUpdate) {
            this.onSubmitUpdate()
            this.props.history.push("/admin/products")
        } else {
            this.onSubmitCreate()
        }

    }

    revmoveDescriptionHanlder = (index) => {
        const newdata = this.state.formValues.description;
        newdata.splice(index, 1);
        // newdata.filter((item,i) => i !== index)
        console.log("newdata", newdata)
        this.setState({
            description: newdata
        })
    }

    removeSpecificationHandler = (ind) => {
        const newdata = this.state.formValues.specifications;
        newdata.splice(ind, 1);
        console.log("newdata", newdata)
        this.setState({
            specifications: newdata
        })
    }
    render() {
        // console.log("catatagires===>", this.state.formValues)
        const { formValues, formErrors, isUpdate } = this.state;
        const categories = ["Select", "Food", "Toys", "Accessories", "Health", "Grooming", "Bath"];
        const cardTitle = isUpdate ? 'Update Product Details' : 'Create New Product';
        return (
            <>
                <PanelHeader size="sm" />
                <div className="content">
                    <Card>
                        <CardBody>
                            <Row className="image-wrapper">
                                {
                                    formValues.images.map((url, index) => {
                                        return (
                                            <div>
                                                <img src={url} className="product-image" style={{ marginLeft: "5px" }} />
                                                <Col>
                                                    <Button onClick={() => this.onRemoveImage(index)}>Remove</Button>
                                                </Col>
                                            </div>
                                        )
                                    })
                                }
                            </Row>
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
                                                    <Input type="select" name="categories"
                                                        onChange={this.changeHandler}
                                                        value={formValues.categories}>
                                                        {categories.map((item, i) => {
                                                            return <option key={i}
                                                            >{item}</option>
                                                        })}

                                                    </Input>
                                                    {/* <Dropdown options={categories}/> */}
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
                                                        name="tags"
                                                        invalid={formErrors.name}
                                                        onChange={this.tagsHandler}
                                                        value={this.state.formValues.tags.join(", ")}
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
                                                        // pattern="([^\s]+(\.(?i)(jpg|png|gif|bmp))$)"
                                                        onChange={this.fileSelectedHandler}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col className="pr-1" md="12">
                                                <FormGroup>
                                                    <Label for="discription">Description</Label>&nbsp;
                                                        <a href="#" onClick={this.addDiscripton} className="add-btn">Add</a>
                                                    {
                                                        this.state.formValues.description.map((item, i) => {
                                                            return <div>
                                                                <Row style={{ display: "flex" }}>
                                                                    <Col className="pr-1" md="11">
                                                                        <Input type="textarea" name="text" id="discription"
                                                                            name="description"
                                                                            value={item}
                                                                            invalid={formErrors.discription}
                                                                            onChange={(e) => { this.changeDiscriptionHandler(e, i) }}
                                                                            style={{
                                                                                border: "1px solid #E3E3E3",
                                                                                borderRadius: "20px", marginBottom: "20px"
                                                                            }} />

                                                                    </Col>
                                                                    {this.state.formValues.description.length > 1 ? <i class="fa fa-trash" style={{ color: "red", marginLeft: "10px", marginTop: "20px" }} aria-hidden="true" onClick={() => this.revmoveDescriptionHanlder(i)}></i> : null}

                                                                    {/* <Col className="pr-1" md="2">
                                                                    </Col> */}
                                                                </Row>
                                                            </div>
                                                        })
                                                    }
                                                    <FormFeedback>{formErrors.discription}</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <label>Specifications</label> &nbsp;
                                        <a href="#" onClick={this.addSpecifications} className="add-btn">Add</a>
                                        <Row>
                                            <Col className="pl-1" md="12">
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
                                                                    <FormGroup style={{ display: "flex" }}>
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
                                                                        {this.state.formValues.specifications.length > 1 ? <i class="fa fa-trash" style={{ color: "red", marginLeft: "10px", marginTop: "10px" }} aria-hidden="true" onClick={() => this.removeSpecificationHandler(i)}></i> : null}

                                                                    </FormGroup>
                                                                </Col>
                                                                {/* <Col className="pl-1" md="1">

                                                                </Col> */}
                                                            </Row>
                                                        </Container>
                                                    })
                                                }
                                            </Col>
                                            <Col className="pl-1" md="2">
                                                {/* <Button onClick={this.addSpecifications} >Add</Button> */}

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
                                                        value={formValues.dimensions && formValues.dimensions.height}
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
                                                        value={formValues.dimensions && formValues.dimensions.width}
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
                                                        value={formValues.dimensions && formValues.dimensions.weight}
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
                                        <Row >
                                            <Col style={{ textAlign: "center" }}>
                                                <Button color="danger">Clear</Button>
                                                <Button color="success" type="submit" >Submit</Button>
                                            </Col>

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
