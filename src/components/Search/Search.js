import React, { useContext, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData/travelsDetails'


const Search = () => {
    const { travelId } = useParams()
    const [hotelDetails, setHotelDetails] = useState({})

    useEffect(() => {
        const hotelInfo = fakeData.find(hotel => hotel.id === Number(travelId))
        setHotelDetails(hotelInfo)
    }, [travelId])

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <h1>STAYS IN {hotelDetails.name} </h1>
                    <p>id: {travelId}</p>
                    <Card style={{ width: '20rem', marginTop: '20px' }}>
                        <Card.Img variant="top" src="https://i.ibb.co/mC1r8wn/Rectangle-26.png" />
                        <Card.Body>
                            <Card.Title>Light bright airy stylish apt  safe peaceful stay</Card.Title>
                            <Card.Text>
                                <p>4 guests   2 bedrooms   2 beds   2 baths</p>
                                <p>Wif Air conditioning Kitchen</p>
                                <p>Cancellation fexibility availiable</p>
                                <p><small>$34/night</small></p>
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <Card style={{ width: '20rem', marginTop: '20px' }}>
                        <Card.Img variant="top" src="https://i.ibb.co/cDhW86k/Rectangle-27.png" />
                        <Card.Body>
                            <Card.Title>Light bright airy stylish apt  safe peaceful stay</Card.Title>
                            <Card.Text>
                                <p>4 guests   2 bedrooms   2 beds   2 baths</p>
                                <p>Wif Air conditioning Kitchen</p>
                                <p>Cancellation fexibility availiable</p>
                                <p><small>$44/night</small></p>
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <Card style={{ width: '20rem', marginTop: '20px' }}>
                        <Card.Img variant="top" src="https://i.ibb.co/V2jTJPm/Rectangle-28.png" />
                        <Card.Body>
                            <Card.Title>Apartment in Lost Panorama</Card.Title>
                            <Card.Text>
                                <p>4 guests   2 bedrooms   2 beds   2 baths</p>
                                <p>Wif Air conditioning Kitchen</p>
                                <p>Cancellation fexibility availiable</p>
                                <p><small>$52/night</small></p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-md-6"></div>
            </div>
        </div>
    );
};

export default Search;