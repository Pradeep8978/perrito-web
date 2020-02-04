import React from 'react';
import Skeleton from 'react-loading-skeleton';
import InfoCard from '../InfoCard/InfoCard';
import './ProductList.scss';

class PeersonList extends React.Component {
    state = {};

    _renderSkeleton = () => {
        return Array(5).fill(null).map((o, i) =>
            <div key={i} style={{ marginBottom: '20px' }} >
                <Skeleton  height={30} />
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
        const { productList } = this.props;
        console.log('Student List =>', this.props);
        if (this.props.studentListLoading) {
            return this._renderSkeleton()
        }
        return (
            <div className="student_list">
                {
                    productList.map(item => {
                        return (
                            <InfoCard key={item.admission_number}
                                title={item.student_info && (item.student_info.first_name + " " + item.student_info.last_name)}
                                deleting={this.props.deleting}
                                onEditClick={() => this.props.onEditClick(item)}
                                onDeleteClick={() => this.props.onDeleteClick(item)}
                                onDetailsClick= {() =>this.props.onDetailsClick(item)}
                            >   
                                <div className="d-flex w-100 ml-2 mr-2">
                                    <img className="profile_image" src={item.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2vLgGPS1eLS4f9DLoa6T7GTiimfHHPGXAk3TMV9hyMBQTSGGgFg"} alt="student_img" />
                                    {/* <image className="profile_image" src={item.image} alt="Profile Image"/> */}
                                    <div className="col-12 row ml-2">
                                <div className="col-4 mb-2">
                                    <label>Name</label>
                                    <div>{item.name}</div>
                                </div>
                                <div className="col-4 mb-2">
                                    <label>Date of joining</label>
                                    <div>{item.date_of_joining}</div>
                                </div>
                                <div className="col-4 mb-2">
                                    <label>Date Of Birth</label>
                                    <div>{item.dob}</div>
                                </div>
                                </div>
                                </div>
                            </InfoCard>
                        )
                    })
                }
            </div>
        )
    }
}

export default PeersonList;