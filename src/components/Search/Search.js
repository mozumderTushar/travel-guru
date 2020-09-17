import React, { useContext, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData/travelsDetails'
import { GoogleMap, LoadScript } from '@react-google-maps/api';


const containerStyle = {
    marginTop:'100px',
    width: '600px',
    height: '900px'
};

const center = {
    lat: -3.745,
    lng: -38.523
};
const Search = () => {

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    const { travelId } = useParams()
    const [hotelDetails, setHotelDetails] = useState({})

    useEffect(() => {
        const hotelInfo = fakeData.find(hotel => hotel.id === Number(travelId))
        setHotelDetails(hotelInfo)
        console.log(hotelInfo)
    }, [travelId])

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <h1>STAYS IN {hotelDetails.name} </h1>
                    <Card style={{ width: '20rem', marginTop: '20px' }}>
                        <Card.Img variant="top" src="https://i.ibb.co/mC1r8wn/Rectangle-26.png" />
                        <Card.Body>
                            <Card.Title>Light bright airy stylish apt  safe peaceful stay</Card.Title>
                            <Card.Text>4 guests   2 bedrooms   2 beds   2 baths </Card.Text>
                            <Card.Text>Wif Air conditioning Kitchen  </Card.Text>
                            <Card.Text>Cancellation fexibility availiable </Card.Text>
                            <Card.Text>$34/night</Card.Text>
                        </Card.Body>
                    </Card>

                    <Card style={{ width: '20rem', marginTop: '20px' }}>
                        <Card.Img variant="top" src="https://i.ibb.co/cDhW86k/Rectangle-27.png" />
                        <Card.Body>
                            <Card.Title>Light bright airy stylish apt  safe peaceful stay</Card.Title>
                            <Card.Title>Light bright airy stylish apt  safe peaceful stay</Card.Title>
                            <Card.Text>4 guests   2 bedrooms   2 beds   2 baths </Card.Text>
                            <Card.Text>Wif Air conditioning Kitchen  </Card.Text>
                            <Card.Text>Cancellation fexibility availiable </Card.Text>
                            <Card.Text>$34/night</Card.Text>
                        </Card.Body>
                    </Card>

                    <Card style={{ width: '20rem', marginTop: '20px' }}>
                        <Card.Img variant="top" src="https://i.ibb.co/V2jTJPm/Rectangle-28.png" />
                        <Card.Body>
                            <Card.Title>Apartment in Lost Panorama</Card.Title>
                            <Card.Title>Light bright airy stylish apt  safe peaceful stay</Card.Title>
                            <Card.Text>4 guests   2 bedrooms   2 beds   2 baths </Card.Text>
                            <Card.Text>Wif Air conditioning Kitchen  </Card.Text>
                            <Card.Text>Cancellation fexibility availiable </Card.Text>
                            <Card.Text>$34/night</Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-md-6">
                    <LoadScript
                        googleMapsApiKey="AIzaSyAjkXxJNCl6bfyHPs_amWDwi--nng9AZ_k"
                    >
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={10}
                            onLoad={onLoad}
                            onUnmount={onUnmount}
                        >
                            { /* Child components, such as markers, info windows, etc. */}
                            <></>
                        </GoogleMap>
                    </LoadScript>
                </div>
            </div>
        </div>
    );
};

export default Search;