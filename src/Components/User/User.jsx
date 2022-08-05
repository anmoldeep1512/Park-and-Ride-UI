
import AddNewVehicleCard from '../Cards/AddNewVehicleCard/AddNewVehicleCard';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import"./User.css";
import { getAllUsers } from '../../Service/api';
import SessionContext from '../../contexts/SessionContext'
import UserInfoCard from '../Cards/UserInfoCard/UserInfoCard';


function User() {
  const { user } = useContext(SessionContext);
  const [vehicles, setVehicles] = useState([]);
  const [parkings, setParkings] = useState([]);
  const [listLogs, setListLogs] = useState(false);
  const [vehicleLogs, setVehicleLogs] = useState([]);
  const [allLogs, setAllLogs] = useState([]);
  const [listedVehicleId, setListedVehicleId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [allUsers, setAllUsers] = useState([]);


  useEffect(() => {
    const init = async () => {

        setLoading(true);

        try {
            const { data } = await getAllUsers();
            setAllUsers(data);
            
      
        } catch (err) {
            setError(err);
        }
    }

    init();
}, [])






  return (
   
    <div className="user">


     {

         allUsers.map((users) =>
    
          <UserInfoCard
            users={users}
            />
            
         )
     }
        
    </div>
  
  )
}

export default User