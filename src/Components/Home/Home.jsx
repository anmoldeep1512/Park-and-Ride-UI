import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import HeaderLanding from '../LandingPage/HeaderLanding';
import PlaceToVisit from '../LandingPage/PlaceToVisit';
import ContactUs from '../LandingPage/ContactUs';


const useStyles = makeStyles((theme) => ({
    body: {
      minHeight: '100vh',
      backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/park4.jpg'})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
  }));

function Home() {
    const classes = useStyles();
  return (
    <div className={classes.body}>
        <CssBaseline/>
       <HeaderLanding/>
       <PlaceToVisit/>
       <ContactUs/>
    </div>
  )
}

export default Home