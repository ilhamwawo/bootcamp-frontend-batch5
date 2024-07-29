import axios from "axios";
import React, { useContext, useEffect, useState } from "react";


const ProductsContext = React.createContext();
const cards = [
  {
    imageSrc:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
    title: "Steed LS T-shirt",
    content: "-",
    price: "265000",
    rating: "5.0",
    reviews: "87",
    url: "#",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1582254465498-6bc70419b607?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
    title: "Fukasi LS",
    content: "-",
    price: "225000",
    rating: "4.5",
    reviews: "34",
    url: "#",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1565310022184-f23a884f29da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
    title: "Supply Bowling",
    content: "-",
    price: "345000",
    rating: "3.9",
    reviews: "26",
    url: "#",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
    title: "Limitless T-shirt",
    content: "-",
    price: "245000",
    rating: "4.2",
    reviews: "95",
    url: "#",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1550461716-dbf266b2a8a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
    title: "Bordshort Obdisian",
    content: "-",
    price: "225000",
    rating: "5.0",
    reviews: "61",
    url: "#",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327??ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
    title: "Heart shirt",
    content: "-",
    price: "245000",
    rating: "4.9",
    reviews: "89",
    url: "#",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
    title: "Spectrum Dark Jacket",
    content: "-",
    price: "500000",
    rating: "4.6",
    reviews: "12",
    url: "#",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1473093226795-af9932fe5856?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
    title: "Evade Crease Long Pants",
    content: "-",
    price: "385000",
    rating: "4.2",
    reviews: "19",
    url: "#",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1473093226795-af9932fe5856?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
    title: "Canate Boxy Shirt Black",
    content: "-",
    price: "245000",
    rating: "4.2",
    reviews: "19",
    url: "#",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1473093226795-af9932fe5856?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
    title: "Crease Cargo Ebony",
    content: "-",
    price: "425000",
    rating: "4.2",
    reviews: "19",
    url: "#",
  },
];


export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({})
  const [kategori, setKategori] = useState([])
  const [loading, setLoading] = useState(false);
  const fetchProducts = async () => {
    try {
      // const response = await axios.get(
      //   "https://65cc9d71dd519126b83f161f.mockapi.io/api/v1/products"
      // );
      setLoading(true)
      const response = await axios.get("http://localhost:8000/api/products")

      // Memotong array hasil response menjadi 14 data
      // const limitedData = response.data.slice(0, 14);

      // Menetapkan data yang telah dipotong ke state
      setProducts(response.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false)
    }
  };

  const getProductById = async (id) => {
    try {
      // Your code
      setLoading(true)
      const response = await axios.get(
        `http://localhost:8000/api/products/${id}`
      )
      console.log(response)
      const getidproduct = response.data.data
      setProduct(getidproduct)
    } catch (err) {
      // Your code
      console.log(err)
    } finally {
      setLoading(false)
    }
  };

  const getAllCategory = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/categories")
    
      
      console.log(response.data.data)
      setKategori(response.data.data)
      
    } catch (error) {
      
    }
  }
  

  useEffect(() => {
    fetchProducts();
    getAllCategory()
  }, []);

 

  

  return (
    <ProductsContext.Provider
      value={{
        products,
        product,
         getProductById,
         getAllCategory,
         kategori,
         setProduct,
         loading
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
