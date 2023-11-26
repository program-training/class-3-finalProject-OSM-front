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
  let colorBG = statusMap[order.status] || "#ff3c009b";

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
      <Button disabled={!order.shippingDetails || order.shippingDetails.orderType !== "Pickup"} onClick={() => handleChangeStatus(order._id)} variant="outlined">
        Change Status
      </Button>
    </StyledTableCell>
  </StyledTableRow>
  );
};

export default TableRowComponent;
