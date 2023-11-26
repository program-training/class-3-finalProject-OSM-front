import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Box, Grid, Container } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { OrderInterface } from "../interface/orderInterface";
import DeleteIcon from "@mui/icons-material/Delete";
import { OverviewTotalProfit } from "../components/OverviewTotalProfit";
import { OverviewTotalCustomers } from "../components/OverviewTotalCustomers";
import OverviewSection from "./OverviewSection";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzgsImVtYWlsIjoidmlnQG1haWxuaGIuY29tIiwicGFzc3dvcmQiOiIxMjM0NTZBYyIsImlzYWRtaW4iOnRydWUsImlhdCI6MTcwMDcyNDM4NH0.6cdsBG-RpjB_KLB2-JjuOB8Zp5Tt-W31BYsmNe20FUw";
type StatusColor = "#FFB74D" | "#76FF03" | "#ff3c00a2";

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

const statusMap: { [key: string]: string } = {
  Pending: "#ffb84da9",
  Delivered: "#74ff03a0",
  Refunded: "#FF3D00",
};

export function LatestOrders() {
  const [orders, setOrders] = useState<OrderInterface[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState<OrderInterface[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get<OrderInterface[]>(
          `${import.meta.env.VITE_BASE_URL}orders`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const ordersData: OrderInterface[] = response.data;
        setOrders(ordersData);

        // Filter orders based on search term
        const filteredOrders = ordersData.filter(
          (order) =>
            order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.shippingDetails?.address
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            order.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.shippingDetails.orderType
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
        );

        setFilteredOrders(filteredOrders);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchTerm]);

  const handleDeleteOrder = async (orderId: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}orders/${orderId}`);
      setFilteredOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );
    } catch (error) {
      console.error(`Error deleting order with ID ${orderId}:`, error);
    }
  };

  const handleChangeStatus = async (orderId: string) => {
    try {
      await axios.put(`${import.meta.env.VITE_BASE_URL}orders/${orderId}`, {
        status: "Delivered",
      });

      // Fetch updated orders after changing status
      const response = await axios.get<OrderInterface[]>(
        `${import.meta.env.VITE_BASE_URL}orders`
      );
      const updatedOrders: OrderInterface[] = response.data;
      setOrders(updatedOrders);
      setFilteredOrders(updatedOrders);
    } catch (error: any) {
      console.error(
        `Error changing status for order with ID ${orderId}:`,
        error.response?.data || error.message
      );
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}orders/${orderId}`);
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );
    } catch (error) {
      console.error(`Error deleting order with ID ${orderId}:`, error);
    }
  };

  const handleChangeStatus = async (orderId: string) => {
    try {
      await axios.put(`${import.meta.env.VITE_BASE_URL}orders/${orderId}`, {
        status: "Delivered",
      });

      // Fetch updated orders after changing status
      const response = await axios.get<OrderInterface[]>(
        `${import.meta.env.VITE_BASE_URL}orders`
      );
      const updatedOrders: OrderInterface[] = response.data;
      setOrders(updatedOrders);
    } catch (error: any) {
      console.error(
        `Error changing status for order with ID ${orderId}:`,
        error.response?.data || error.message
      );
    }
  };

  return (
    <Box sx={{ margin: "20px" }}>
      <TableContainer
        component={Paper}
        sx={{ width: "70%", height: "80vh", margin: "2%" }}
      >
        <Table
          sx={{ minWidth: 700, marginLeft: 8 }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Order ID</StyledTableCell>
              <StyledTableCell align="center">Address</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center">Order Type</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Delete Order</StyledTableCell>
              <StyledTableCell align="center">Change Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => {
              let colorBG = statusMap[order.status] || "#FF3D00";
              return (
                <StyledTableRow key={order._id}>
                  <StyledTableCell component="th" scope="row">
                    {order._id}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {order.shippingDetails?.address || "N/A"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {order.price}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {order.shippingDetails?.orderType || "N/A"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Box
                      sx={{
                        textAlign: "center",
                        backgroundColor: colorBG,
                        borderRadius: 12,
                      }}
                    >
                      {order.status}
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button
                      disabled={order.status !== "Pending"}
                      onClick={() => handleDeleteOrder(order._id)}
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      disabled={
                        !order.shippingDetails ||
                        order.shippingDetails.orderType !== "Pickup"
                      }
                      onClick={() => handleChangeStatus(order._id)}
                      variant="outlined"
                    >
                      Change Status
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
