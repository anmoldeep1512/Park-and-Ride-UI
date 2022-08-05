import * as React from 'react';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router-dom';
import WelcomeCard from '../../WelcomeCard/WelcomeCard';
import { Paper } from '@material-ui/core';
import { Card, Divider} from 'semantic-ui-react';
import { borderRadius } from '@mui/system';
import { Log } from '../LogCard/Logs.styles';
import { AuthContext } from '../../../App';
import SessionContext from '../../../contexts/SessionContext';

export default function LogOut() {
    const { state,dispatch } = React.useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = (anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const currUser = JSON.parse(localStorage.getItem('user'))
  return (
    <div>
      <Button
      className='logout'
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        style={{
            backgroundColor: "Black",
            color:"White" ,
            fontSize:"1rem",
            fontWeight:"bold"
        }}
      >
        {currUser.fullName}
      </Button>
      <Menu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <div onClick={handleClose} disableRipple>
         <WelcomeCard/>
        </div>
      
      </Menu>
    </div>
  );
}