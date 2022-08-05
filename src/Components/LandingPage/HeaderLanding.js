import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Collapse,Button } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link as Scroll } from 'react-scroll';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { AccountBalance, AddIcCall, ForkRight } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontFamily: 'Nunito',
  },
  appbar: {
    background: 'none',
  },
  appbarWrapper: {
    width: '80%',
    margin: '0 auto',
  },
  appbarTitle: {
    flexGrow: '1',
  },
  icon: {
    color: '#000',
    fontSize: '3rem',
  },
  colorText: {
    color: '#5AFF3D',
  },
  container: {
    textAlign: 'center',
  },
  title: {
    color: '#fff',
    fontSize: '4.5rem',
  },
  goDown: {
    color: '#5AFF3D',
    fontSize: '4rem',
  },
  button: {
  
    margin: theme.spacing(1),
    marginRight:"0px",
    float:"right",
    minHeight:45,
    '&:hover': {
      backgroundColor: '#5AFF3D',
      color: '#000'
  },
    backgroundColor:"black",
    [theme.breakpoints.down("sm")]: {
      minWidth: 60,
      paddingLeft: 8,
      paddingRight: 8,
      "& .MuiButton-startIcon": {
        margin: 0
      }
    }
  },
  buttonText: {
    fontWeight:"bold",
    fontSize:15,
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  }
}));
export default function HeaderLanding() {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);
  return (
    <div className={classes.root} id="header">
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.appbarWrapper}>
          <h1 className={classes.appbarTitle}>
            PARK AND <span className={classes.colorText}>RIDE.</span>
          </h1>
         
            <Link to="/login">
              <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<LoginIcon />}
            >
            <span className={classes.buttonText}>Login</span>
            </Button>
            </Link>

            <Link to="/register">
            <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<PersonAddAltIcon />}
          >
        <span className={classes.buttonText}>Register</span>
        
      </Button>

            </Link>
            <Scroll to="place-to-visit" smooth={true}>
            
              <Button
              variant="contained"
              color="secondary"
              className={classes.button}
  
              startIcon={<AccountBalance />}
              
            >
              
              <span className={classes.buttonText}>About Us</span>
            </Button>
           
        </Scroll>
        <Scroll to="main_contact" smooth={true}>
            
              <Button
              variant="contained"
              color="secondary"
              className={classes.button}
  
              startIcon={<AddIcCall />}
              
            >
              
              <span className={classes.buttonText}>Contact Us</span>
            </Button>
           
        </Scroll>
         
        </Toolbar>
      </AppBar>

      <Collapse
        in={checked}
        {...(checked ? { timeout: 1000 } : {})}
        collapsedHeight={50}
      >
        <div className={classes.container}>
          <h1 className={classes.title}>
            WELCOME TO <br />
            HU PARK <span className={classes.colorText}>AND RIDE.</span>
          </h1>
          <Scroll to="place-to-visit" smooth={true}>
            <IconButton>
              <ExpandMoreIcon className={classes.goDown} />
            </IconButton>
          </Scroll>
        </div>
      </Collapse>
    </div>
  );
}
