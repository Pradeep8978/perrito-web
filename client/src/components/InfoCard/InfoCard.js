import React from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import './InfoCard.scss';
class InfoCard extends React.Component {
    state = {};

    renderButtons = () => {
        const {onEditClick, onDeleteClick, onDetailsClick, deleting } =this.props;
        return <div className="row student_navigation action-btns">
            <button className="btn btn-info btn-block" onClick={onDetailsClick}>View Details</button>
            <button className="btn btn-success btn-block" onClick={onEditClick}>Edit Details</button>
            <button className="btn btn-danger btn-block" disabled={deleting} onClick={onDeleteClick}>
                {deleting ? 'Deleting' : 'Delete'}
            </button>
        </div>
    }

    render() {
        return (
            <Card className="info_card">
                <CardHeader><b>{this.props.name}</b></CardHeader>
                    {this.renderButtons()}
                <CardBody className="row">
                    {this.props.children}
                </CardBody>
            </Card>

        )
    }
}

export default InfoCard;

InfoCard.defaultProps = {
    title: "",
    onEditClick: () => {},
    onDetailsClick: () => {},
    onDeleteClick: () => {},
    deleting: false
}