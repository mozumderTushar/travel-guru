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
  console.log(fakeData);

  useEffect(() => {

    const data = fakeData.find(data => data.id === Number(destinationId))
    setDestination(data)
    console.log(data);
  }, [])
  console.log(destination,'destination');

  //booking to search
  const history = useHistory()
  const handleBooking = () => {
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
              <Form>
                <Form.Group controlId="formBasicEmail" >
                  <Form.Label>Origin</Form.Label>
                  <Form.Control type="text" placeholder="" required />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Destination</Form.Label>
                  <Form.Control type="text" placeholder="Password" value={destination.name} />
                </Form.Group>
                <div className="row">
                <div className="col-md-6">
                  <Form.Label>From</Form.Label>
                  <form className={classes.container} noValidate>
                    <TextField
                      id="date"
                      type="date"
                      defaultValue="2017-05-24"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </form>
                </div>
                <div className="col-md-6">
                  <Form.Label>To</Form.Label>
                  <form className={classes.container} noValidate>
                    <TextField
                      id="date"
                      type="date"
                      defaultValue="2017-05-24"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </form>
                </div>
              </div>
              <Button className="button mt-3 bookingBtn" onClick={handleBooking} height="40px" variant="contained">Start Booking</Button>
              </Form>
             
            
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TravelDetails;