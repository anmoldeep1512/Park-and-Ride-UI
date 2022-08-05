import "./payment.css"
import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Swal from 'sweetalert2'
import { getEntranceExitLog, updateParkingArea, updateEntranceExitLog, updateVehicle, findAllVehiclesOfUser } from "../../Service/api";
import PaymentCard from "../Cards/PaymentCard/PaymentCard";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 18,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


function createData(name, calories, fat, carbs) {
    return { name, calories, fat, carbs};
  }
  




function Payment() {

const [data, setData] = React.useState([])
const [logs, setLogs] = React.useState([])
const [error, setError] = React.useState("")
const [allUserVehicle, setAllUserVehicle] = React.useState([])

const currUser = JSON.parse(localStorage.getItem('user'))

React.useEffect(() =>{
  
  const init = async () => {
   

    try{
     
      const {data} = await getEntranceExitLog()
      setLogs(data)

      
    }catch (err){
      
      setError(err)
    }

    try{
      
      const {data} = await findAllVehiclesOfUser(currUser.id)
      setAllUserVehicle(data)

     
    }catch (err){
     
      setError(err)
    }

    
  }
  init();
}, [])



const loadScript = (src) => {
  return new Promise((resovle) => {
  const script = document.createElement("script");
  script.src = src;
  script.onload = () => {
  resovle(true);
  };
  script.onerror = () => {
  resovle(false);
  };
  document.body.appendChild(script);
  });
  };

  const displayRazorpay = async (amount,vehicleId) => {
    const res = await loadScript(
    "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
    Swal.fire("You are offline... Failed to load Razorpay SDK");
    return;
    }

    const options = {
      key: "rzp_test_k1sinYpp1p1pkC",
      key_secret:"kuo3rIKE35hg07lIIHJzor0G",
      currency: "INR",
      amount: amount * 100,
      name: "Park & Ride",
      description: "Thanks for parking",
      image:
      "https://mern-blog-akky.herokuapp.com/static/media/logo.8c649bfa.png",
      handler: function (response) {
      
      Swal.fire(response.razorpay_payment_id);
      
      const init = async () => {
       

        const log = logs.find((log) => Number(log.vehicleId) === Number(vehicleId) && !log.exitTime);
        await updateParkingArea(log.parkingId, { vehicleId: 0, full: false });
        await updateEntranceExitLog(log.id, { exitTime: new Date(),payment:true });
        await updateVehicle({parked:false},log.vehicleId)

      }

      init();
     
      Swal.fire({
        title: "Wow!",
        text: "Payment Successfully and Vehicle Successfully Exited",
        type: "success",
      }).then(function() {
        window.location.reload();
    });
      },
      prefill: {
        name: "Park & Ride",
        },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        };


  return (
    <div className="payment" style={{marginLeft: "2%", marginRight: "2%", padding:"5%"}}>
<TableContainer component={Paper}>
<Table sx={{ minWidth: 700 }} aria-label="customized table">
<TableHead>
<TableRow>
<StyledTableCell>Vehicle Liscense Plate</StyledTableCell>
<StyledTableCell align="center">Entry Time</StyledTableCell>
<StyledTableCell align="center">Total Price</StyledTableCell>
<StyledTableCell align="center">Checkout</StyledTableCell>
</TableRow>
</TableHead>
<TableBody>
  
{logs.map(log=>(
            allUserVehicle.map(vehicle=>(
              (!log.payment && vehicle.id==log.vehicleId)?<PaymentCard content={log} displayRazorpay={displayRazorpay}/>:null
            )
            )
          ))
}

</TableBody>
</Table>
</TableContainer>
</div>

)
}
export default Payment