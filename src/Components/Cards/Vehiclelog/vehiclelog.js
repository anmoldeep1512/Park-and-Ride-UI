import React, {useState}from 'react'
import './vehiclelog.css'
import { Button, Card, Form, Header, Icon, Message, Modal, Radio } from 'semantic-ui-react'
import { deleteEntranceExitLogByVehicleID, deleteVehicle } from '../../../Service/api';


const VehicleLog=({data}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const deleteCarClickHandler = async (event, { id }) => {
    
    
    

    try {

        await deleteVehicle(id)
        window.location.reload();
      }
  
     catch (error) {
    }
    
}

  return (
    <>
    <div className="vehiclelog" >
       {/* { user.map(data=>( */}
       <Card className='addVehicleCard'>
       <Card.Content>
         <Card.Header textAlign="center" fontSize="40px"><h1 className="title">Vehicle Log</h1></Card.Header>
         
            <Card.Description textAlign="center">
              <h5 className="description"> <pre>VehicleId: <br/> {data.plateno} </pre></h5>
            </Card.Description>
    
       </Card.Content>

       <Card.Content>
       <Card.Description textAlign="center" fontSize="25px">
       <h5 className="description"> <pre>Type: {data.type}</pre></h5>
       </Card.Description>
       </Card.Content>
       <Card.Content>
       <Card.Description textAlign="center" fontSize="25px">
       <h5 className="description"> <pre>UserId: {data.userid}</pre></h5>
       </Card.Description>
       </Card.Content>
       <Card.Content>
       <div className="button-container">
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
       {/* ))} */}
        
    </div>

    <Modal
      basic
      dimmer="blurring"
      open={modalOpen}
      onClose={() => setModalOpen(false)}
    >
<Header icon><Icon name="car" /> Delete this Vehicle?</Header>
<Modal.Actions>
    <Button negative onClick={() => setModalOpen(false)}>
        No
      </Button>
    <Button id={data.id} positive onClick={deleteCarClickHandler} >
        Yes
    </Button>
</Modal.Actions>
</Modal>
</>
  )
}

export default VehicleLog