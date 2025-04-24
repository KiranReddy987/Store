import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { categories } from "@/data/categories";
import { Navbar } from "@/components/navbar";
import { CategoryNav } from "@/components/category-nav";
import Footer from "@/components/ui/Footer";

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number;
  discount: number;
  description: string;
  tag?: string;
  subcategory: string;
}

interface CartItem {
  id: number;
  name: string;
  image: string;
  originalPrice: number;
  quantity: number;
}

const categoryMap: Record<number, string> = {
  0: "All",
  1: "Food & Meals",
  2: "Tobacco & Smoking 🔞",
  3: "Beer & Wine",
  4: "Snacks & Beverages",
  5: "Essentials & Care",
};

const App = ({
  cart,
  setCart,
  selectedCategory,
  setselectedCategory,
  user,
  setUser,
}) => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const catId = parseInt(categoryId || "0");
  const filteredCategories =
    catId === 0 ? categories : categories.filter((c) => c.category === catId);

  const uniqueSubcategories = [
    ...new Set(filteredCategories.map((c) => c.subcategory)),
  ];
  const [selectedSubCategory, setselectedSubCategory] = useState<string>("All");

  useEffect(() => {
    if (!(catId in categoryMap)) {
      navigate("/not-found");
      return;
    }
    setselectedSubCategory("All");
    setselectedCategory(categoryMap[catId]);
  }, [catId, navigate, setselectedCategory, setselectedSubCategory]);

  const filteredProducts =
    selectedSubCategory === "All"
      ? filteredCategories
      : filteredCategories.filter(
          (product) => product.subcategory === selectedSubCategory
        );

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) return;

    const newCartItem: CartItem = {
      id: product.id,
      name: product.name,
      image: product.image,
      originalPrice: product.price,
      quantity: 1,
    };
    setCart([...cart, newCartItem]);
  };

  const incrementQuantity = (id: number) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id: number) => {
    setCart(
      cart.filter((item) => {
        if (item.id === id) {
          return item.quantity > 1 ? (item.quantity--, true) : false;
        }
        return true;
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#FFF5E1]">
      <Navbar
        cart={cart}
        setCart={setCart}
        setselectedCategory={setselectedCategory}
        showSearchLoginProfile={true}
        user={user}
        setUser={setUser}
      />
      <CategoryNav
        selectedCategory={selectedCategory}
        setselectedCategory={setselectedCategory}
      />

      <div className="flex p-6 bg-[#FFEDD5]">
        {/* Sidebar (Sticky) */}
        <div className="w-1/4 h-[630px] bg-[#FFF5E1] p-6 rounded-lg shadow-md sticky top-6 overflow-hidden">
          <h2 className="text-lg font-semibold text-[#2D2D2D] mb-4 sticky top-0 bg-[#FFF5E1] z-10 pb-2">
            Categories
          </h2>
          <ul className="overflow-y-auto h-[calc(100%-2.5rem)] pr-2 scrollbar-thin scrollbar-thumb-[#D6BA8A] scrollbar-track-[#FFF5E1]">
            <li
              className={`cursor-pointer p-3 mb-2 rounded-lg transition-colors duration-200 ${
                selectedSubCategory === "All"
                  ? "bg-[#556B2F] text-white"
                  : "text-[#2D2D2D] hover:bg-[#FFEDD5] hover:text-[#2D2D2D]"
              }`}
              onClick={() => setselectedSubCategory("All")}
            >
              All
            </li>
            {uniqueSubcategories.map((category) => (
              <li
                key={category}
                className={`cursor-pointer p-3 mb-2 rounded-lg transition-colors duration-200 ${
                  selectedSubCategory === category
                    ? "bg-[#556B2F] text-white"
                    : "text-[#2D2D2D] hover:bg-[#FFEDD5] hover:text-[#2D2D2D]"
                }`}
                onClick={() => setselectedSubCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Product Grid (Free Height) */}
        <div className="w-3/4 ml-8 pr-4">
          <h1 className="text-3xl font-bold mb-6 text-[#2D2D2D]">
            {selectedSubCategory === "All"
              ? selectedCategory
              : selectedSubCategory}
          </h1>

          <div className="grid grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const inCart = cart.find((item) => item.id === product.id);
              return (
                <motion.div
                  key={product.id}
                  className="max-w-sm rounded-lg overflow-hidden shadow-md bg-[#FFEDD5] hover:bg-[#FFF5E1] transition duration-300 ease-in-out"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    className="w-full h-40 object-cover rounded-lg mb-4"
                    src={product.image}
                    alt={product.name}
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-[#2D2D2D]">
                      {product.name}
                    </h2>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xl font-bold text-[#556B2F]">
                        ${product.price}
                      </span>
                    </div>
                    {inCart ? (
                      <div className="flex justify-between items-center mt-4">
                        <button
                          onClick={() => decrementQuantity(inCart.id)}
                          className="px-4 py-2 border border-[#556B2F] text-[#556B2F] rounded-md hover:bg-[#556B2F] hover:text-white"
                        >
                          -
                        </button>
                        <span className="text-lg font-semibold">
                          {inCart.quantity}
                        </span>
                        <button
                          onClick={() => incrementQuantity(inCart.id)}
                          className="px-4 py-2 border border-[#556B2F] text-[#556B2F] rounded-md hover:bg-[#556B2F] hover:text-white"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(product)}
                        className="mt-4 px-4 py-2 bg-[#556B2F] text-white rounded-md w-full hover:bg-[#4B5320] hover:text-white"
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

      <Footer />
    </div>
  );
};

export default App;
