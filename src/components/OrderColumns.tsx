// // OrderColumns.tsx
// import { Button, Box } from "@mui/material";
// import { GridRenderCellParams } from "@mui/x-data-grid";
// import DeleteIcon from "@mui/icons-material/Delete";
// interface OrderColumnsProps {
//   handleDeleteOrder: (orderId: string) => void;
//   handleChangeStatus: (orderId: string) => void;
// }

// export const OrderColumns: React.FC<OrderColumnsProps> = ({ handleDeleteOrder, handleChangeStatus }) => {
//   const statusMap: { [key: string]: string } = {
//     Pending: "#ffb84da9",
//     Delivered: "#74ff03a0",
//     Refunded: "#ff00009e",
//   };

//   const columns = [
//     {
//       field: "id",
//       headerName: "ID",
//       flex: 1,
//     },
//     {
//       field: "address",
//       headerName: "Address",
//       flex: 0.5,
//     },
//     {
//       field: "price",
//       headerName: "Price",
//       flex: 1,
//     },
//     {
//       field: "orderType",
//       headerName: "Order Type",
//       flex: 0.8,
//     },
//     {
//       field: "status",
//       headerName: "Status",
//       width: 150,
//       renderCell: (params: GridRenderCellParams) => (
//         <Box
//           sx={{
//             bgcolor: statusMap[params.value],
//             color: "white",
//             p: "5px",
//             borderRadius: 50,
//             width: "85px",
//             textAlign: "center",
//           }}
//         >
//           {params.value}
//         </Box>
//       ),
//     },
//     {
//       field: "delete",
//       headerName: "Delete Order",
//       width: 150,
//       renderCell: (params: GridRenderCellParams) => (
//         <Button
//           onClick={() => handleDeleteOrder(params.id.toString())}
//           disabled={params.row.status !== "Pending"}
//           startIcon={<DeleteIcon />}
//         >
//           Delete
//         </Button>
//       ),
//     },
//     {
//       field: "changeStatus",
//       headerName: "Change Status",
//       width: 200,
//       renderCell: (params: GridRenderCellParams) => (
//         <Button
//           onClick={() => handleChangeStatus(params.id.toString())}
//           disabled={!params.row.orderType || params.row.orderType !== "Pickup" || params.row.status !== "Pending"}
//         >
//           Change Status
//         </Button>
//       ),
//     },
//   ];

//   // Return the JSX element (DataGrid) using the columns
//   return (
//     <div>
//       {/* You can customize the container or wrapper if needed */}
//       {/* For example, you can use a Fragment <> ... </> */}
//       {columns.map((column, index) => (
//         <div key={index}>{column.headerName}</div>
//       ))}
//     </div>
//   );
// };
