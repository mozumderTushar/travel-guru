import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import './SliderCarousel.css';
import fakeData from '../../fakeData/travelsDetails'
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const SliderCarousel = () => {

    const [index, setIndex] = useState(0);


    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
   
    const [data, setData] = useState({})
    useEffect(() => {
        const fake = fakeData.find(data => data.id === index)
        setData(fake)
    }, [index])

    return (
        <div className="bg">
            <div className="row carousel-info">
                <div className="col-md-8 details">
                    <h1>{data.name}</h1>
                    <h3>{data.details}</h3>
                    <Link to={`details/${data.id}`}><Button className="button" height="40px" variant="contained">{data.button}</Button></Link>
                </div>
                <div className="col-md-4">
                    <Carousel activeIndex={index} onSelect={handleSelect}>
                        <Carousel.Item>
                            <img
                                className="d-block w-100 carousel-img"
                                src="https://i.ibb.co/9gQZxBQ/Sajek.png"
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h3>Cox's bazar</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100 carousel-img"
                                src="https://i.ibb.co/YPKSjtc/Sreemongol.png"
                                alt="Second slide"
                            />

                            <Carousel.Caption>
                                <h3>Sreemongol</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100 carousel-img"
                                src="https://i.ibb.co/2SD3HhX/sundorbon.png"
                                alt="Third slide"
                            />

                            <Carousel.Caption>
                                <h3>Sundorbon</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
        </div>
    );
};

export default SliderCarousel;