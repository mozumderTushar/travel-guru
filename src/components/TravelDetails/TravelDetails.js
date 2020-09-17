import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import fakeData from '../../fakeData/travelsDetails'
import { Card, Form } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import './TravelDetails.css'
import Search from '../Search/Search';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));
const TravelDetails = () => {
  const classes = useStyles();
  const { destinationId } = useParams()

  const [destination, setDestination] = useState({})
  const [travelData, setTravelData] = useState([])

  useEffect(() => {
    const data = fakeData.find(data => data.id === Number(destinationId))
    setDestination(data)
  }, [])
 

  //booking to search
  const history = useHistory()
  const handleBooking = (e) => {
    e.preventDefault();
    history.push(`/search/${destinationId}`)
  }

  return (
    <div className="bg">
      <div className="row travel-info">
        <div className="col-md-7 details">
          <h1>{destination.name}</h1>
          <h3>{destination.details}</h3>
        </div>
        <div className="col-md-5">
          <Card style={{ width: '30rem', marginTop: '100px' }} >
            <Card.Body>
              {/* <Form>
                <Form.Group controlId="formBasicText" >
                  <Form.Label>Origin</Form.Label>
                  <Form.Control type="text" placeholder="" required />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Destination</Form.Label>
                  <Form.Control type="text"  value={destination.name} />
                </Form.Group>
                </Form> */}
                
                <Form onSubmit={handleBooking}>

    


  <Form.Group controlId="formBasicEmail">
  <Form.Label>Origin</Form.Label>
    <Form.Control  type="text" name="email" placeholder="Enter Your Origin" required/>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
  <Form.Label>Destination</Form.Label>
    <Form.Control   type="text" name="name"  placeholder="Enter Your Destination" required/>
  </Form.Group>

  <div className="row">
                <div className="col-md-6">
                  <Form.Label>From</Form.Label>
                  
                    <TextField
                      id="Startdate"
                      type="date"
                      defaultValue="2017-05-24"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  
                </div>
                <div className="col-md-6">
                  <Form.Label>To</Form.Label>
                  
                    <TextField
                      id="Enddate"
                      type="date"
                      defaultValue="2017-05-24"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  
                </div>
              </div>

  {/* <input className="BtnDesign" type="submit"  /> */}
  <button className="BtnDesign mt-3">Start Booking</button>
</Form>
  

               
              {/* <Button className="button mt-3 bookingBtn" onClick={handleBooking} height="40px" variant="contained">Start Booking</Button> */}
             
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TravelDetails;