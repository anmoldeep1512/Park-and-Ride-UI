import React, { useEffect, useState } from 'react'
import { Button, Card, Divider, Icon } from 'semantic-ui-react';
import { addEntranceExitLog, findAllVehicles, updateParkingArea } from '../../../Service/api';
import { WordBreaker } from '../../WelcomeCard/Welcome.styles';

const VehcileRequestCard = ({ parkArea }) => {

    const [loading, setLoading] = useState(false);
    const [allVehicles, setAllVehicles] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const init = async () => {
            try {
                const { data } = await findAllVehicles()
               
                setAllVehicles(data);
                
            } catch (err) {
                setError(err);
            }
        }
        init();
    }, []);

    const acceptOnClickHandle = async () => {
        setLoading(true);

        

        const vehicle = allVehicles.find((vehicle) => vehicle.id === parkArea.vehicleId  );
        
        const id=vehicle.id;
        const plateno=vehicle.plateno;
       
        try {
            if (plateno){
            await updateParkingArea(parkArea.parkingId, { vehicleId: parkArea.vehicleId, full: true, accepted:true });
            await addEntranceExitLog({ entranceTime: new Date(), parkingFloorId: parkArea.parkingFloorId, parkingId: parkArea.parkingId, vehicleId: id,plateNo:plateno});
            }
        } catch (err) {
        }
        setLoading(false);
    }

    const rejectOnClickHandle = async () => {
        setLoading(true);
        try {
            await updateParkingArea(parkArea.parkingId, {vehicleId: 0, full: false, accepted: false});
        } catch (err) {
        }
        setLoading(false);
    }

    return (
        <div className="request" style={{ 
            'display': 'flex',
            'flex-direction':'column',
            'padding': '1%'}}>
            <Card className='requestCard' style={{
                'width': '100%',
                'background-color':'#edf3f3fd', 
                'box-shadow': '-7px -6px 16px 0px rgba(65, 62, 62, 0.78)',
                '-webkit-box-shadow': '-7px -6px 16px 0px rgba(99, 94, 94, 0.78)',
                '-moz-box-shadow': '-7px -6px 16px 0px rgba(102, 96, 96, 0.78)',
                'color': 'brown'}}>
            <Card.Content >
                <Card.Header textAlign="center">{parkArea.vehicleId}</Card.Header>
                <Divider />
                <Card.Description textAlign="center">
                    <WordBreaker> Parking Id: <strong>{parkArea.parkingId}</strong></WordBreaker>
                    <strong>Message from user: </strong>
                    <br/>
                    <p>{parkArea.requestMessage}</p>
                    <br/>
                </Card.Description>
                <Card.Content extra textAlign="center">
                    <Button.Group>
                        <Button id={parkArea.vehicleId} animated="fade" basic positive onClick={acceptOnClickHandle} loading={loading}>
                            <Button.Content visible>Accept</Button.Content>
                            <Button.Content hidden><Icon name="thumbs up outline" /></Button.Content>
                        </Button>
                        <Button id={parkArea.vehicleId} animated="fade" basic negative onClick={rejectOnClickHandle} loading={loading}>
                            <Button.Content visible>Reject</Button.Content>
                            <Button.Content hidden><Icon name="times" /></Button.Content>
                        </Button>
                    </Button.Group>
                </Card.Content>
            </Card.Content>
        </Card>
        </div>

    )
}

export default VehcileRequestCard
