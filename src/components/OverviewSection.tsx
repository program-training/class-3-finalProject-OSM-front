import { Grid, Container } from "@mui/material";
import { OverviewTotalProfit } from "../components/OverviewTotalProfit";
import { OverviewTotalCustomers } from "../components/OverviewTotalCustomers";
import { useEffect, useState } from "react";
import { OrderInterface } from "../interface/orderInterface";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";

const GET_ORDERS = gql`
  query GetOrders {
    orders {
      _id
      cartItems {
        price
        quantity
      }
    }
  }
`;

function OverviewSection() {
  const { data } = useQuery(GET_ORDERS);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (data) {
      const ordersData: OrderInterface[] = data.orders;

      const calculatedTotalPrice = ordersData.reduce((total, order) => {
        return (
          total +
          order.cartItems.reduce((itemTotal, item) => {
            return itemTotal + item.price * item.quantity;
          }, 0)
        );
      }, 0);

      setTotalPrice(calculatedTotalPrice);
    }
  }, [data]);

  return (
    <Container maxWidth="xl">
      <Grid item sx={{ margin: "20px" }} container spacing={10}>
        <Grid item xs={12} sm={6} lg={3}>
          <OverviewTotalProfit sx={{ height: "100%" }} value={"$" + String(totalPrice)} />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <OverviewTotalCustomers difference={16} positive={false} sx={{ height: "100%" }} value="1.6k" />
        </Grid>
      </Grid>
    </Container>
  );
}

export default OverviewSection;
