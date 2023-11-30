import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";

export interface UserInterface {
  id: number;
  email: string;
  password: string;
  isadmin: boolean;
  code: " ";
}

export const CustomersTable = () => {

  const [users, setUsers] = useState<UserInterface[]>([]);
  const [count, setCount] = useState<number>(0);

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "isadmin", headerName: "Permissions", flex: 1 },
    {
      field: "delete",
      headerName: "Delete user",
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Button onClick={() => handleDeleteUser(Number(params.id))} startIcon={<DeleteIcon />}>
          Delete
        </Button>
      ),
    },
    {
      field: "changeStatus",
      headerName: "Change Status",
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Button onClick={() => handleChangeStatus(params.id.toString())}>Change Status</Button>
      ),
    },
  ];


  const handleDeleteUser = async (userId: number) => {
    console.log(users);
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}users/${userId}`);
      setCount(count + 1 )
      console.log(`Successfully deleted user with ID ${userId}`);
      // Optionally, you can add a notification or other user feedback here
    } catch (error) {
      console.error(`Error deleting user with ID ${userId}:`, error);
      // Optionally, you can add a notification or other user feedback here
    }
  };

  const handleChangeStatus = (userId: string) => {

    console.log(`Change status for user with ID ${userId}`);

  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get<UserInterface[]>(`${import.meta.env.VITE_BASE_URL}users`, {
          headers: { Authorization: token },
        });
        const usersData: UserInterface[] = response.data;
        setUsers(usersData);
        console.log(usersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [count]);

  return (
    <Box sx={{ margin: "10%" , display:"flex" ,justifyContent:" center" }}>
    <Box sx={{ margin: "10%" , display:"flex" ,justifyContent:" center" }}>
      <Typography variant="h1" component="h2">Customers</Typography>
      <Box
        sx={{
          width: "50vw",
          height: "80vh",
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
        <DataGrid getRowId={(row: { id: number }) => row.id} rows={users} columns={columns} />
      </Box>
    </Box>
    </Box>
  );
};
