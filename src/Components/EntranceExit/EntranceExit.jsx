import React, { useContext, useEffect, useState } from 'react'
 import "./entranceExit.css"
import axios from 'axios'
import { findAllVehicles, getEntranceExitLogsByAdminId } from '../../Service/api';
import { Button, Card, Form, Header, Icon, Message, Modal, Radio } from 'semantic-ui-react'
import SessionContext from '../../contexts/SessionContext';
import { AuthContext } from '../../App';
import DateFormatter from '../DateFormatter/DateFormatter';
import VehicleLog from '../Cards/Vehiclelog/vehiclelog';



function EntranceExit() {
  const { state,dispatch } = React.useContext(AuthContext);

    const [allData, setData] = React.useState([]);
    const [logs, setLogs] = React.useState([])
    const [allVehicles, setallVehicles] = useState([]);
    const [error, setError] = useState("");
   

    
    const user = JSON.parse(localStorage.getItem('user'))
   

    
    useEffect(() => {
      
      const init = async () => {
        
  
          try {
           
              const { data } = await getEntranceExitLogsByAdminId(user.username);
              setLogs(data);
              
        
          } catch (err) {
            console.log("in error")
              setError(err);
          }
      }
      init();
  }, [])

    useEffect(() => {

      const url = "https://parkride-parking-service-urtjok3rza-wl.a.run.app/parking-service/all-entrance-exit-log";
      axios.get(url)
      .then(res=>
        {
          
          setData(res.data);
        })
        
          
        
        .catch(err=>{
          console.log(err);
        }
          )
        
    },[] );
    
    
    return (
      
      <div className="vehicleinfo">
          { logs.map(data=>(
            <div className="vehicleLog">
              <div>
                 <div className="vehicleinfoitem" key={ data.id}>
                    <span className="vehicleinfoTitle">Entrance Exit {data.id}</span>
                    <div className="vehicleinfoContainer">
                      {/* <span className="vehicleinfoparking">License Plate: {data.plateno}</span> */}
                      <span className="vehicleinfoparking">Parking Floor: <strong>{data.parkingFloorId}</strong></span>
                       <span className="vehicleinfoparking">Parking Id: <strong> {data.parkingId}</strong></span>
                      <span className="vehicleinfoparking">Vehicle Id : <strong> {data.plateNo}</strong></span>
                      <span className="vehicleinfoparking">Entrance Time: </span>
                       <span className="vehicleinfoparking"> <DateFormatter date={new Date(data.entranceTime)}></DateFormatter></span>
                      <span className="vehicleinfoparking">Exit Time: </span> 
                      <span className="vehicleinfoparking">  {data.exitTime?
                        <DateFormatter date={new Date(data.exitTime)}/>
                         : <strong>"Still Inside"</strong>}</span>
                    </div>
                  </div>
              </div>


          </div>
      
          ))}
          
      </div>
     
    
    )
}

export default EntranceExit