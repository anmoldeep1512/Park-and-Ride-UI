import React, { useEffect, useState } from 'react'
import { Button, Grid } from 'semantic-ui-react'
import { getParkingAreaByFloorId } from '../../Service/api';
import VehcileRequestCard from '../Cards/VehicleRequestCard/VehicleRequestCard'
import"./VehicleRequest.css";


const VechileRequest = () => {

    const [vehicleRequest, setVehicleRequest] = useState([]);
    const [floorAreas, setFloorAreas] = useState([]);
    const [error, setError] = useState("");
    const [filteredFloorAreas, setFilteredFloorAreas] = useState([]);


    const currUser = JSON.parse(localStorage.getItem('user'))


    useEffect(() => {
        const init = async () => {

            try {
                let { data } = await getParkingAreaByFloorId(currUser.parkingFloorID)
               
                setFloorAreas(data);
            } catch (err) {
                setError(err);
            }


            try {
                let filtered = floorAreas.filter(area => !area.accepted && area.vehicleId )
               
                setFilteredFloorAreas(filtered)
            } catch (err) {
                setError(err);
            }
        }

        init();
    }, [filteredFloorAreas]);
   


    return (
        <div className="vehicle">
        <Grid stackable style={{"width": "100%"}}>
            
            
                        {
                            filteredFloorAreas.map((area, idx) => (
                                <Grid.Column width="4" >
                                    <VehcileRequestCard
                                    parkArea={area}
                                    />
                                    </Grid.Column>

                                )
                            )
                        }
                        
                        
            
        </Grid >
        </div>
    )
}

export default VechileRequest



