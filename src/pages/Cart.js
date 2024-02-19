import React from "react";
import { useCart } from "react-use-cart";
import Header from "../components/headers/light";
import Footer from "../components/footers/FiveColumnWithInputForm.js";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import { formatPrice } from "helpers/helpers";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";

const Cart = () => {
  const { items, updateItemQuantity, removeItem, emptyCart } = useCart();
  const navigate = useNavigate();
  const Container = tw.div`relative bg-gray-200 text-gray-700 -mb-8 -mx-8 px-4 py-8 lg:py-12`;
  const Content = tw.div`max-w-screen-xl mx-auto relative z-10`;

  const handleUpdateQuantity = (id, newQuantity) => {
    updateItemQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id) => {
    removeItem(id);
  };

  const handleEmptyCart = () => {
    emptyCart();
  };

  const calculateTotalPrice = () => {
    return Object.values(items).reduce(
      (total, cartItem) =>
        total +
        (cartItem.price ? parseFloat(cartItem.price) : 0) * cartItem.quantity,
      0
    );
  };

  return (
    <AnimationRevealPage>
      <Header className="mb-8" />

      <Container>
        <Content>
          <div className="my-8 z-0">
            <div className="flex flex-col md:flex-row justify-between items-center my-4">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-0">
                Your Shopping Cart
              </h2>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={() => navigate(-1)}
              >
                Continue Shoping
              </button>
            </div>
            {Object.values(items).map((cartItem) => (
              <div
                key={cartItem.id}
                className="flex flex-col md:flex-row items-center mb-6 p-4 bg-white rounded-md shadow-md"
              >
                <img
                  src={cartItem.image}
                  alt={cartItem.name}
                  className="w-full h-48 object-cover mb-4 rounded-md md:w-60 md:h-28 md:object-cover md:mr-4"
                />
                <div className="w-full flex justify-between md:flex-col">
                  <div>
                    {" "}
                    <h3 className="text-xl font-semibold mb-2">
                      {cartItem.name}
                    </h3>
                    <p className="text-gray-600">
                      {formatPrice(cartItem.price)}
                    </p>
                    <div className="flex my-2">
                      <p className="my-auto mr-3">Color : </p>
                      <div
                        className={`relative w-8 h-8 rounded-full cursor-pointer border-2 `}
                        style={{ backgroundColor: cartItem.color }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center mt-2 space-x-2">
                    <button
                      className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400 text-xl"
                      onClick={() =>
                        handleUpdateQuantity(
                          cartItem.id,
                          Math.max(1, cartItem.quantity - 1)
                        )
                      }
                    >
                      -
                    </button>
                    <span className="text-xl">{cartItem.quantity}</span>
                    <button
                      className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400 text-xl"
                      onClick={() =>
                        handleUpdateQuantity(
                          cartItem.id,
                          Math.min(10, cartItem.quantity + 1)
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <p className="text-xl mt-2 font-semibold">
                  {formatPrice(
                    (parseFloat(cartItem.price) * cartItem.quantity).toFixed(2)
                  )}
                </p>
                <button
                  className="mt-2 text-white  md:ml-5 bg-red-500 hover:bg-red-700 p-2 rounded-xl"
                  onClick={() => handleRemoveItem(cartItem.id)}
                >
                  <AiOutlineDelete size={20} />
                </button>
              </div>
            ))}
            <div className="w-full flex justify-between">
              {" "}
              <div className="mt-8">
                <h3 className="text-lg md:text-xl font-semibold">
                  Total Price: {formatPrice(calculateTotalPrice().toFixed(2))}
                </h3>
              </div>
              <div className="flex flex-col md:flex-row items-center md:items-end mt-4">
                <button className="bg-blue-500 px-4 py-2 text-white rounded-md mb-2 md:mb-0 md:mr-2 hover:bg-blue-700">
                  Order Now
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
                  onClick={handleEmptyCart}
                >
                  Empty Cart
                </button>
              </div>
            </div>
          </div>
        </Content>
      </Container>

      <Footer background="bg-white" />
    </AnimationRevealPage>
  );
};

export default Cart;
