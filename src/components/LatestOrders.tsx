//   import { format } from "date-fns";
//   import PropTypes from "prop-types";
//   import { useEffect, useState } from "react";
//   import axios from "axios";
//   import {OrderInterface} from "../interface/orderInterface";
//   import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
//   import {
//     Box,
//     Button,
//     Card,
//     CardActions,
//     CardHeader,
//     Divider,
//     SvgIcon,
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableRow,
//   } from "@mui/material";

//   import SimpleBar from "simplebar-react";
//   //-------------------------------------------------
//   import { styled } from "@mui/system";

//   export const Scrollbar = styled(SimpleBar)``;

//   const statusMap: Record<string, string> = {
//     pending: "warning",
//     delivered: "success",
//     refunded: "error",
//     default: "primary",
//   };
//   //-------------------------------------------------------
//   export const LatestOrders: React.FC = () => {
//     const [orders, setOrders] = useState<OrderInterface[]>([]);

//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const response = await axios.get<OrderInterface[]>(
//             "https://osm-1-2.onrender.com/api/orders"
//           );
//           const ordersData: OrderInterface[] = response.data;
//           console.log(ordersData);

//           setOrders(ordersData);
//         } catch (error) {
//           console.error("Error fetching data:", error);
//         }
//       };

//       fetchData();
//     }, []);

//     return (
//       <Card>
//         <CardHeader title="Latest Orders" />
//         <Scrollbar sx={{ flexGrow: 1 }}>
//           <Box sx={{ minWidth: 800 }}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Order</TableCell>
//                   <TableCell>Customer</TableCell>
//                   <TableCell sortDirection="desc">Date</TableCell>
//                   <TableCell>Status</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {orders.map((order) => {
//                   return (
//                     <TableRow hover key={order.id}>
//                       <TableCell>{order.id}</TableCell>
//                       {/* <TableCell>{order.shippingDetails.userId}</TableCell> */}
//                       <TableCell>{order.orderTime}</TableCell>
//                       <TableCell>
//                         <Button color={statusMap[order.status] || statusMap.default} variant="outlined">
//                           {order.status}
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })}
//               </TableBody>
//             </Table>
//           </Box>
//         </Scrollbar>
//         <Divider />
//         <CardActions sx={{ justifyContent: "flex-end" }}>
//           <Button
//             color="inherit"
//             endIcon={
//               <SvgIcon fontSize="small">
//                 <KeyboardArrowRightIcon />
//               </SvgIcon>
//             }
//             size="small"
//             variant="text"
//           >
//             View all
//           </Button>
//         </CardActions>
//       </Card>
//     );
//   };

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {Button} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { OrderInterface } from "../interface/orderInterface";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export function LatestOrders() {
  const [orders, setOrders] = useState<OrderInterface[]>([]);


  useEffect(() => {

    const fetchData = async () => {
      try {
        //const response = await axios.get<OrderInterface[]>(`${import.meta.env.BASE_URL}orders`);
        const response = await axios.get<OrderInterface[]>(`https://osm-1-2.onrender.com/api/orders`);
        const ordersData: OrderInterface[] = response.data;
        console.log(ordersData);
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <TableContainer component={Paper} sx={{ width: "50%" , height:"80vh", margin: "2%" }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Order ID</StyledTableCell>
            <StyledTableCell align="right">Address</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">Order Type</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <StyledTableRow key={order._id}>
              <StyledTableCell component="th" scope="row">
                {order._id}
              </StyledTableCell>
              <StyledTableCell align="right">{order.shippingDetails?.address || "N/A"}</StyledTableCell>
              <StyledTableCell align="right">{order.price}</StyledTableCell>
              <StyledTableCell align="right">{order.shippingDetails?.orderType || "N/A"}</StyledTableCell>
              <StyledTableCell align="right">
                <Button  variant="outlined">
                  {order.status}
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
