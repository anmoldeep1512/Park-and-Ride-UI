import React from 'react'
import { Card, Divider } from 'semantic-ui-react'
import DateFormatter from '../../DateFormatter/DateFormatter';
import { WordBreaker } from '../../WelcomeCard/Welcome.styles'
import { Log } from './Logs.styles';
import "./LogCard.css"

const LogCard = ({ listLogs, vehicles, parkings }) => {

    //const parkingName = parkings.find((parking) => Number(parking.parkFloorId) === Number(listLogs.parkingFloorId)).parkingAreaName;
   
    const vehiclePlate = vehicles.find((vehicle) => Number(vehicle.id === Number(listLogs.vehicleId))).plateno
   
    const parkingName = parkings.find((parking) => Number(parking.parkingFloorId === Number(listLogs.parkingFloorId))).parkingAreaName
    

    return (
        <div className="divLog">
        <Card className="cardLog">
            <div style={{ border: "5px solid", borderColor: !listLogs.exitTime ? "greenyellow" : "red" }} >
                <Card.Content >
                    <Card.Header textAlign="center">
                   <br/>
                    <strong>
                        {vehiclePlate}
                    </strong>
                    </Card.Header>
                    <Divider />
                    <Card.Description>
                        <WordBreaker>Parking name  <Log>{parkingName}</Log></WordBreaker>
                        <WordBreaker>Entrance Time
                            <Log>
                                <DateFormatter date={new Date(listLogs.entranceTime)}></DateFormatter>
                            </Log>
                        </WordBreaker>
                        <WordBreaker>Exit time
                            <Log>
                                {listLogs.exitTime ?
                                    <>
                                        <DateFormatter date={new Date(listLogs.exitTime)} />
                                    </>
                                    : "Still inside"
                                }
                            </Log>
                        </WordBreaker>
                        <WordBreaker>Park Area Number  <Log>{listLogs.parkingFloorId}</Log></WordBreaker>
                    </Card.Description>
                </Card.Content>
            </div>
        </Card>
        </div>
    )
}

export default LogCard