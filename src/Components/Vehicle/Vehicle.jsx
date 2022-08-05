
import AddNewVehicleCard from '../Cards/AddNewVehicleCard/AddNewVehicleCard';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Icon } from 'semantic-ui-react'

import UserVehicleCard from '../Cards/UserVehicle/UserVehicle';
import"./vehicle.css";
import {  findAllVehiclesOfUser, getAllParkingFloors, getEntranceExitLog } from '../../Service/api';
import SessionContext from '../../contexts/SessionContext'
import LogCard from '../Cards/LogCard/Logcard';


function Vehicle() {
  const { user } = useContext(SessionContext);
  const [vehicles, setVehicles] = useState([]);
  const [parkings, setParkings] = useState([]);
  const [listLogs, setListLogs] = useState(false);
  const [vehicleLogs, setVehicleLogs] = useState([]);
  const [allLogs, setAllLogs] = useState([]);
  const [listedVehicleId, setListedVehicleId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const init = async () => {

        setLoading(true);

        try {
            const { data } = await getAllParkingFloors();
            setParkings(data);
           
      
        } catch (err) {
            setError(err);
        }


        try {
          const user=JSON.parse(localStorage.getItem('user'))
          let { data } = await findAllVehiclesOfUser(user.id);

          
          const vehicle=[]
          data.map((data, idx) => (
          vehicle.push(data)
          ))
         
          
          setVehicles(vehicle)
         
          } catch (err) {
          setError(err);
          }

        setLoading(false);
    }



    init();
}, [])




useEffect(() => {
  const getListedVehicleLogs = async () => {
      setLoading(true);
      try {
          let { data } = await getEntranceExitLog();
          setAllLogs(data);
          data = data.filter((log) => Number(log.vehicleId) === Number(listedVehicleId));
          setVehicleLogs(data);
      } catch (err) {
          setError(err);
      }
      setLoading(false);
  }
  
  getListedVehicleLogs();
}, [listLogs, listedVehicleId])

const backOnClickHandler = () => {
  setListLogs(false);
}



  return (
   
    <div className="vehicle">

      {
        listLogs?
        <div style={{ marginBottom: "1%", marginTop: "1%" }}>
            <Button animated primary onClick={backOnClickHandler}>
              <Button.Content visible>Back</Button.Content>
              <Button.Content hidden><Icon name="arrow left" /></Button.Content>
              </Button>
        </div>:
        <AddNewVehicleCard
        vehicles = {vehicles}
   
        />  
}

      {
        listLogs?

        vehicleLogs.map((log) =>
        <LogCard
         listLogs={log}
         vehicles={vehicles}
         parkings={parkings}
         />)
         :

         vehicles.map((vehicle) =>
    
          <UserVehicleCard
            vehicle={vehicle}
            listLogs={allLogs}
            parkings={parkings}
            setListLogs={setListLogs}
            setListedVehicleId={setListedVehicleId}
            />
            
          )
      }
        
    </div>
  
  )
}

export default Vehicle