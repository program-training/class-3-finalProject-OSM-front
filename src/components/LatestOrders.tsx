import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { OrderInterface } from "../interface/orderInterface";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
const statusMap: { [key: string]: string } = {
  Pending: "#ffb84da9",
  Delivered: "#74ff03a0",
  Refunded: "#ff00009e",
};

export function LatestOrders() {
  const [orders, setOrders] = useState<OrderInterface[]>([]);
  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 0.5,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
    },
    {
      field: "orderType",
      headerName: "Order Type",
      flex: 0.8,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Box
          sx={{
            bgcolor: statusMap[params.value],
            color: "white",
            p: "5px",
            borderRadius: 50,
            width: "85px",
            textAlign: "center",
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "delete",
      headerName: "Delete Order",
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Button onClick={() => handleDeleteOrder(params.id.toString())} disabled={params.row.status !== "Pending"} startIcon={<DeleteIcon />}>
          Delete
        </Button>
      ),
    },
    {
      field: "changeStatus",
      headerName: "Change Status",
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Button onClick={() => handleChangeStatus(params.id.toString())} disabled={!params.row.orderType || params.row.orderType !== "Pickup" || params.row.status !== "Pending"}>
          Change Status
        </Button>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get<OrderInterface[]>(`${import.meta.env.VITE_BASE_URL}orders`, {
          headers: {
            Authorization: token,
          },
        });
        const ordersData: OrderInterface[] = response.data;
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDeleteOrder = async (orderId: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}orders/${orderId}`);
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error(`Error deleting order with ID ${orderId}:`, error);
    }
  };

  const handleChangeStatus = async (orderId: string) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(`${import.meta.env.VITE_BASE_URL}orders/${orderId}`, {
        status: "Delivered",
      });

      const response = await axios.get<OrderInterface[]>(`${import.meta.env.VITE_BASE_URL}orders`, {
        headers: {
          Authorization: token, 
        },
      });

      const updatedOrders: OrderInterface[] = response.data;
      setOrders(updatedOrders);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error(`Error changing status for order with ID ${orderId}:`, (error as AxiosError).response?.data || error.message);
      } else {
        console.error(`Unknown error changing status for order with ID ${orderId}:`, error);
      }
    }
  };

  const costumeOrders = orders
    ? orders.map((order: OrderInterface) => {
        const temp = {
          id: order._id,
          price: order.price,
          address: order.shippingDetails.address,
          orderType: order.shippingDetails.orderType,
          status: order.status,
        };
        return temp;
      })
    : [];
  return (
    <Box sx={{ margin: "20px" }}>
     
      <Box sx={{
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: "#424242",
      color:"#fafafa" , 
    }
  }}>
        <DataGrid
         getRowId={(row: { id: string }) => row.id} rows={costumeOrders || []} columns={columns}
          />
      </Box>
    </Box>
  );
}

