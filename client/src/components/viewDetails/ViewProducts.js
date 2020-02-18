import React, { Component } from 'react'

import { connect } from 'react-redux';
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
  CardImg, CardText,
  Table,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  CardTitle, CardSubtitle

} from "reactstrap";
import { Link } from "react-router-dom";


class ViewProducts extends Component {



  render() {
    console.log('view products', this.props)
    const { ViewDetails } = this.props;
    return (
      <Container>
        <Row>
          <Card style={{ textAlign: "center" }}>
            <h2>Product and Person Details</h2>
            <img style={{ border: "1px solid #333", padding: "10px", borderRadius: "5PX" }} height="150px"
            src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2vLgGPS1eLS4f9DLoa6T7GTiimfHHPGXAk3TMV9hyMBQTSGGgFg"} alt="Card image cap" />
            <CardBody>
              <Row>
                <Container>
                  <Table>
                    <tbody>
                      <tr>
                        <th>Name</th>
                        <td>{ViewDetails.name}</td>
                      </tr>
                      <tr>
                        <th>categories</th>
                        <td>{ViewDetails.categories}</td>

                      </tr>
                      <tr>
                        <th>Tags</th>
                        <td>{ViewDetails.tags}</td>
                      </tr>
                      <tr>
                        <th>Description</th>
                        <td>{ViewDetails.description}</td>
                      </tr>
                      <p style={{color:'red'}}>Specfications</p>
                      <tr>
                        <th>Label</th>
                        {ViewDetails.specifications.map((item) => {
                          return (<td>{item.label}</td>
                          )
                        })}
                      </tr>
                      <tr>
                        <th>Label Name</th>
                        {ViewDetails.specifications.map((item) => {
                          return (<td>{item.value}</td>
                          )
                        })}
                      </tr>
                      <p style={{color:'red'}}>Dimensions</p>
                      <tr>
                        <th>Height</th>
                        <td>{ViewDetails.dimensions.height}</td>
                      </tr>
                      <tr>
                        <th>Width</th>
                        <td>{ViewDetails.dimensions.width}</td>
                      </tr>
                      <tr>
                        <th>Weight</th>
                        <td>{ViewDetails.dimensions.weight}</td>
                      </tr>
                      <p style={{color:'red'}}>seller info</p>
                      <tr>
                        <th>Name</th>
                        <td>{ViewDetails.seller_info.name}</td>
                      </tr>
                      <tr>
                        <th>Email</th>
                        <td>{ViewDetails.seller_info.email}</td>
                      </tr>
                      <tr>
                        <th>City</th>
                        <td>{ViewDetails.seller_info.city}</td>
                      </tr>
                      <tr>
                        <th>Phone</th>
                        <td>{ViewDetails.seller_info.phone}</td>
                      </tr>
                      <tr>
                        <th>Address line1</th>
                        <td>{ViewDetails.seller_info.address_line_1}</td>
                      </tr>
                      <tr>
                        <th>Address line2</th>
                        <td>{ViewDetails.seller_info.address_line_2}</td>
                      </tr>
                      <tr>
                        <th>State</th>
                        <td>{ViewDetails.seller_info.state}</td>
                      </tr>
                      <tr>
                        <th>Pincode</th>
                        <td>{ViewDetails.seller_info.pincode}</td>
                      </tr>
                      <tr>
                        <th>important info</th>
                        <td>{ViewDetails.important_info}</td>
                      </tr>
                      <tr>
                        <th>Price</th>
                        <td>{ViewDetails.price}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Container>

              </Row>
              
              <Button
              className=""
              color=""
              to="/admin/products"
              outline
              size="lg"
              tag={Link}
              style={{background:"red"}}
            >
               Back
            </Button>
      
            </CardBody>
          </Card>
        </Row>
      </Container>
    )
  }

}
const mapStateToProps = (state) => {
  return {
    ViewDetails: state.products.ViewDetails
  }
};


export default connect(mapStateToProps)(ViewProducts);