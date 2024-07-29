import React, { useState } from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { SectionHeading } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-5.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-7.svg";
import { useCart } from "react-use-cart";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useProductsContext } from "context/product_context";
import {data} from "helpers/Utils.js"


const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;
const Header = tw(SectionHeading)``;
const TabsControl = tw.div`flex flex-wrap bg-gray-200 px-2 py-2 rounded leading-none mt-12 xl:mt-0`;

const ModalContent = tw.div`bg-white p-8 rounded-lg text-center`;
const QuantityControl = tw.div`flex items-center justify-center space-x-4 mb-4`;
const QuantityButton = tw(PrimaryButtonBase)`text-lg font-bold`;
const QuantityDisplay = tw.div`text-lg font-bold`;

const ModalContainer = tw.div`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50`;

const CancelButton = tw(
  PrimaryButtonBase
)`text-sm mt-4 bg-red-600 hocus:bg-red-700 ml-5`;

const TabControl = styled.div`
  ${tw`cursor-pointer px-6 py-3 mt-2 sm:mt-0 sm:mr-2 last:mr-0 text-gray-600 font-medium rounded-sm transition duration-300 text-sm sm:text-base w-1/2 sm:w-auto text-center`}
  &:hover {
    ${tw`bg-gray-300 text-gray-700`}
  }
  ${(props) => props.active && tw`bg-secondary-500! text-gray-100!`}
  }
`;

const BuyNowButton = tw(PrimaryButtonBase)`text-sm cursor-pointer`;

const TabContent = tw(
  motion.div
)`mt-6 flex flex-wrap sm:-mr-10 md:-mr-6 lg:-mr-12`;
const CardContainer = tw.div`mt-10 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 sm:pr-10 md:pr-6 lg:pr-12  `;
const Card = tw(
  motion.a
)`bg-gray-200 rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0 relative`;

const CardButton = tw(
  PrimaryButtonBase
)`text-sm cursor-pointer absolute bottom-0 left-0 right-0 mx-auto`;
const CardImageContainer = styled.div`
  ${(props) =>
    css`
      background-image: url("${props.image}");
    `}
  ${tw`h-56 xl:h-64 bg-center bg-cover relative rounded-t`}
  position: relative;
  overflow: hidden;
  border-radius: 8px; /* Sesuaikan dengan kebutuhan Anda */
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-64 w-64 opacity-15 transform translate-x-2/3 -translate-y-12 text-pink-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-80 w-80 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;

export default ({ heading = "Checkouts the Products" }) => {
  const { products , getProductById } = useProductsContext();
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [tabsKeys, setTabsKeys] = useState([
    "Best Sellers",
    "sepatu",
    "baju ",
    "topi",
    "kemeja",
  ]);
  const [activeTab, setActiveTab] = useState("Best Sellers");
  const { addItem, updateItemQuantity, items } = useCart();
 
  // const getRandomCards = () => {
    // const products = data;
    // return cards.sort(() => Math.random() - 0.5);
  // };
// 
  const tabs = {
    "Best Sellers": products?.sort((a, b) => b.rating - a.rating).slice(0,8), // Sort by stars in descending order
    sepatu: products?.filter((product) => product.category.name === 'Sepatu'), // Perbaharui filter berdasarkan kemeja
    baju : products?.filter((product) => product.category.name === 'Baju'), // Perbaharui filter berdasarkan baju
    topi: products?.filter((product) => product.category.name === 'Topi'), // Perbaharui filter berdasarkan celana
    kemeja: products?.filter((product) => product.category.name === 'Kemeja'), // Perbaharui filter berdasarkan jakety
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setQuantity(1);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleCancel = () => {
    setQuantity(1);
    closeModal();
  };

  const handleBuyNow = (e) => {
    e.preventDefault();

    if (selectedItem) {
      const quantityNumber = Number(quantity);

      // Berikan validasi jika stock habis

      if (items[selectedItem.title]) {
        updateItemQuantity(
          selectedItem.id,
          Number(items[selectedItem.title].quantity) + quantityNumber
        );
      } else {
        addItem(selectedItem, quantityNumber);
      }

      setQuantity(1);
      closeModal();

      toast.success(
        `Added ${quantityNumber} ${selectedItem.title}(s) to the cart`,
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

  return (
    <Container>
      <ContentWithPaddingXl>
        <HeaderRow>
          <Header>{heading}</Header>
          <TabsControl>
            {Object.keys(tabs)?.map((tabName, index) => (
              <TabControl
                key={index}
                active={activeTab === tabName}
                onClick={() => setActiveTab(tabName)}
              >
                {tabName}
              </TabControl>
            ))}
          </TabsControl>
        </HeaderRow>

        {tabsKeys?.map((tabKey, index) => (
          <TabContent
            key={index}
            variants={{
              current: {
                opacity: 1,
                scale: 1,
                display: "flex",
              },
              hidden: {
                opacity: 0,
                scale: 0.8,
                display: "none",
              },
            }}
            transition={{ duration: 0.4 }}
            initial={activeTab === tabKey ? "current" : "hidden"}
            animate={activeTab === tabKey ? "current" : "hidden"}
          >
            {tabs[tabKey]?.map((card, index) => (
              <CardContainer key={index}>
                <Card
                  className="group"
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  <Link to={`/detail-product/${card.id}`}>
                    <CardImageContainer
                      image={`http://localhost:8000/uploads/${card.images[0]}`}
                      className="flex items-center justify-center"
                    />
                  </Link>
                  <CardButton onClick={() => openModal(card)}>
                    Buy Now
                  </CardButton>
                </Card>
              </CardContainer>
            ))}
          </TabContent>
        ))}
      </ContentWithPaddingXl>

      {/* Modal for Buy Now */}
      {showModal && (
        <>
          <ModalContainer>
            <ModalContent>
              <h2 tw="text-2xl font-semibold mb-4">
                Select Quantity for {selectedItem.name}
              </h2>
              <QuantityControl>
                <QuantityButton
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </QuantityButton>
                <QuantityDisplay>{quantity}</QuantityDisplay>
                <QuantityButton
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                >
                  +
                </QuantityButton>
              </QuantityControl>
              <BuyNowButton onClick={handleBuyNow}>Add to Cart</BuyNowButton>
              <CancelButton onClick={handleCancel}>Cancel</CancelButton>
            </ModalContent>
          </ModalContainer>
        </>
      )}

      <DecoratorBlob1 />
      <DecoratorBlob2 />
    </Container>
  );
};

