import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData/travelsDetails'
import hotelData from '../../fakeData/hotels'
import HotelDetails from '../HotelDetails/HotelDetails';
import Map from '../Map/Map';

const Search = () => {

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
                    <Map/>
                </div>
            </div>
        </div>
    );
};

export default Search;