import React, { useContext, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData/travelsDetails'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import hotelData from '../../fakeData/hotels'
import HotelDetails from '../HotelDetails/HotelDetails';

const containerStyle = {
    marginTop: '100px',
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
    const [travelerDetails, settravelerDetails] = useState({})

    useEffect(() => {
        const travelerInfo = fakeData.find(traveler => traveler.id === Number(travelId))
        settravelerDetails(travelerInfo)
    }, [travelId])

    //hotel fakeData
    const [hotelInfo, setHotelInfo] = useState([])
    useEffect(() => {
        const hotelDetails = hotelData.filter(hotel => hotel.pid === Number(travelId))
        setHotelInfo(hotelDetails)
    }, [])

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <h1>STAYS IN {travelerDetails.name} </h1>
                    {
                        hotelInfo.map(hotel => <HotelDetails hotel={hotel} key={hotel.name}></HotelDetails>)
                    }
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
                            <></>
                        </GoogleMap>
                    </LoadScript>
                </div>
            </div>
        </div>
    );
};

export default Search;