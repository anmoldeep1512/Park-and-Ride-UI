
import React, {  useState,useEffect } from 'react'
import { Button, Card, Divider, Icon, Modal } from 'semantic-ui-react'
import { addEntranceExitLog, findAllVehiclesOfUser, getAllParkingFloors, getEntranceExitLogByVehicleID, getParkingAreaByFloorId, updateEntranceExitLog, updateParkingArea, updateVehicle } from '../../../Service/api'
import { WordBreaker } from '../../WelcomeCard/Welcome.styles'
import {AuthContext} from '../../../App'
import Swal from 'sweetalert2'

const ParkAreaCard = ({ content, vehicles, index, setCarError, selectedCar, allLogs,user,allVehiclesOfUser,parkings }) => {
   

    const { state,dispatch } = React.useContext(AuthContext);

    const [entranceExitLoading, setEntranceExit] = useState(false);
    const [floorAreas, setFloorAreas] = useState([]);
    const [allUserVehicle, setAllUserVehicle] = useState([]);
    const [vehicleList, setVehicleList] = useState([]);
    const [error, setError] = useState("");
    const [textAreaValue, setTextAreaValue] = useState("");
    const [modalOpen, setModalOpen] = useState(false);


    const currUser = JSON.parse(localStorage.getItem('user'))

    const handleParkHereOnClick = async () => {
       
        if (selectedCar !== "") {
            
        
            const vehicle = vehicles.find((vehicle) => selectedCar === vehicle.plateno);
            const id=vehicle.id;
            const plateno=vehicle.plateno;


            
            
            try {
                let { data } = await getParkingAreaByFloorId(content.parkingFloorId)
               
                setFloorAreas(data);
            } catch (err) {
                setError(err);
            }
            

            
            try {

                setEntranceExit(true);


               
                
                const userVehicle=[]
                allVehiclesOfUser.map((data, idx) => (
                    userVehicle.push(data.id)
                ))

                const filteredArea = parkings.filter(area => userVehicle.includes(area.vehicleId));
                 
                

                  
               
                if (filteredArea.length >=2 ){
                    setModalOpen(true)
                     }

                
                else{

                    await updateParkingArea(content.parkingId, { vehicleId: id, full: true, accepted : true , vehicleRequest: ""});
                    await addEntranceExitLog({ entranceTime: new Date(), parkingFloorId: content.parkingFloorId, parkingId: content.parkingId, vehicleId: id,plateNo:plateno});
                    await updateVehicle({parked:true},id)
                    window.location.reload();
                }

            } catch (error) {
               
            }
            
            setEntranceExit(true)
        } else {
            setCarError(true);
        }
       
        // if (!modalOpen){
        //     window.location.reload();
        // }

    }

    const handleExitOnClick = async () => {

       
        try {
            
            setEntranceExit(true);
           
          
           
           let { data } = await getEntranceExitLogByVehicleID(content.vehicleId);

           if(!data.isPayment)
           {
              //Swal.fire("Please Pay for the Service") 

              Swal.fire({
                title: "Please Pay for the Service",
                type: "success",
                showCancelButton: true, 
                confirmButtonText: 'Pay Here'
              }).then((result) => {  if (result.isConfirmed) { window.location="/dashboard/payment"}});
           }
           
          
        } catch (error) {
            console.log(error);
        }
       
        //window.location.reload();
        setEntranceExit(false);
    }

    const handleExitOnClickAdmin = async () => {

      
        try {
            
            setEntranceExit(true);
            const log = allLogs.find((log) => Number(log.vehicleId) === Number(content.vehicleId) && !log.exitTime);
           

            await updateVehicle({parked:false},content.vehicleId)
            await updateParkingArea(content.parkingId, { vehicleId: 0, full: false });
            await updateEntranceExitLog(log.id, { exitTime: new Date(), payment: true }); 
            await updateVehicle({parked:false},log.vehicleId)


        } catch (error) {
            console.log(error);
        }
       
        window.location.reload();
        setEntranceExit(false);
    }
    

     const handleChange = (event) =>{
        setTextAreaValue(event.target.value);
      }
    
      const modalOKButtonHandler = async () => {

       
        const vehicle = vehicles.find((vehicle) => selectedCar === vehicle.plateno);
        const id=vehicle.id;
        const plateno=vehicle.plateno;


        
            try {
                await updateParkingArea(content.parkingId, { vehicleId: id, full: true, accepted : false, requestMessage: textAreaValue });
            }
            catch (e) {
                setError(true)
            }
            setModalOpen(false);
            window.location.reload();

        }
    

    return (
        <>
        <Card style={{ border: "2px solid",borderRadius:"20px",padding:"1%",borderColor: !content.full ? "green" : "red" }}>
            <div>
                <Card.Content >
                    <Card.Header textAlign="center">Park Area <strong>{index + 1}</strong></Card.Header>
                    <Divider />
                    <Card.Description textAlign="center">
                        
                            <h2>
                                {currUser.roleName  && content.full && vehicles.some((vehicle) => Number(vehicle.id) === Number(content.vehicleId)) ?
                                     <WordBreaker style={{color:"black"}}>License Plate <br />
                                    <div style={{ border: "1px solid red" }}>
                                        {
                                            vehicles.find((vehicle) => Number(vehicle.id) === Number(content.vehicleId)).plateno
                                        }
                                        <Icon name="car" />
                                    </div>
                                    </WordBreaker>
                                    :
                                    content.full  && vehicles.some((vehicle) => Number(vehicle.id) === Number(content.vehicleId) && Number(vehicle.userid) === Number(user.id))?
                                    <WordBreaker style={{color:"black"}}>License Plate <br />
                                    <div style={{ border: "1px solid red" }}>
                                    {
                                        vehicles.find((vehicle) => Number(vehicle.id) === Number(content.vehicleId)).plateno
                                    }
                                    <Icon name="car" />
                                </div>
                                </WordBreaker>
                                :
                                content.full?
                                
                                <WordBreaker style={{color:"lightGray"}}>Please choose other slot for the parking. <br /></WordBreaker>
                                :
                                <WordBreaker style={{color:"black"}}>License Plate <br />
                                 None
                                </WordBreaker>
                            }
                            </h2>
                            
                        
                    </Card.Description>
                    {state.isAuthenticated && !currUser.roleName  ?
                        <Card.Content extra textAlign="center">
                            {!content.full ?
                                <Button  animated="fade"   inverted color='green' onClick={handleParkHereOnClick} >
                                    <Button.Content visible>Park here</Button.Content>
                                    <Button.Content hidden><Icon name="add" /></Button.Content>
                                </Button>
                                : vehicles.some((vehicle) => Number(vehicle.id) === Number(content.vehicleId) && Number(vehicle.userid) === Number(user.id)) && content.accepted ?
                                    <Button  animated="fade" inverted color='blue' onClick={handleExitOnClick} >
                                        <Button.Content visible>Exit</Button.Content>
                                        <Button.Content hidden><Icon name="sign-out" /></Button.Content>
                                    </Button>
                                    : !content.accepted ?
                                        <Button fluid disabled negative>Requested</Button>

                                        :
                                            <Button fluid disabled negative>Occupied</Button>
                            }
                        </Card.Content>
                        
                        : content.full?
                                              
                        <Card.Content extra textAlign="center">
                        <Button  animated="fade" inverted color='blue' onClick={handleExitOnClickAdmin} >
                                        <Button.Content visible>Exit</Button.Content>
                                        <Button.Content hidden><Icon name="sign-out" /></Button.Content>
                        </Button>
                        </Card.Content>
                        :
                        null
                    }
                </Card.Content>
            </div>
        </Card>
        <Modal
            dimmer="blurring"
            open={modalOpen}
            onClose={() => setModalOpen(true)}
        >
        <Modal.Header> Send Vehicle Request </Modal.Header>
         <Modal.Content>
         <h3>
             Send message to admin
            <textarea value={textAreaValue} onChange={handleChange} style={{border: '1px solid'}}>

            </textarea>
        </h3>
        </Modal.Content>
        <Modal.Actions>
            <Button negative onClick={() => setModalOpen(false)}>
                Go back!
            </Button>
            <Button positive onClick={modalOKButtonHandler}>
                Send request
            </Button>
         </Modal.Actions>
         </Modal>

        </>
    )
}

export default ParkAreaCard
