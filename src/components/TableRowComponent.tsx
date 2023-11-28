import React from "react";
import { StyledTableRow, StyledTableCell } from "../style/styles";
import { Box, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { OrderInterface } from "../interface/orderInterface";

interface TableRowProps {
  order: OrderInterface;
  handleDeleteOrder: (orderId: string) => void;
  handleChangeStatus: (orderId: string) => void;
  statusMap: { [key: string]: string };
}

const TableRowComponent: React.FC<TableRowProps> = ({ order, handleDeleteOrder, handleChangeStatus, statusMap }) => {
  const colorBG = statusMap[order.status] || "#ff3c009b";

  return (
    <StyledTableRow key={order._id}>
    <StyledTableCell component="th" scope="row">
      {order._id}
    </StyledTableCell>
    <StyledTableCell align="center">{order.shippingDetails?.address || "N/A"}</StyledTableCell>
    <StyledTableCell align="center">{order.price}</StyledTableCell>
    <StyledTableCell align="center">{order.shippingDetails?.orderType || "N/A"}</StyledTableCell>
    <StyledTableCell align="center">
      <Box sx={{ textAlign: "center", backgroundColor: colorBG, borderRadius: 12 }}>{order.status}</Box>
    </StyledTableCell>
    <StyledTableCell align="center">
      <Button disabled={order.status !== "Pending"} onClick={() => handleDeleteOrder(order._id)} variant="outlined" startIcon={<DeleteIcon />}>
        Delete
      </Button>
    </StyledTableCell>
    <StyledTableCell align="center">
      <Button disabled={!order.shippingDetails || order.shippingDetails.orderType !== "Pickup" || order.status !== "Pending" } onClick={() => handleChangeStatus(order._id)} variant="outlined">
        Change Status
      </Button>
    </StyledTableCell>
  </StyledTableRow> 
  );
};

export default TableRowComponent;
// import React from "react";
// import { Box, Button } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import { StyledTableCell, StyledTableRow } from "../style/styles";
// import { OrderInterface } from "../interface/orderInterface";

// interface TableRowProps {
//   order: OrderInterface;
//   handleDeleteOrder: (orderId: string) => void;
//   handleChangeStatus: (orderId: string) => void;
//   statusMap: { [key: string]: string };
// }

// const columns: GridColDef[] = [
//   { field: "_id", headerName: "ID", flex: 1 }, // Assuming your order object has an _id property
//   { field: "shippingDetails.address", headerName: "Address", flex: 0.5 },
//   { field: "price", headerName: "Price", flex: 1 },
//   { field: "shippingDetails.orderType", headerName: "Order Type", flex: 0.8 },
//   { field: "status", headerName: "Status", flex: 0.4 },
// ];

// const TableRowComponent: React.FC<TableRowProps> = ({
//   order,
//   handleDeleteOrder,
//   handleChangeStatus,
//   statusMap,
// }) => {
//   const colorBG = statusMap[order.status] || "#ff3c009b";

//   return (
//     <Box>
//       <DataGrid
//         rows={[order]}
//         columns={columns}
//         hideFooter
//         disableColumnMenu
//         getRowId={(row) => row._id} // Assuming your order object has an _id property
//         components={{
//           Row: ({ children, ...restProps }) => (
//             <StyledTableRow style={{ backgroundColor: colorBG }} {...restProps}>
//               {children}
//             </StyledTableRow>
//           ),
//           Cell: ({ children, ...restProps }) => (
//             <StyledTableCell {...restProps}>{children}</StyledTableCell>
//           ),
//         }}
//       />
//       <Box>
//         <Button
//           disabled={order.status !== "Pending"}
//           onClick={() => handleDeleteOrder(order._id)}
//           variant="outlined"
//           startIcon={<DeleteIcon />}
//         >
//           Delete
//         </Button>
//         <Button
//           disabled={
//             !order.shippingDetails ||
//             order.shippingDetails.orderType !== "Pickup" ||
//             order.status !== "Pending"
//           }
//           onClick={() => handleChangeStatus(order._id)}
//           variant="outlined"
//         >
//           Change Status
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default TableRowComponent;
