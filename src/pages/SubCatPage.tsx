import React from "react";
import { motion } from "framer-motion";
import { categories } from "@/data/categories";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { CategoryNav } from "@/components/category-nav";

// Define the CartItem interface
interface CartItem {
  id: number;
  name: string;
  image: string;
  originalPrice: number;
  quantity: number;
}

const ProductGrid = ({ cart, setCart, selectedCategory, setselectedCategory,user,setUser}) => {
  const { category } = useParams();
  const navigate = useNavigate();

  const filteredProducts = categories.filter((p) => p.subcategory === category);

  // Add to Cart function with duplicate check
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) return; // If the product already exists, do nothing

    const newCartItem: CartItem = {
      id: product.id,
      name: product.name,
      image: product.image,
      originalPrice: product.price,
      quantity: 1, // Add the product with quantity 1 initially
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
        .filter((item) => item.quantity > 0) // Remove item if quantity is 0
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cart={cart} setCart={setCart} setselectedCategory={setselectedCategory} showSearchLoginProfile={true} user={user} setUser={setUser}/>
      <CategoryNav selectedCategory={selectedCategory} setselectedCategory={setselectedCategory} />

      <div className="max-w-screen-xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">{category}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => {
            const inCart = cart.find((item) => item.id === product.id);
            return (
              <motion.div
                key={product.id}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <img
                  className="w-full h-48 object-cover rounded-t-lg"
                  src={product.image}
                  alt={product.name}
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xl font-bold text-green-600">${product.price}</span>
                  </div>

                  {inCart ? (
                    <div className="flex justify-between items-center mt-4">
                      <button
                        onClick={() => decrementQuantity(inCart.id)}
                        className="px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300 transition duration-200"
                      >
                        -
                      </button>
                      <span className="text-lg font-semibold">{inCart.quantity}</span>
                      <button
                        onClick={() => incrementQuantity(inCart.id)}
                        className="px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300 transition duration-200"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(product)} // Use addToCart function here
                      className="mt-4 w-full px-4 py-2 bg-pink-600 text-white font-semibold rounded-md hover:bg-pink-700 transition duration-200"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
