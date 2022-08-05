import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import VehicleLog from '../Cards/Vehiclelog/vehiclelog';
import './listvehicle.css'
import { findAllVehicles, getEntranceExitLogsByAdminId } from '../../Service/api';



const ListOfVehicles = () => {
        

    const [logs, setLogs] = useState([])
    const [allVehicles, setallVehicles] = useState([]);
    
    const user = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        
        const init = async () => {
         
    
            try {
              
                const { data } = await getEntranceExitLogsByAdminId(user.username);
                setLogs(data);
               
          
            } catch (err) {
              console.log("in error")
               
            }
            try {
              
                const { data } = await findAllVehicles();
               
                setallVehicles(data);
              
          
            } catch (err) {
              console.log("in error")
             
            }
          }
        init();
    }, [])


         return(
          <div className="listvehicle">

           {allVehicles.map(vehicle=>(
            logs.map(log=>(
              vehicle.id==log.vehicleId?<VehicleLog data={vehicle} />:null
            )
            )
          ))
          } 
           
        </div>
         ) 
}



export default ListOfVehicles;