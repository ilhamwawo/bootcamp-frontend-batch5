import React, { useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import Header from "../components/headers/light";
import Footer from "../components/footers/FiveColumnWithInputForm.js";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { FaLocationDot } from "react-icons/fa6";
import { formatPrice } from "helpers/helpers";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { Products } from "./Products";

const Checkout = () => {
  const { handleSubmit } = useForm();
  const { items, emptyCart } = useCart();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState();
  const user = JSON.parse(localStorage.getItem('user'))

  const [formData, setFormData] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
    payment_method: "Credit Card",
    userId: user.id,
    products: []
  });

 
  const [isButtonDisabled, setButtonDisabled] = useState(false)

  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/orders`,
        formData,
        {
          headers: {
            Authorization: `${user.token}`,
            "Content-Type": "application/json",
          }
        }
      )
      const data = response.data
      console.log('Order berhasil dibuat', data);
      setFormData({
        address: "",
        city: "",
        postalCode: "",
        country: "",
        payment_method: "Credit Card",
        userId: user.id,
        products: []
      });
      toast.success('Order Berhasil Dibuat', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,        
      })
      emptyCart(),
      navigate('/orders')
    } catch (error) {
      
    }
  }
 
  // Todo
  // Panggil state dan juga fungsi createOrder dari ordercontext

  const handleInputChange = (e) => {
  // Your code here
  };

  return (
    <AnimationRevealPage>
      <Header className="mb-8" />
      {/* Your Code Here */}
      <Footer background="bg-white" />
    </AnimationRevealPage>
  );
};

export default Checkout;
