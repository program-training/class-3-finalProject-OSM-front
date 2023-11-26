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
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get<OrderInterface[]>(`${import.meta.env.VITE_BASE_URL}orders`, {
          headers: {
            Authorization: token,
          },
        });
        const ordersData: OrderInterface[] = response.data;
        setOrders(ordersData);
        const calculatedTotalPrice = ordersData.reduce((total, order) => {
          return (
            total +
            order.cartItems.reduce((itemTotal, item) => {
              return itemTotal + item.price * item.quantity;
            }, 0)
          );
        }, 0);
        console.log(calculatedTotalPrice);
        setTotalPrice(calculatedTotalPrice);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container maxWidth="xl">
      <Grid sx={{ margin: "20px" }} container spacing={10}>
        <Grid sx={{margin:5}} xs={12} sm={6} lg={3}>
          <OverviewTotalProfit sx={{ height: "100%" }} value={"$" + String(totalPrice)} />
        </Grid>
        <Grid sx={{margin:5}} xs={12} sm={6} lg={3}>
          <OverviewTotalCustomers difference={16} positive={false} sx={{ height: "100%" }} value="1.6k" />
        </Grid>
      </Grid>
    </Container>
  );
}

export default OverviewSection;
