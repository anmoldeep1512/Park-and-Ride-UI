import { blue } from '@mui/material/colors';
import React, { useState } from 'react'
import { Button, Card, Divider, Header, Icon, Modal } from 'semantic-ui-react'
import Swal from 'sweetalert2';
import { deleteEntranceExitLogByVehicleID, deleteVehicle, updateParkingArea } from '../../../Service/api';


const UserVehicleCard = ({ vehicle, parkings,  setListLogs, setListedVehicleId, listLogs}) => {
    
    // const parkingName = parkings.find((parking) => Number(parking.parkFloorId) === Number(vehicle.parkingfloorid)).parkingAreaName;
   

    const [deleteCarLoading, setDeleteCarLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const listLogClickHandler = (event, { id }) => {
        setListedVehicleId(id);
        setListLogs(true);
        
    }


    const deleteCarClickHandler = async (event, { id }) => {
        setDeleteCarLoading(true);
        try {

            const exitTimeDelete = listLogs.filter(log => log.vehicleId === vehicle.id && !log.exitTime);
         
            if (exitTimeDelete.length !== 0){
                
                Swal.fire("There is vehicle in parking")
                setModalOpen(false)
            }
            else{
                await deleteVehicle(id);
                window.location.reload();
            }
      
        } catch (error) {
        }
        setDeleteCarLoading(false);
    }


    return (
        <>

        <div className="userVehicle" style={{ 
            'display': 'flex',
            'flex-direction':'column',
            'padding': '1%'}}>
            <Card className='userVehicleCard' style={{
                'background-color':'#edf3f3fd', 
                'box-shadow': '-7px -6px 16px 0px rgba(65, 62, 62, 0.78)',
                '-webkit-box-shadow': '-7px -6px 16px 0px rgba(99, 94, 94, 0.78)',
                '-moz-box-shadow': '-7px -6px 16px 0px rgba(102, 96, 96, 0.78)',
                'color': 'brown'}}>
                <Card.Content >
                    <Card.Header textAlign="center">{vehicle.plateno}</Card.Header>
                    <Divider />
                
                    <br/>
                    <Card.Description textAlign="center">
                        Vehicle Type <br /> <strong>{vehicle.type}</strong>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra textAlign="center" >
                <div className="ui two buttons">
                        <Button id={vehicle.id} animated="fade" basic color='green' onClick={listLogClickHandler}>
                            <Button.Content visible>List Logs</Button.Content>
                            <Button.Content hidden><Icon name="list" /></Button.Content>
                        </Button>
                    <Button
                        animated="fade"
                        basic
                        color='red'
                        onClick={() => setModalOpen(true)}
                    >
                        <Button.Content visible>Delete Vehicle</Button.Content>
                        <Button.Content hidden><Icon name="trash alternate" /></Button.Content>
                    </Button>
                    </div>
                </Card.Content>
            </Card>
            </div>

            <Modal
                basic
                dimmer="blurring"
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            >
                <Header icon><Icon name="car" /> Delete this vehicle?</Header>
                <Modal.Actions>
                    <Button negative onClick={() => setModalOpen(false)}>
                        No
                                    </Button>
                    <Button id={vehicle.id} positive onClick={deleteCarClickHandler} >
                        Yes
                                    </Button>
                </Modal.Actions>
            </Modal>
        </>
    )
}

export default UserVehicleCard
