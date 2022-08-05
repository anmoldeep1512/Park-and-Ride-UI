import React from 'react'
import './vehicleinfo.css'
import axios from 'axios'
 

function VehicleInfo() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [user, setData] = React.useState([]);
  
    React.useEffect(() => {
      const url = "https://parkride-parking-service-urtjok3rza-wl.a.run.app/parking-service/all-entrance-exit-log";
      axios.get(url)
      .then(res=>
        {
         
          setData(res.data);
        })
        .then(data=>{
            let temp=data.results;
            
        }
  
          )
        
        .catch(err=>{
          console.log(err);
        }
          )
        
    },[] );
    
    
    return (
        
      <div className="vehicleinfo">
          { user.map(data=>(
          <div className="vehicleinfoitem" key={data.id}>
              <span className="vehicleinfoTitle">EntranceExit{data.id}</span>
              <div className="vehicleinfoContainer">
              <span className="vehicleinfoparking">ParkingFloor:{data.parkingFloorId}</span>
                  <span className="vehicleinfoparking">Parking Id: {data.parkingId}</span>
                  <span className="vehicleinfoparking">Vehicle Id:{data.vehicleId}</span>
                  <span className="vehicleinfoparking">Entrance Time:{data.entranceTime}</span>
                  <span className="vehicleinfoparking">Exit Time: {data.exitTime}</span>
                  
              </div>
          </div>
          ))}
          
          
      </div>
    )
}

export default VehicleInfo