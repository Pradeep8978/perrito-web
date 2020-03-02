import React from 'react';
import Skeleton from 'react-loading-skeleton';
import InfoCard from '../InfoCard/InfoCard';
import './ProductList.scss';
import { Container, Row, Col, Table } from 'reactstrap';

class PeersonList extends React.Component {
    state = {};

    _renderSkeleton = () => {
        return Array(5).fill(null).map((o, i) =>
            <div key={i} style={{ marginBottom: '20px' }} >
                <Skeleton height={30} />
                <div className="row">
                    {/* <div className="col-2">
                        <Skeleton height={100}/>
                    </div> */}
                    <div className="col-12">
                        <Skeleton height={100} />
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const { productList, loading } = this.props;
        console.log('Student List =>', this.props);
        if (loading) {
            return this._renderSkeleton()
        }
        return (
            <Container >
                <div className="student_list">
                    {
                        productList.map(item => {
                            return (
                                <InfoCard key={item.admission_number}
                                title={item.name}
                                    // title={item.student_info && (item.student_info.first_name + " " + item.student_info.last_name)}
                                    deleting={this.props.deleting}
                                    onEditClick={() => this.props.onEditClick(item)}
                                    onDeleteClick={() => this.props.onDeleteClick(item)}
                                    onDetailsClick={() => this.props.onDetailsClick(item)}
                                >
                                    <div className="d-flex w-100 ml-2 mr-2">
                                        {/* <img className="profile_image" src={item.images || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2vLgGPS1eLS4f9DLoa6T7GTiimfHHPGXAk3TMV9hyMBQTSGGgFg"} alt="student_img" /> */}
                                        <img className="profile_image" src={"/" + item.images[0] || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2vLgGPS1eLS4f9DLoa6T7GTiimfHHPGXAk3TMV9hyMBQTSGGgFg" } alt="Profile Image" />
                                        <div className="" style={{marginLeft:"100px",textAlign:"start"}}>
                                            <Table borderless>
                                                <tbody>
                                                    <tr>
                                                        <th>Seller Name</th>
                                                        <td>{item.seller_info.name}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Price</th>
                                                        <td>{item.price+" "+"INR"}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Count</th>
                                                        <td>{item.count}</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                            
                                        </div>
                                    </div>
                                    
                                </InfoCard>
                            )
                        })
                    }
                </div>
            </Container>

        )
    }
}

export default PeersonList;