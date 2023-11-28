import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { OrderInterface } from "../interface/orderInterface";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { StyledTableCell } from "../style/styles";
import TableRowComponent from "./TableRowComponent";
import { requestGetOrders, requestDeleteOrder, requestPutOrderStatus } from "../requestsToServer/requestToOrders";

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
      try {
        const orders = await requestGetOrders();
        console.log("Fetched orders:", orders);
        const ordersData: OrderInterface[] = orders;
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDeleteOrder = async (orderId: string) => {
    try {
      await requestPutOrderStatus(orderId);
      const updatedOrders = await requestGetOrders();
      setOrders(updatedOrders);
    } catch (error) {
      console.error(`Error changing status for order with ID ${orderId}:`, error);
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
      <Box
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#424242",
            color: "#fafafa",
          },
        }}
      >
        <DataGrid getRowId={(row: { id: string }) => row.id} rows={costumeOrders || []} columns={columns} />
      </Box>
    </Box>
  );
}
