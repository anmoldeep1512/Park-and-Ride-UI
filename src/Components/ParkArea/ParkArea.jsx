import React ,{ useContext,useState,useEffect} from 'react';
import { Form,Grid,Select,Sticky,Ref } from 'semantic-ui-react';
import SessionContext from '../../contexts/SessionContext';
import { findAllVehicles, findAllVehiclesOfUser, getAllParkingFloors, getEntranceExitLog, getParkingAreaByFloorId, getParkingAreaWithAdminId } from '../../Service/api';
import ParkingAreaCard from '../Cards/ParkAreaCard/ParkingAreaCard'
import './ParkArea.css'
import {AuthContext} from '../../App'

const ParkArea = () => {
 
    const contextRef = React.createRef();
    const {state,action}= useContext(AuthContext);
    const [allVehicles, setAllVehicles] = useState([]);
    const [selectedCar, setSelectedCar] = useState("");
    const [carOptions, setCarOptions] = useState([]);
    const [parkingOptions, setParkingOptions] = useState([]);
    const [carError, setCarError] = useState(false);
    const [error, setError] = useState("");
    const [selectedParking, setSelectedParking] = useState("Area 1");
    const [loading, setLoading] = useState(false);
    const [parkings, setParkings] = useState([]);
    const [allLogs, setAllLogs] = useState([]);
    const [parkingSlot, setParkingSlot] = useState([]);
    const[allVehiclesOfUser, setAllVehiclesOfUser]=useState([])
    
  
    
    const currUser = JSON.parse(localStorage.getItem('user'))

   

    const selectCarOnChangeHandler = (event, { value }) => {
        setSelectedCar(value);
        setCarError(false);
    }
    const selectParkingOnChangeHandler = (event, { value }) => {
        
        let parkingFloorId=1;
      
        for(var i=0;i<parkings.length;i++)
        {
            
            if(parkings[i].parkingAreaName===value)
            {
                parkingFloorId=parkings[i].parkingFloorId;
            }
  
        }
        
        const init = async () => {

            try {
                let { data } = await getParkingAreaByFloorId(parkingFloorId)
                
                setParkingSlot(data)
                
            } catch (err) {
                setError(err);
            }
        }
        init();
        

        setSelectedParking(value);
    }

    

    useEffect(() => {

        setSelectedCar('');
        setLoading(true);
       
        const init = async () => {
            
            try {
                
                
                let { data } = await findAllVehiclesOfUser(currUser.id);

                setAllVehiclesOfUser(data)

                
                const vehicle=[]
                data.map((data, idx) => (
                  
                !data.parked?vehicle.push({text:data.plateno,value:data.plateno}):null
                ))
                
                setCarOptions(vehicle)
              
            } catch (err) {
                setError(err);
            }

            try {
                const { data } = await getAllParkingFloors();
                
                setParkings(data)
                
                setSelectedParking(data[0].name);

                const parkingAreaFloor=[]
                data.map((data, idx) => (
                parkingAreaFloor.push({text:data.parkingAreaName,value:data.parkingAreaName})
                ))

               
                setParkingOptions(parkingAreaFloor)
               
            } catch (err) {
                setError(err);
            }

            try {
                const { data } = await findAllVehicles()
                setAllVehicles(data);
                
            } catch (err) {
                setError(err);
            }

            try {
                const { data } = await getEntranceExitLog()
            
              
             
                setAllLogs(data);
            } catch (err) {
                setError(err);
            }

            try {
               
                if(currUser.roleName=='ADMIN')
                {
                    let { data } = await getParkingAreaWithAdminId(currUser.username)
                   
                    setParkingSlot(data)
                }
                else{

                    let { data } = await getParkingAreaByFloorId(1)
                    
                    setParkingSlot(data)
                }
              
            } catch (err) {
                setError(err);
            }

        }
        init();
        
        setLoading(false)
        
    },[])

  




    return( <div className="SearchBar">
          
           
           {
               !currUser.roleName?
               <Sticky context={contextRef}>
            <Grid stackable centered>
            
            <div  style={{ marginBottom: "1%", marginTop: "1%",color: error ? "red" : "" }}>
                    <Form>

                                       
                            
                            <Form.Field
                                loading={loading}
                                value={selectedCar}
                                onChange={selectCarOnChangeHandler}
                                required
                                control={Select}
                                options={carOptions}
                                placeholder='Choose your car'
                                search
                                error={carError} 
                            />
                    </Form>
             </div> 
              <div style={{ marginBottom: "1%", marginTop: "1%" }}>
              <Form >
             
                    <Form.Field 
                        loading={loading}
                        value={selectedParking}
                        onChange={selectParkingOnChangeHandler}
                        required
                        control={Select}
                        options={parkingOptions}
                        placeholder="Select Parking Floor"
                        search
                        />
                </Form>
              </div>
            </Grid> 
        </Sticky>: null
           }
          
            

        <Ref innerRef={contextRef}>
            <Grid stackable>
            
            {parkingSlot.map((data, idx) => (
             <Grid.Column width="4">
               <ParkingAreaCard 
               content={data}
               vehicles={allVehicles}
               index={idx}
               allLogs={allLogs}
               setCarError={setCarError}
               selectedCar={selectedCar}
               user={state.user}
               allVehiclesOfUser={allVehiclesOfUser}
               parkings={parkingSlot}
               
               
               />
             </Grid.Column>
                ))} 
           
            </Grid>
            
         </Ref>
    </div>
    )
}


export default ParkArea;