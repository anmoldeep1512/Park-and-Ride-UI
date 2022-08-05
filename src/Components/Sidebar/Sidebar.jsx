import React from 'react'
import "./sidebar.css"
import LineStyleIcon from '@mui/icons-material/LineStyle';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';
import PaidIcon from '@mui/icons-material/Paid';
import { Link } from 'react-router-dom';


function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarmenu">
          <ul className="sidebarList">
            {/* <li className="sidebarListItem">
              <LineStyleIcon className='sidebarIcon' />
              Home
            </li> */}
            
            <li className="sidebarListItem">
              <LocalParkingIcon  className='sidebarIcon'/>
              <Link to='/parking' style={{color: 'inherit'}}> Parking Area</Link>
             
            </li>
            <li className="sidebarListItem">
              <DirectionsCarFilledIcon  className='sidebarIcon'/>
              <Link to='/vehicle'style={{color: 'inherit'}}>Vehicles</Link>
            </li>
            <li className="sidebarListItem">
              <RoomPreferencesIcon  className='sidebarIcon'/>
              <Link to='/entrance_exit' style={{color: 'inherit'}}>Entrance {"&"} Exit</Link>
              
            </li>
            <li className="sidebarListItem">
              <PaidIcon  className='sidebarIcon'/>
              <Link to='/payment' style={{color: 'inherit'}} >Paymentsss</Link>
              
            </li>

          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar