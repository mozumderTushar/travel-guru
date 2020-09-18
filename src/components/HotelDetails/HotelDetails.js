import React from 'react';
import { Card } from 'react-bootstrap';
import './HotelDetails.css'

const HotelDetails = (props) => {
    const { img, name, detailsOne, detailsTwo, detailsThree, detailsFour } = props.hotel;
    return (
        <div>
            <Card style={{ width: '20rem', marginTop: '20px' }}>
                <Card.Img variant="top" src={img} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>{detailsOne}</Card.Text>
                    <Card.Text>{detailsTwo}</Card.Text>
                    <Card.Text>{detailsThree}</Card.Text>
                    <div className="rating">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half-alt"></i>
                    </div>
                    <Card.Text>{detailsFour}</Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default HotelDetails;