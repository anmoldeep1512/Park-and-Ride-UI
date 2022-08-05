import React from 'react';
import DateFormatter from '../../DateFormatter/DateFormatter';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { calculatePrice } from '../../../Service/api';
import { Button } from "@mui/material";

const PaymentCard = ({ content, displayRazorpay }) => {

    const [price, setPrice] = React.useState(0)


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


    var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
        });
      React.useEffect(() =>{

        const init = async () => {
        
        
            try{
              
              const { data } = await calculatePrice(content.vehicleId)
        
              
              
              setPrice(data)

             
            }catch (err){
              console.log("in error object")
              
            }
          }
          init();
     
      }, [])


    return (
    
    <StyledTableRow>
    <StyledTableCell component="th" scope="row">
    <strong>{content.plateNo}</strong>
    </StyledTableCell>
    <StyledTableCell align="center"><DateFormatter date={new Date(content.entranceTime)}></DateFormatter></StyledTableCell>
    {/* <StyledTableCell align="center">{data.exitTime}</StyledTableCell> */}
    <StyledTableCell align="center">{formatter.format(price)}</StyledTableCell>
    <StyledTableCell align="center">
    <Button id="rzp-button1" variant="contained" color="primary" onClick={() =>displayRazorpay(price,content.vehicleId)} >Pay Now</Button>
    </StyledTableCell>
    </StyledTableRow>

    )
}


export default PaymentCard;