import axios from 'axios';
import { OrderInterface } from '../interface/orderInterface';

export const requestGetOrders = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get<OrderInterface[]>(
      `${import.meta.env.VITE_BASE_URL}orders`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};


export const requestDeleteOrder = async (orderId:string) => {
  try {
    await axios.delete(`${import.meta.env.VITE_BASE_URL}orders/${orderId}`);
  } catch (error) {
    console.error(`Error deleting order with ID ${orderId}:`, error);
    throw error;
  }
};

export const requestPutOrderStatus = async (orderId:string) => {
  const token = localStorage.getItem("token");
  try {
    await axios.put(
      `${import.meta.env.VITE_BASE_URL}orders/${orderId}`,
      { status: "Delivered" },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  } catch (error) {
    console.error(`Error changing status for order with ID ${orderId}:`, error);
    throw error;
  }
};