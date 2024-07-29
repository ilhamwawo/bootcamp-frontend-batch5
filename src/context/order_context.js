import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrdersContext = React.createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState([]);
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
    payment: "Credit Card",
    userId: null,
    orderItems: [],
  });

  // TODO
  // 1. Lengkapi fungsi getOrdersById
  // 2. Buatkan fungsi createOrder
  const user = JSON.parse(localStorage.getItem('user'))
  const getOrdersByUserId = async () => {
    try {
      // Your code here
      const response = await axios.get(`https://localhost:3000/api/orders/`, {
        headers: {
          Authorization: `${user.token}`
        }
      })
      const datas = response.data
      setOrders(datas)
    } catch (err) {
      // Your code here
      console.log(err)
    }
  };

  // Buat fungsi create order disni

  const createOrder = async () => {
    try {
      const response = await axios.post('https://localhost:300/api/orders/', formData, {
        headers: {
          Authorization: `${user.token}`
        }
      })
      const datass = response.data
      toast.success('order berhasil dibuat', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } catch (err) {
      console.log(err)
      toast.error('terjadi kesalahan', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  return (
    <OrdersContext.Provider
      value={{
        orders,
        setOrders,
        order,
        formData,
        setFormData,
        // panggil fungsinya disini
        getOrdersByUserId,
        createOrder
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
// make sure use
export const useOrderContext = () => {
  return useContext(OrdersContext);
};
