import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { OrderInterface } from "../interface/orderInterface";
import { DataGrid, GridCellParams, GridRenderCellParams } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";

const statusMap: { [key: string]: string } = {
  Pending: "#ffb84da9",
  Delivered: "#74ff03a0",
  Refunded: "#ff00009e",
};

const GET_ORDERS = gql`
  query GetOrders {
    orders {
      _id
      price
      shippingDetails {
        address
        orderType
      }
      status
    }
  }
`;

const DELETE_ORDER = gql`
  mutation DeleteOrder($orderId: ID!) {
    deleteOrder(orderId: $orderId)
  }
`;

const CHANGE_ORDER_STATUS = gql`
  mutation ChangeOrderStatus($orderId: ID!) {
    changeOrderStatus(orderId: $orderId) {
      _id
      price
      shippingDetails {
        address
        orderType
      }
      status
    }
  }
`;

export function LatestOrders() {
  const { data } = useQuery(GET_ORDERS);
  const [deleteOrder] = useMutation(DELETE_ORDER);
  const [changeOrderStatus] = useMutation(CHANGE_ORDER_STATUS);

  const [orders, setOrders] = useState<OrderInterface[]>([]);

  useEffect(() => {
    if (data) {
      setOrders(data.orders);
    }
  }, [data]);

  const handleRowClick = (params: GridCellParams) => {
    console.log("Row Clicked:", params.row);
  };

  const handleDeleteOrder = async (orderId: string) => {
    try {
      await deleteOrder({
        variables: {
          orderId: orderId,
        },
      });
      const updatedOrders = orders.filter((order) => order._id !== orderId);
      setOrders(updatedOrders);
    } catch (error) {
      console.error(`Error deleting order with ID ${orderId}:`, error);
    }
  };

  const handleChangeStatus = async (orderId: string) => {
    try {
      const result = await changeOrderStatus({
        variables: {
          orderId: orderId,
        },
      });
      setOrders(result.data.changeOrderStatus);
    } catch (error) {
      console.error(`Error changing status for order with ID ${orderId}:`, error);
    }
  };

  const customOrders = orders
    ? orders.map((order: OrderInterface) => ({
        id: order._id,
        price: order.price,
        address: order.shippingDetails.address,
        orderType: order.shippingDetails.orderType,
        status: order.status,
      }))
    : [];

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
        <Button onClick={() => handleDeleteOrder(params.row.id.toString())} disabled={params.row.status !== "Pending"} startIcon={<DeleteIcon />}>
          Delete
        </Button>
      ),
    },
    {
      field: "changeStatus",
      headerName: "Change Status",
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Button onClick={() => handleChangeStatus(params.row.id.toString())} disabled={!params.row.orderType || params.row.orderType !== "Pickup" || params.row.status !== "Pending"}>
          Change Status
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ margin: "20px" }}>
      <Box
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#424242",
            color: "#fafafa",
          },
          "& .MuiDataGrid-sortIcon": {
            color: "#fafafa",
          },
          "& .MuiIconButton-root .MuiSvgIcon-root": {
            color: "#fafafa",
          },
        }}
      >
        <DataGrid onCellClick={handleRowClick} getRowId={(row: { id: string }) => row.id} rows={customOrders || []} columns={columns} />
      </Box>
    </Box>
  );
}
