// OverviewSection.tsx
import React from "react";
import { Grid, Container } from "@mui/material";
import { OverviewTotalProfit } from "../components/OverviewTotalProfit";
import { OverviewTotalCustomers } from "../components/OverviewTotalCustomers";
import { useEffect, useState } from "react";
import { OrderInterface } from "../interface/orderInterface";
import axios from "axios";
import { log } from "console";

function OverviewSection() {
  const [orders, setOrders] = useState<OrderInterface[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<OrderInterface[]>(`${import.meta.env.VITE_BASE_URL}orders`);
        const ordersData: OrderInterface[] = response.data;
        setOrders(ordersData);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);



  
  return (

    <Container maxWidth="xl">
      <Grid sx={{ margin: "20px" }} container spacing={10}>
        <Grid xs={12} sm={6} lg={3}>
          <OverviewTotalProfit sx={{ height: "100%" }} value="{totalPrice}" />
        </Grid>
        <Grid xs={12} sm={6} lg={3}>
          <OverviewTotalCustomers difference={16} positive={false} sx={{ height: "100%" }} value="1.6k" />
        </Grid>
      </Grid>
    </Container>
  );
}

export default OverviewSection;