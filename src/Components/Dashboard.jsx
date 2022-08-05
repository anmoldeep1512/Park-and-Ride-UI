import React ,{useEffect} from 'react'
import Sidebar from './Sidebar/Sidebar'
import "./dashboard.css"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,Redirect
} from "react-router-dom";
import Header from './Header';

import Payment from './Payment/Payment';
import Vehicle from './Vehicle/Vehicle';

import EntranceExit from './EntranceExit/EntranceExit';
import ParkArea from './ParkArea/ParkArea';
import Login from '../Pages/Login/Login';
import VehicleRequest from '../Components/VehicleRequest/VehicleRequest'

import ListOfVehicles from '../Components/ListOfVehicles/ListOfVehicles'
import User from './User/User';


function Dashboard() {

  let history = useHistory();
  function isLoggedIn() {
    
    if (JSON.parse(localStorage.getItem('token')) === null)   
       history.push("/login")
        // window.location.href = "/login";
}

useEffect(() => {
  isLoggedIn();
}, []);



 
  return (
  <>

  
   {JSON.parse(localStorage.getItem('token'))?<Header/>:null}
  
   <Router>
     
      <div className="container">
        <Route path='/dashboard/vehicle'   component={Vehicle}>
          
          </Route>
          <Route exact path='/dashboard/payment' component={Payment}>
         
          </Route>
          <Route path='/dashboard/parking' component={ParkArea}>
          
          </Route>
          <Route exact path='/dashboard/entrance_exit' component={EntranceExit}>
          
         
          </Route>

          <Route exact path='/dashboard/Listvehicle' component={ListOfVehicles}></Route>
          
          <Route exact path='/dashboard/vehicle_request' component={VehicleRequest}></Route>
          <Route exact path='/dashboard/list_user' component={User}></Route>
          

          
      </div>
      </Router>
      </>
  )
}

export default Dashboard