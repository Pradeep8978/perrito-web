import React, { Component } from 'react'
import Skeleton from 'react-loading-skeleton';
import {
    Card, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, Container, Nav, NavItem, NavLink, Table, Row, Col
} from 'reactstrap';


class Order extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    componentDidMount() {
        this.props.fetchOrderList();
    }
    _renderSkeleton = () => {
        return Array(5).fill(null).map((o, i) =>
            <div key={i} style={{ marginBottom: '20px' }} >
                <Skeleton height={30} />
                <div className="row">
                    <div className="col-12">
                        <Skeleton height={100} />
                    </div>
                </div>
            </div>
        );
    }

    render() {
        console.log("Oders=>", this.props.OrderList)
        const { OrderList, loading } = this.props;
        console.log('Student List =>', this.props);
        if (loading) {
            return this._renderSkeleton()
        }
        return (
            <div>
                {
                    OrderList.map((item, i) => {
                        return (
                            <Container >
                                <Card className="info_card" >
                                    <Container>
                                        <CardHeader style={{color:"red"}}><b>{item.address.name}</b></CardHeader>
                                        <Row style={{padding:"20px"}}>
                                            <Col xs="6">
                                                <CardBody className="row">
                                                    <span><b> Phone:</b></span>&nbsp;
                                                    {item.address.phone}
                                                </CardBody>
                                                <CardTitle><span><b> secondary Phone:</b></span>&nbsp;
                                                {item.address.secondaryPhone}</CardTitle>
                                                <address style={{fontStyle:"italic"}}>
                                                <span><b>Address:</b></span><br/>
                                                    {item.address.address_line_1}<br />
                                                    {item.address.address_line_2}<br />
                                                    {item.address.landmark}<br />
                                                    {item.address.city}<br />
                                                    {item.address.state}<br />
                                                    {item.address.pincode}<br />
                                                </address>
                                            </Col>
                                            <Col xs="6">
                                            <CardBody className="row">
                                                    <span><b> Quantity:</b></span>&nbsp;
                                                    {item.quantity}
                                                </CardBody>
                                                <CardBody className="row">
                                                    <span><b> Amount:</b></span>&nbsp;
                                                    {item.amount}
                                                </CardBody>
                                                <CardBody className="row">
                                                    <span><b> ProductId:</b></span>&nbsp;
                                                    {item.productId}
                                                </CardBody>
                                                <CardBody className="row">
                                                    <span><b> OrderedOn:</b></span>&nbsp;
                                                    {item.orderedOn}
                                                </CardBody>
                                            </Col>
                                        </Row>
                                    </Container>

                                </Card>

                            </Container>
                            // <div>{item.address.name}</div>

                        )
                    })
                }

            </div>
        )
    }
}

export default Order;
