import { Box, Button } from "@mui/material";
import { DataGrid, GridRenderCellParams , GridCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from 'react';
import axios from 'axios';
import DeleteIcon from "@mui/icons-material/Delete";

export interface UserInterface{
    id:string
    email: string,
    password: string,
    isadmin: boolean
    code:" "
}

export const CustomersTable = () => {
    const columns = [
        {
          field: "id",
          headerName: "ID",
          flex: 1,
        },
        {
          field: "email",
          headerName: "Email",
          flex: 0.5,
        },
        {
          field: "isadmin",
          headerName: "Permissions",
          flex: 1,
        },
        {
          field: "delete",
          headerName: "Delete user",
          width: 150,
          renderCell: (params: GridRenderCellParams) => (
            <Button onClick={() => handleDeleteUser(params.id.toString())}  startIcon={<DeleteIcon />}>
              Delete
            </Button>
          ),
        },
        {
          field: "changeStatus",
          headerName: "Change Status",
          width: 200,
          renderCell: (params: GridRenderCellParams) => (
            <Button onClick={() => handleDeleteUser(params.id.toString())} >
              Change Status
            </Button>
          ),
        },
      ];
      const handleDeleteUser = async (userId: string) => {
        try {
          await axios.delete(`${import.meta.env.VITE_BASE_URL}users/${userId}`);
          setUser((prevusers) => prevusers.filter((user) => user.id !== userId));
        } catch (error) {
          console.error(`Error deleting user with ID ${userId}:`, error);
        }
      };
    

    const [user, setUser] = useState<UserInterface[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            try {
              const response = await axios.get<UserInterface[]>(`${import.meta.env.VITE_BASE_URL}users`, {
                headers: {
                  Authorization: token,
                },
              });
              const usersData: UserInterface[] = response.data;
              setUser(Array.isArray(usersData) ? usersData : []); // Ensure usersData is always an array
              console.log(usersData);
          
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          };
        fetchData();
      }, []);



  return (
    <Box sx={{ margin: "10%"  }}>
    <Box
      sx={{
        width:"50vw",
         height:"80vh",
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
      <DataGrid  getRowId={(row: { id: string }) => row.id} rows={user || []} columns={columns} />
    </Box>
  </Box>
  );
};

