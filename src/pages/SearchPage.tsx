import React from "react";
import { motion } from "framer-motion";
import { categories } from "@/data/categories";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { CategoryNav } from "@/components/category-nav";

// Define the CartItem interface for TypeScript type safety
interface CartItem {
  id: number;
  name: string;
  image: string;
  originalPrice: number;
  quantity: number;
}

const SearchPage = ({ cart, setCart, selectedCategory, setselectedCategory,user,setUser }) => {
  const { searchText } = useParams();
  const lowerSearch = searchText.toLowerCase();

  const filteredProducts = categories.filter((product) =>
    product.name.toLowerCase().includes(lowerSearch)
  );

  // Add to Cart function with duplicate check
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) return; // If the product already exists, do nothing

    const newCartItem: CartItem = {
      id: product.id,
      name: product.name,
      image: product.image,
      originalPrice: product.price,
      quantity: 1, // Set the initial quantity to 1
    };

    setCart((prev) => [...prev, newCartItem]); // Add the new item to the cart
  };

  const incrementQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <div className="min-h-screen bg-[#FFF5E1]">
    <Navbar cart={cart} setCart={setCart} setselectedCategory={setselectedCategory} showSearchLoginProfile={true} user={user} setUser={setUser}/>
    <CategoryNav selectedCategory={selectedCategory} setselectedCategory={setselectedCategory}/>
  
    <div className="max-w-screen-xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-[#2D2D2D]">
        Search Results for "{searchText}"
      </h1>
  
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => {
            const inCart = cart.find((item) => item.id === product.id);
            return (
              <motion.div
                key={product.id}
                className="bg-[#FFEDD5] rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <img
                  className="w-full h-48 object-cover rounded-t-lg"
                  src={product.image}
                  alt={product.name}
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-[#2D2D2D]">{product.name}</h2>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-lg font-bold text-[#556B2F]">${product.price}</span>
                  </div>
  
                  {inCart ? (
                    <div className="flex justify-between items-center mt-4">
                      <button
                        onClick={() => decrementQuantity(inCart.id)}
                        className="px-4 py-2 border border-[#556B2F] text-[#556B2F]  rounded-md hover:bg-[#556B2F] hover:text-white"
                        >
                        -
                      </button>
                      <span className="text-lg font-semibold">{inCart.quantity}</span>
                      <button
                        onClick={() => incrementQuantity(inCart.id)}
                        className="px-4 py-2 border border-[#556B2F] text-[#556B2F]  rounded-md hover:bg-[#556B2F] hover:text-white"
                        >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(product)}
                      className="mt-4 px-4 py-2 border border-[#556B2F] text-[#556B2F] rounded-md w-full hover:bg-[#556B2F] hover:text-white"
                      >
                      Add to Cart
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <p className="text-xl text-gray-500 text-center">No products found matching "{searchText}".</p>
      )}
    </div>
  </div>
  
  );
};

export default SearchPage;
