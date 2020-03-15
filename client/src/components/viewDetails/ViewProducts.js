import React, { Component } from 'react'

import { connect } from 'react-redux';
import {
  Button,
  Card,
  Row,
  Col,
  CardBody,
  CardTitle,
  CardText,
  CardFooter,
  Container
} from "reactstrap";
import { Link } from "react-router-dom";
import PanelHeader from "../../components/PanelHeader/PanelHeader";
import './viewProducts.scss';
import { fetchReviews } from '../../actions/products.actions'


class ViewProducts extends Component {
  componentDidMount = () => {
    // let {id} = this.props.ViewDetails._id;
    // console.log("asgvcbhnj",this.props.ViewDetails._id)
    // debugger;
    this.props.fetchReviews(this.props.ViewDetails._id)

  }
  render() {
    console.log('view products', this.props)
    const { ViewDetails, reviews } = this.props;
    console.log("viewDetails=====>", reviews)
    return (
      <>
        <PanelHeader size="sm" />

        <Row>
          <Col sm="12">
            <Card style={{ textAlign: "center" }}>
              <h2 style={{ padding: "20px" }}>Product and Seller Details</h2>
              {
                ViewDetails.images.map((items) =>
                  <img
                    className="product-img"
                    src={items} alt="Card image cap" />
                )

              }

              <CardBody>


                <div class="div-table">
                  <div class="tr">
                    <div class="tc tc1"><p className="productInfo">Name</p></div>
                    <div class="tc tc2">{ViewDetails.name}</div>
                  </div>

                  <div class="tr">
                    <div class="tc"><p className="productInfo">Categories</p></div>
                    <div class="tc">{ViewDetails.categories}</div>
                  </div>

                  <div class="tr">
                    <div class="tc"><p className="productInfo">Tags</p></div>
                    <div class="tc"> {ViewDetails.tags}</div>
                  </div>

                  <div class="tr">
                    <div class="tc"><p className="productInfo">Description</p></div>
                    <div class="tc">{ViewDetails.description.map((item, i) => {
                      return <div style={{ marginBottom: "10px" }}>{item}</div>
                    })}</div>
                  </div>
                  <h4>Specfications</h4>
                  <div class="tr">
                    <div class="tc"><p className="productInfo">Label</p></div>
                    <div class="tc">
                      <p className="productInfo">Label Name</p>
                    </div>
                  </div>

                  <div class="tr">
                    <div class="tc">
                      {ViewDetails.specifications.map((item) => {
                        return (
                          <p>{item.label} </p>
                        )
                      })}
                    </div>
                    <div class="tc">
                      {ViewDetails.specifications.map((item) => {
                        return (
                          <p>{item.value} </p>
                        )
                      })}
                    </div>
                  </div>
                  <div class="tr">
                    <div class="tc">
                      <p className="productInfo">Dimensions</p>
                    </div>
                    <div class="tc">{ViewDetails.dimensions.height}x{ViewDetails.dimensions.width}x{ViewDetails.dimensions.weight}</div>
                  </div>
                  <div class="tr">
                    <div class="tc"><p className="productInfo">Avaliable Products</p></div>
                    <div class="tc">
                      {ViewDetails.count}
                    </div>
                  </div>
                  <h4>Seller Info</h4>
                  <div class="tr">
                    <div class="tc">
                      <p className="productInfo">Name</p>
                    </div>
                    <div class="tc">
                      {ViewDetails.seller_info.name}
                    </div>
                  </div>
                  <div class="tr">
                    <div class="tc">
                      <p className="productInfo">Email</p>
                    </div>
                    <div class="tc">
                      {ViewDetails.seller_info.email}
                    </div>
                  </div>
                  <div class="tr">
                    <div class="tc"><p className="productInfo">Phone</p></div>
                    <div class="tc">
                      {ViewDetails.seller_info.phone}
                    </div>
                  </div>
                  <div class="tr">
                    <div class="tc"><p className="productInfo">City</p></div>
                    <div class="tc">
                      {ViewDetails.seller_info.city}
                    </div>
                  </div>

                  <div class="tr">
                    <div class="tc"><p className="productInfo">Address line 1</p></div>
                    <div class="tc">
                      {ViewDetails.seller_info.address_line_1}
                    </div>
                  </div>
                  <div class="tr">
                    <div class="tc"><p className="productInfo">Address line 2</p></div>
                    <div class="tc">
                      {ViewDetails.seller_info.address_line_2}
                    </div>
                  </div>
                  <div class="tr">
                    <div class="tc"><p className="productInfo">state</p></div>
                    <div class="tc">
                      {ViewDetails.seller_info.state}
                    </div>
                  </div>
                  <div class="tr">
                    <div class="tc"><p className="productInfo">Pincode</p></div>
                    <div class="tc">
                      {ViewDetails.seller_info.pincode}
                    </div>
                  </div>
                  <div class="tr">
                    <div class="tc">
                      <p className="productInfo">important info</p>
                    </div>
                    <div class="tc">
                      {ViewDetails.important_info}
                    </div>
                  </div>
                  <div class="tr">
                    <div class="tc"><p className="productInfo">Price </p></div>
                    <div class="tc">
                      {ViewDetails.price} INR
                      </div>
                  </div>
                </div>
                <Container>
                <Row>                    
                    {
                      reviews.map((item, i) => {
                        return (
                          <Col sm="6">
                            <Card body key={i}>
                          <CardTitle><span>Rating:</span>{item.rating}</CardTitle>
                          <CardText><span>Comment:</span>{item.description}</CardText>
                          <CardFooter><span>Customer Name:</span>{item.customerName}</CardFooter>
                        </Card>
                        </Col>
               
                        )
                      })
                    }
                   </Row>
                </Container>
                


                <Button
                  className=""
                  color=""
                  to="/admin/products"
                  outline
                  size="lg"
                  tag={Link}
                  style={{ background: "red" }}
                >
                  Back
            </Button>

              </CardBody>
            </Card>
          </Col>
        </Row>

      </>
    )
  }

}
const mapStateToProps = (state) => {
  debugger;
  return {
    ViewDetails: state.products.ViewDetails,
    reviews: state.products.reviews
  }
};
const mapDispatchToProps = {
  fetchReviews
}


export default connect(mapStateToProps, mapDispatchToProps)(ViewProducts);