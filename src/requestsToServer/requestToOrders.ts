import { useMutation, useQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";
import { OrderInterface } from "../interface/orderInterface";

const GET_ORDERS_QUERY = gql`
  query {
    orders {
      _id
      cartItems {
        id
        name
        description
        price
        quantity
      }
      orderTime
      status
      price
      shippingDetails {
        address
        userId
        contactNumber
        orderType
        id
      }
    }
  }
`;

const DELETE_ORDER_MUTATION = gql`
  mutation deleteOrder($orderId: String!) {
    deleteByOrderId(orderId: $orderId) {
      success
      message
    }
  }
`;

const UPDATE_ORDER_STATUS_MUTATION = gql`
  mutation updateOrderStatus($orderId: String!, $order: OrderInput!) {
    updateOrder(orderId: $orderId, updatedData: $order) {
      _id
      status
    }
  }
`;

export const useGetOrders = () => {
  const { data, loading, error } = useQuery(GET_ORDERS_QUERY);

  if (loading) {
    console.log("Loading...");
  }

  if (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }

  return data?.orders as OrderInterface[];
};

export const useDeleteOrder = () => {
  return async (orderId: string) => {
    const [deleteOrder, { data, loading, error }] = useMutation(DELETE_ORDER_MUTATION, {
      variables: { orderId },
    });

    if (loading) {
      console.log("Loading...");
    }

    if (error) {
      console.error(`Error deleting order with ID ${orderId}:`, error);
      throw error;
    }

    const responseData = data?.deleteByOrderId;
    if (responseData.success) {
      console.log(`Order with ID ${orderId} deleted successfully`);
    } else {
      console.error(`Error deleting order with ID ${orderId}: ${responseData.message}`);
    }

    return deleteOrder; // Use or return deleteOrder if needed
  };
};

export const useUpdateOrderStatus = () => {
  return async (orderId: string) => {
    const [updateOrderStatus, { data, loading, error }] = useMutation(UPDATE_ORDER_STATUS_MUTATION, {
      variables: { orderId, order: { status: "Delivered" } },
    });

    if (loading) {
      console.log("Loading...");
    }

    if (error) {
      console.error(`Error changing status for order with ID ${orderId}:`, error);
      throw error;
    }

    const responseData = data?.updateOrder;
    if (responseData.success) {
      console.log(`Status for order with ID ${orderId} changed to Delivered`);
    } else {
      console.error(`Error changing status for order with ID ${orderId}: ${responseData.message}`);
    }

    return updateOrderStatus; // Use or return updateOrderStatus if needed
  };
};
