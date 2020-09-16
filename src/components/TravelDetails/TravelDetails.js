import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData/travelsDetails'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
  });
  


const TravelDetails = () => {
    const classes = useStyles();
    const {destinationId} = useParams()

    const [destination, setDestination] = useState({})
    console.log(fakeData);

    useEffect(() => {
       
        const data = fakeData.find(data => data.id === Number(destinationId))
        setDestination(data)
        console.log(data);
    },[])
    console.log(destination);

    return (
        <div className="bg">
            <div className="row">
            <div className="col-md-8 details">
                <h1>{destination.name}</h1>
                <h3>{destination.details}</h3>
                </div>
            <div className="col-md-4">
            <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
            </div>
            </div>
        </div>
    );
};

export default TravelDetails;