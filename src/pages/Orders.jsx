import React, { useEffect, useState } from "react";
import Header from "../components/headers/light";
import Footer from "../components/footers/FiveColumnWithInputForm.js";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import axios from "axios";

const Orders = () => {
  const Container = tw.div`relative bg-gray-200 text-gray-700 -mb-8 -mx-8 px-4 py-8 lg:py-12`;
  const Content = tw.div`max-w-screen-xl mx-auto relative z-10`;
  const user = JSON.parse(localStorage.getItem("user"));
  const [orders, setOrders] = useState([]);
  console.log(orders);

  // Your code here
  // Panggil fungsi dan state dari order context
  const getOrders = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/orders`, {
        headers: {
          Authorization: `${user.token}`,
          "Content-Type": "application/json",
        },
      });
      const data = response.data;
      console.log("--------", data);
      setOrders(data);
    } catch (error) {}
  };

  useEffect(() => {
    // Your code here
    getOrders();
  }, []);

  return (
    <AnimationRevealPage>
      <Header className="mb-8" />

      <Container>
        <Content>
          {/* Your Code Here */}
          <div>
            <h1>Orders History</h1>
            <div>
              {/* Tampilkan daftar order */}

              {orders.map((item) => {
                let total = 0;
                item.order_items.forEach((item) => {
                  total += parseFloat(item.product.price);
                });
                return (
                  <table className="w-full mx-auto">
                    <div key={item.id}>
                      <p> Alamat: {item.address} </p>
                      <p> Postal Code: {item.postal_code}</p>
                      <p> Payment Method: {item.payment_method}</p>
                      <p> Country: {item.country}</p>
                      <div>
                        <div className="mx-auto">
                          <thead>
                            <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                              <th className="px-4 py-3">Product</th>
                              <th className="px-4 py-3">Product ID</th>
                              <th className="px-4 py-3">Quantity</th>
                              <th className="px-4 py-3">Price</th>
                            </tr>
                          </thead>
                          {item.order_items.map((product) => (
                            <tbody>
                              <tr className="text-gray-700">
                                <td className="px-4 py-3 border">
                                  <div className="flex items-center text-sm">
                                    <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                                      <img
                                        className="object-cover w-full h-full rounded-full"
                                        src={`http://localhost:8000/uploads/${product.product.images[0]}`}
                                        alt=""
                                        loading="lazy"
                                      />
                                      <div
                                        className="absolute inset-0 rounded-full shadow-inner"
                                        aria-hidden="true"
                                      ></div>
                                    </div>
                                    <div>
                                      <p className="font-semibold text-black">
                                        {product.product.title}
                                      </p>
                                      <p
                                        className="text-xs text-gray-600 rounded-lg  "
                                        style={{
                                          backgroundColor: product.color,
                                        }}
                                      ></p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-ms font-semibold border">
                                  {product.product.id}
                                </td>
                                <td className="px-4 py-3 text-xs border">
                                  <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                                    {" "}
                                    {product.quantity}{" "}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-sm border">
                                  {product.product.price}
                                </td>
                              </tr>
                            </tbody>
                          ))}
                          <p>Total : {total}</p>
                        </div>
                      </div>
                    </div>
                  </table>
                );
              })}
            </div>
          </div>
        </Content>
      </Container>

      <Footer background="bg-white" />
    </AnimationRevealPage>
  );
};

export default Orders;
