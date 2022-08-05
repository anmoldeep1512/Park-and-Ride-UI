import axios from 'axios';

const configUser = {
    headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` }
};

const configAdmin = {
    headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
};


const adminService = axios.create({
    baseURL: 'https://parkride-admin-service-urtjok3rza-wl.a.run.app/admin-service'
})

const adminServiceToken = axios.create({
    baseURL: 'https://parkride-admin-service-urtjok3rza-wl.a.run.app/token/generate-token'
    
})

const userService = axios.create({
    baseURL: 'https://parkride-user-service-urtjok3rza-wl.a.run.app/user-service'
})

const parkingService = axios.create({
    baseURL: 'https://parkride-parking-service-urtjok3rza-wl.a.run.app/parking-service'
})

const priceCalculationService = axios.create({
    baseURL: 'https://parkride-price-calculation-urtjok3rza-wl.a.run.app/'
})




//user-service

export const getUserById=(userId)=> {

    return userService.get(`/${userId}`);

}

export const getAllUsers=()=> {

    return userService.get(`/users`);

}

export const getUserByUsername=(username)=> {

    return userService.get(`/find/${username}`);
}


export const deleteUserById=(Id)=> {

    return userService.delete(`/${Id}`);
}

export const  addVehicle=(vehicle)=> {

    return userService.post('/add-vehicle',vehicle);

}

export const  findVehicleOfUserInFloor=(parkingfloorid)=> {

    return userService.get(`/${parkingfloorid}/parked-vehicle`);

}


export const  deleteVehicle=(vehicleId)=> {

    return userService.delete(`/${vehicleId}/delete-vehicle`);

}


export const  findAllVehiclesOfUser=(userId)=> {

    return userService.get(`/${userId}/vehicle`);
    

}


export const  findAllVehicles=()=> {

    return userService.get('/vehicle');

}


export const  findVehicleById=(vehicleId)=> {

    return userService.get(`/vehicle/${vehicleId}`);

}

export const  updateVehicle=(vehicle,vehicleId)=> {

    return userService.put(`/update/${vehicleId}`,vehicle);

}





//admin-service

export const generateToken=(user) => {

    return adminServiceToken.post(user);

}


export const getParkingAreaWithAdminId=(adminId)=> {

    return adminService.get(`/parking-area/${adminId}`);

}

export const  getAdminDetails=(adminId)=>{

    return adminService.get(`/${adminId}`);
}

export const  getEntranceExitLogsByAdminId=(adminId)=>{

    return adminService.get(`/entrance-exit-log/${adminId}`);
}

export const  getVehiclesByAdminId=(adminId)=>{

    return adminService.get(`/vehicles/${adminId}`);
}



//parking-service EntranceExitLog

export const  addEntranceExitLog=(entrance_exit_log)=>{

    return parkingService.post('/add/entrance-exit-log',entrance_exit_log);
}

export const updateEntranceExitLog=(id,entrance_exit_log ) =>{

    return parkingService.put(`/entrance-exit-log/${id}`, entrance_exit_log);
}

export const deleteEntranceExitLogByVehicleID=(vehicleId) =>{

    return parkingService.delete(`/entrance-exit-log/${vehicleId}`);
}

export const getEntranceExitLogByVehicleID=(vehicleId) =>{

    return parkingService.get(`/entrance-exit-log/vehicle/${vehicleId}`);
}


//parking-service
export const addParkingFloor=(adminId,parkingFloor) =>{

    return parkingService.post(`/add-parking-floor/${adminId}`,parkingFloor);
}

export const getParkingArea=(id) =>{

    return parkingService.get(`/get-parking-area/${id}}`);
}

export const updateParkingArea=(id,parkingArea)=>
{
    return parkingService.post(`/update-parking-area/${id}`,parkingArea);
}

export const getParkingAreaByFloorId=(parkingfloorid)=>
{
    return parkingService.get(`/get-all-parking-areas/${parkingfloorid}`);
}

export const getEntranceExitLog=()=>
{
    return parkingService.get('/all-entrance-exit-log');
}

export const getAllParkingFloors=()=>
{
    return parkingService.get('/get-all-parking-floors');
}





//price-calculation
export const calculatePrice=(vehicleId)=>
{
    return priceCalculationService.get(`/price/${vehicleId}`);
}



