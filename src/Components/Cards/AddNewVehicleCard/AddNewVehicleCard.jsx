import React, { useState } from 'react';
import { Button, Card, Divider, Form, Icon, Message, Modal, Radio } from 'semantic-ui-react'
import "./addVehicle.css"
import LicensePlateInput from './LicensePlateInput';
import {addVehicle} from '../../../Service/api';

import {AuthContext} from '../../../App'

function AddNewVehicle({ vehicles }) {

  const [licensePlateError, setLicensePlateError] = useState(false);
  const [alreadyError, setAlreadyError] = useState(false);
  const [licensePlate, setLicensePlate] = useState('');
  const [createError, setCreateError] = useState("");
  const [createLoading, setCreateLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [type,setType]=useState('');
  const { state,dispatch } = React.useContext(AuthContext);

   const handleTypeChange=(e, {value})=>{
       setType(value);
    }




const onClickHandler = () => {
  
  const checkedLisencePlate = licensePlate.trim().replace(/\s\s+/g, ' ').toUpperCase();

  if (vehicles.some((vehicle) => vehicle.plateno.toUpperCase() === checkedLisencePlate.toUpperCase())) {
      setAlreadyError(true);
      setModalOpen(true);}
    else if( (/^[A-Z]{2}\s[0-9]{2}\s[A-Z]{2}\s[0-9]{4}$/.test(checkedLisencePlate) )){
      setLicensePlateError(false);
      setModalOpen(true);
  } else {
    setLicensePlateError(true);
    
      
  }
 
}

const modalOKButtonHandler = async () => {
  const checkedLisencePlate = licensePlate.trim().replace(/\s\s+/g, ' ');
  if (/^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/.test(checkedLisencePlate)) {
    checkedLisencePlate = licensePlate.substring(0, 2)+ " " + licensePlate.substring(2, 4);
    
  }
  const vehicle = {
    plateno: checkedLisencePlate.toUpperCase(),
    type: type,
    userid: state.user.id
  }
  
  setCreateLoading(true);
  try {
      await addVehicle(vehicle);
  } catch (err) {
      setCreateError(err);
  }
  setCreateLoading(false);
  
  setModalOpen(false);
   window.location.reload();
}

const handleLicensePlateChange = (e, { value }) => {
  const inputVal = e.target.value.replace(/ /g, '');
    let inputNumbersOnly = inputVal;

    if (inputNumbersOnly.length > 10) {
      inputNumbersOnly = inputNumbersOnly.substr(0, 10);
    }

    const splits = inputNumbersOnly.match(/.{1,2}/g);

    let spacedNumber = '';
    if (splits) {
      spacedNumber = splits.join(' ');
    }

    if (inputNumbersOnly.length > 9) {
      spacedNumber =
        spacedNumber.substring(0, 10) +
        spacedNumber.substring(10).replace(' ', '');
    }

    setLicensePlate(spacedNumber);
  
  if (licensePlateError)
      setLicensePlateError(false);
  if (alreadyError)
      setAlreadyError(false);
  
}



  return (
    <>
    <div className="addVehicle">
         <Card className='addVehicleCard'>
   <Card.Content>
     <Card.Header textAlign="center">Add Vehicle</Card.Header>
     <Divider/>
        <Card.Description textAlign="center">
            <Form size="big">
             
              <LicensePlateInput
              licensePlate={licensePlate}
               handleLicensePlateChange={handleLicensePlateChange}
               licensePlateError={licensePlateError}
               />
               
              <Radio
              label="Two Wheeler"
              name='radioGroup'
              value="2 Wheeler"
              onChange={handleTypeChange}/>
              <Radio
              label="Four Wheeler"
              name='radioGroup'
              value="4 Wheeler"
              onChange={handleTypeChange}/>
            </Form>

        </Card.Description>
   </Card.Content>
   <Card.Content>
     <Button fluid animated secondary color="black" onClick={onClickHandler}>
        <Button.Content visible >
          Add
        </Button.Content>
        <Button.Content hidden>
          <Icon name="car"/>
        </Button.Content>
     </Button>
   </Card.Content>
  </Card>
    </div>
    <Modal
    dimmer="blurring"
    open={modalOpen}
    onClose={() => setModalOpen(false)}
    >
<Modal.Header>
    {
        alreadyError ? "Something wrong!"
            : "Are you sure?"
    }
</Modal.Header>
<Modal.Content>
    {
        alreadyError
            ?
            <Message
                negative
                header='This license plate already declared.'
            />
            
                :
                <h3>
                    License Plate: <i style={{ color: "red" }}>{licensePlate.toUpperCase()}</i><br />
                    Vehicle Type: <i style={{ color: "red" }}>{type}</i><br />
                </h3>
    }

</Modal.Content>
<Modal.Actions>
    <Button negative onClick={() => setModalOpen(false)}>
        {
            alreadyError ? "OK!"
                : "Nope, something wrong"
        }
    </Button>

    {
        alreadyError ? null
            : <Button positive onClick={modalOKButtonHandler} loading={createLoading}>
                Add My Vehicle
            </Button>
    }

</Modal.Actions>
</Modal>
</>
  )
}

export default AddNewVehicle