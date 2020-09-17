import React from 'react';
import { Card } from 'react-bootstrap';

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
                    <Card.Text>{detailsFour}</Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default HotelDetails;