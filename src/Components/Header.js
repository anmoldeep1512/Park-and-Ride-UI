import React, { useState } from "react";
import "./header.css"

import {
  AppBar,
  Toolbar,
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  CssBaseline,
  Drawer,
  Typography,
  Button
} from "@material-ui/core";
import {
  Apps,
  Menu,
  ContactMail,
  AssignmentInd,
  Home,
  LocalParkingOutlined,
  DirectionsCarOutlined
} from "@material-ui/icons";
import ApprovalIcon from '@mui/icons-material/Approval';
import LineStyleIcon from '@mui/icons-material/LineStyle';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';
import PersonIcon from '@mui/icons-material/Person';
import PaidIcon from '@mui/icons-material/Paid';
import { Link, useHistory } from "react-router-dom";
import { fontSize } from "@mui/system";
import WelcomeCard from "./WelcomeCard/WelcomeCard";
import { ElectricCar } from "@mui/icons-material";
import {AuthContext} from '../App'
import LogOut from "./Cards/Logout/Logout";
const useStyles = makeStyles((theme) => ({
  menuSliderContainer: {
    width: 250,
    background: "#000",
    height: "100%"
  },
  avatar: {
    margin: "0.5rem auto",
    padding: "1rem",
    width: theme.spacing(13),
    height: theme.spacing(13)
  },
  listItem: {
    padding: "20px",
    Cursor: "pointer",
    fontSize: "1.25rem",
    color: "white",
    display: "flex",
    alignItems: "center",
    '&:hover':{
        backgroundColor: "white",
    color: "black",
    borderRadius: "5px",
    }
  },
   toolbar:{
    display: "flex",
    justifyContent: "space-between",
   },
  navbar: {
    padding: "0.5%",
    background: "#000",
    position: "fixed",
   
  },
  icon: {
    color: "#fff",
    fontSize: "3rem"
  },
  logout:{
    padding: "10px",
    border: "2px solid #fff",
    backgroundColor:"transparent",
    color: "#fff",
    cursor:"pointer",
    fontSize: "15px",
    fontWeight:"bold",
    borderRadius: "5px",
    '&:hover':{
      backgroundColor: "white",
  color: "black",
  borderRadius: "5px",
  }
  }

}));

  


export default function App() {

  
  const { state,dispatch } = React.useContext(AuthContext);
  const classes = useStyles();
  let history = useHistory();
  const [open, setOpen] = useState(false);
  const [show, setShow]=useState(false);

  const toggleSlider = () => {
    setOpen(!open);
  };




  const sideList = () => (
    <Box className={classes.menuSliderContainer} component="div">
      <Avatar
        className={classes.avatar}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNMFC6qlSImB6HfihVXGrdqsz0JXF4L_kvow&usqp=CAU"
        alt="Juaneme8"
      />
      <Divider />
      <div className="sidebarmenu">
          <List className="sidebarList">
            
            <Link onClick={() => {
                setOpen(false)
                history.push("/dashboard/parking")
                window.location.reload() 
            }}>
            <ListItem className={classes.listItem}>
              <LocalParkingIcon  className='sidebarIcon'/>
              Parking Area
            </ListItem>
            </Link>
              <Link  onClick={() => {
                setOpen(false)
                history.push("/dashboard/vehicle")
                window.location.reload() 
            }}>
            <ListItem className={classes.listItem}>
              <DirectionsCarFilledIcon  className='sidebarIcon'/>
                  Vehicle
            </ListItem>
              </Link>


            <Link onClick={() => {
                setOpen(false)
                history.push("/dashboard/payment")
                window.location.reload()
            }}>
            <ListItem className={classes.listItem}>
              <PaidIcon  className='sidebarIcon'/>
              Payment
            </ListItem>
            </Link>
            
          </List>
        
        </div>
    </Box>
  );
  const sideListAdmin = () => (

    // 'Entrance Exit Log', 'List Park Area', 'List Vehicles'
    <Box className={classes.menuSliderContainer} component="div">
      <Avatar
        className={classes.avatar}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNMFC6qlSImB6HfihVXGrdqsz0JXF4L_kvow&usqp=CAU"
        alt="Juaneme8"
      />
      <Divider />
      <div className="sidebarmenu">
          <List className="sidebarList">
            
            <Link onClick={() => {
                setOpen(false)
                history.push("/dashboard/parking")
                window.location.reload() 
            }}>
            <ListItem className={classes.listItem}>
              <LocalParkingIcon  className='sidebarIcon'/>
              List of Parking Area
            </ListItem>
            </Link>

              <Link  onClick={() => {
                setOpen(false)
                history.push("/dashboard/Listvehicle")
                window.location.reload() 
            }}>
            <ListItem className={classes.listItem}>
              <DirectionsCarFilledIcon  className='sidebarIcon'/>
                List Of Vehicles
            </ListItem>
              </Link>

              <Link onClick={() => {
                setOpen(false)
                history.push("/dashboard/entrance_exit")
                window.location.reload() 
            }}>
            <ListItem className={classes.listItem}>
              <RoomPreferencesIcon  className='sidebarIcon'/> 
              Entrance Exit Log
            </ListItem>
              </Link>


              <Link onClick={() => {
                setOpen(false)
                history.push("/dashboard/vehicle_request")
                window.location.reload() 
            }}>
            <ListItem className={classes.listItem}>
              <ApprovalIcon  className='sidebarIcon'/> 
              Vehicle Requests
            </ListItem>
              </Link>


              <Link onClick={() => {
                setOpen(false)
                history.push("/dashboard/list_user")
                window.location.reload() 
            }}>
            <ListItem className={classes.listItem}>
              <PersonIcon  className='sidebarIcon'/> 
              Users List
            </ListItem>
              </Link>
            
          </List>
        
        </div>
    </Box>
  );


  return (
    <>
      <CssBaseline />

      <Box component="nav">
        <AppBar className={classes.navbar} position="static">
          <Toolbar className={classes.toolbar} >
              <div style={{
                  display:"flex",
                  alignItems:"center",
              }}>
            <IconButton className={classes.icon} onClick={toggleSlider}>
              <Menu />
            </IconButton >
            <Typography  style={{
                fontSize:"2rem",
                fontWeight:"bolder",
            }}>
                Park & Rides</Typography>
              </div>
              <div>
            <IconButton>
              
              <Avatar  alt="Remy Sharp"  src={`https://avatars.dicebear.com/api/human/${Math.floor(Math.random() * 5000)}.svg`} style={{marginRight:"0.5rem"}}/>
              <LogOut/>
            </IconButton>
            </div>
            <Drawer open={open} anchor="left" onClose={toggleSlider}>
              {JSON.parse(localStorage.getItem('user')).roleName?sideListAdmin():sideList()}
            </Drawer>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
