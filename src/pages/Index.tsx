import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { CategoryNav } from "@/components/category-nav";
import { CategoryCard } from "@/components/ui/category-card";
import { subcategories } from "@/data/subcategoryObjects";
import { categories } from "@/data/categories";
import Footer from "@/components/ui/Footer";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { comboItems } from "@/data/combos";

interface CartItem {
  id: number;
  name: string;
  image: string;
  originalPrice: number;
  quantity: number;
}

const Index = ({
  selectedCategory,
  setselectedCategory,
  cart,
  setCart,
  user,
  setUser,
}) => {
  const itemsPerBanner = 3;

  const bannerCategories = [
    {
      title: "Breakfast",
      image: "/images/38ea67c8-143e-48f7-8343-b7276289a322.png",
    },
    {
      title: "Muffins",
      image: "/images/3efc5f5e-f131-4c7d-9926-466e7ab94133.png",
    },
    {
      title: "Quesadillas",
      image: "/images/Screenshot 2025-04-23 at 18.26.06.png",
    },
    {
      title: "Wine Coolers",
      image: "public/images/893ed2d0-8e18-4df1-bdfd-7eb0f0c89eb9.png",
    },
    {
      title: "Snacks & Candy",
      image: "/images/6d0b1f05-4363-4df9-87df-db12288c21c6.png",
    },
    {
      title: "Frozen Foods",
      image: "/images/93e601e4-d6aa-428e-89b3-e58f4a68d0b6.png",
    },
    {
      title: "Grocery Essentials",
      image: "/images/grocery.png",
    },
    {
      title: "Pet Care",
      image: "/images/ba55a643-d286-4fb5-b926-caeb537b9759.png",
    },
  ];
  

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

  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = (arrayList) => {
    if (currentIndex < arrayList.length - 5) setCurrentIndex(currentIndex + 1);
  };

  const moveToCategory = (cat) => {
    window.scrollTo(0, 0);
    navigate(`/classify/${cat}`);
  };

  const moveToSubCategory = (subCat) => {
    window.scrollTo(0, 0);
    navigate(`/${subCat}`);
  };

  const prev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handlePrev = (setIndex) => {
    setIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = (setIndex, dataLength) => {
    setIndex((prev) => Math.min(prev + 1, dataLength - itemsPerBanner));
  };

  return (
    <div className="min-h-screen bg-[#FFF5E1] text-[#2D2D2D] font-poppins">
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

      <section className="bg-gradient-to-r from-[#FFF5E1] to-[#FFEDD5] py-10">
      <motion.div className="max-w-7xl mx-auto px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <div className="text-center mb-8">
            <h2 className="text-4xl font-semibold text-gray-900" style={{"fontFamily" : "poppins"}}>
              Explore Our Menu
            </h2>
            <p className="mt-4 text-lg text-gray-600" style={{"fontFamily" : "poppins"}}>
              Browse through our carefully curated selection
            </p>
          </div>

          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 flex justify-between items-center px-4 transform -translate-y-1/2 z-10">
              <button
                onClick={prev}
                className="p-4 bg-white text-gray-700 rounded-full shadow-lg hover:bg-gray-200 transition ease-in-out transform"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={() => next(subcategories)}
                className="p-4 bg-white text-gray-700 rounded-full shadow-lg hover:bg-gray-200 transition ease-in-out transform"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mt-8">
              {subcategories
                .slice(currentIndex, currentIndex + 5)
                .map((cat, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 hover:bg-green-50 cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-lg"
                    onClick={() => {window.scrollTo(0, 0); navigate(`/${cat.name}`)}}
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                    <h3 className="font-semibold text-xl text-center text-gray-800 truncate">
                      {cat.name}
                    </h3>
                  </div>
                ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="w-full bg-gradient-to-r from-[#FFF5E1] to-[#FFEDD5] py-10">
        <motion.main
          className="mx-auto max-w-7xl px-4 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="rounded-xl bg-gradient-to-r from-[#2D2D2D] to-[#444444] p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black opacity-50 rounded-xl"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold">
                Premium Tobacco, Vapes & Cigarettes 🔞
              </h2>
              <p className="mt-2 text-lg">
                Grab your favorites, all in one place. Fast pickup. No delivery.
                Valid ID required.
              </p>
              <div className="mt-4 flex items-center gap-4">
                <motion.img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Tobacco_leaf_icon.svg/512px-Tobacco_leaf_icon.svg.png"
                  alt="Tobacco"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="w-16 h-16 object-contain"
                />
                <motion.img
                  src="/images/vape1.png"
                  alt="Vape"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.3 }}
                  className="w-16 h-16 object-contain"
                />
                <motion.img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Cigarette_icon.svg/512px-Cigarette_icon.svg.png"
                  alt="Cigarette"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.6 }}
                  className="w-16 h-16 object-contain"
                />
              </div>
              <button onClick={() => moveToCategory(2)} className="bg-[#FFC145] text-black px-6 py-3 font-bold rounded-lg hover:bg-[#FFB000] transition">Order Now <ChevronRight className="inline ml-1" /></button>
            </div>
          </div>
        </motion.main>
      </section>

      <div className="w-full py-10 px-6">
        <motion.main
          className="mx-auto max-w-7xl px-4 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Coffee Banner */}
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1506748686217-9f1e0639cc6f?w=1200"
                alt="Premium Beverages"
                className="w-full h-[100px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black opacity-50"></div>
              <div className="absolute bottom-12 left-8 text-white">
                <h2 className="text-4xl font-bold">Premium Beverages</h2>
                <p className="mt-2 text-lg">
                  Explore our selection of fresh Beverages
                </p>
                <button
                  className="mt-4 flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-orange-600 hover:bg-gray-50"
                  onClick={() => {
                    moveToSubCategory("Beverages");
                  }}
                >
                  Discover Bevergaes <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Quick Sides Banner */}
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1580999787393-b970b13fe585?w=1200"
                alt="Quick Sides"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black opacity-50"></div>
              <div className="absolute bottom-12 left-8 text-white">
                <h2 className="text-4xl font-bold">Groceries</h2>
                <p className="mt-2 text-lg">
                  Everyday Essentials, Right Around the Corner.
                </p>
                <button
                  className="mt-4 flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-teal-600 hover:bg-gray-50"
                  onClick={() => {
                    moveToSubCategory("Grocery Essentials");
                  }}
                >
                  Order Groceries
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.main>
      </div>

      <div className="bg-green-50 rounded-2xl ml-32 mr-32 border border-outline">
        <div className="flex justify-between items-start p-4">
          <div>
            <h2
              className="text-sm tracking-wider text-gray-500 uppercase mb-2 pt-8 pr-4 ml-8 mt-4"
              style={{ fontFamily: "poppins" }}
            >
              More to love
            </h2>
            <h1
              className="text-2xl font-bold text-gray-800 pt-4 pr-4 pl-8"
              style={{ fontFamily: "poppins" }}
            >
              Explore more & uncover hidden gems
            </h1>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-8 p-4">
            {bannerCategories.map((category) => (
              <div
                key={category.title}
                className="cursor-pointer flex flex-col items-center rounded-lg transition-shadow duration-300"
                onClick={() => {{window.scrollTo(0, 0); navigate(`/${category.title}`)}}}
              >
                <div className="bg-green-200 rounded-full flex justify-center items-center">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-16 h-16 object-cover rounded-full"
                  />
                </div>
                <h3
                  className="text-sm font-semibold text-gray-800 mt-2"
                  style={{ fontFamily: "poppins" }}
                >
                  {category.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      <motion.main
        className="mx-auto max-w-7xl px-4 mt-12 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <div className="relative rounded-3xl bg-gray-50 overflow-hidden">
          {/* Title */}
          <div className="text-3xl font-bold text-center py-8 text-gray-800">
            Cravings Corner
          </div>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 left-0 right-0 flex justify-between items-center px-6 transform -translate-y-1/2 z-20">
            <button
              onClick={prev}
              className="p-4 bg-white/90 text-gray-700 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-transform duration-200"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() =>
                next(
                  categories.filter(
                    (item) =>
                      item.subcategory === "Snacks & Candy" ||
                      item.subcategory === "Beverages"
                  )
                )
              }
              className="p-4 bg-white/90 text-gray-700 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-transform duration-200"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Subcategory Cards */}
          <div className="relative z-10 px-6 pt-4 pb-12">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {categories
                .filter(
                  (item) =>
                    item.subcategory === "Snacks & Candy" ||
                    item.subcategory === "Beverages"
                )
                .slice(currentIndex, currentIndex + 5)
                .map((item, index) => {
                  const isInCart = cart.some(
                    (cartItem) => cartItem.id === item.id
                  ); // Check if item is in the cart
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl p-6 hover:bg-green-50 transition duration-300 transform hover:scale-105 shadow-md flex flex-col items-center"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-36 object-cover rounded-lg mb-4"
                      />
                      <h3 className="font-semibold text-center text-gray-800 text-lg truncate mb-1">
                        {item.name}
                      </h3>
                      <p className="text-center text-gray-500 text-sm mb-4">
                        ₹{item.price}
                      </p>

                      {!isInCart ? (
                        <button
                          onClick={() => addToCart(item)}
                          className="w-full py-2 rounded-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-all duration-200"
                        >
                          Add to Cart
                        </button>
                      ) : (
                        <div className="w-full flex justify-between items-center gap-4">
                          <button
                            onClick={() => decrementQuantity(item.id)}
                            className="px-4 py-2 bg-orange-500 rounded-full hover:bg-orange-400 transition-all"
                          >
                            -
                          </button>
                          <span className="text-lg font-semibold">
                            {
                              cart.find((cartItem) => cartItem.id === item.id)
                                ?.quantity
                            }
                          </span>
                          <button
                            onClick={() => incrementQuantity(item.id)}
                            className="px-4 py-2 bg-orange-500 rounded-full hover:bg-orange-400 transition-all"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </motion.main>

      <div className="w-full bg-gradient-to-r from-orange-100 to-pink-100 py-10 px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Best Breakfast & Drink Combos
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Start your day right with our freshly made breakfast combos
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {comboItems.map((combo, i) => {
            const isInCart = cart.some((item) => item.id === combo.id);

            return (
              <motion.div
                key={i}
                className="bg-white rounded-2xl shadow-xl p-4 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <img
                  src={combo.image}
                  alt={combo.name}
                  className="rounded-lg w-full h-48 object-cover mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {combo.name}
                </h3>
                <p className="text-lg font-bold text-orange-600">
                  ${combo.price}
                </p>

                {/* Conditional rendering for buttons */}
                {!isInCart ? (
                  <button
                    className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all"
                    onClick={() => addToCart(combo)}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="mt-4 flex justify-center gap-4">
                    <button
                      onClick={() => decrementQuantity(combo.id)}
                      className="px-4 py-2 bg-orange-500 rounded-full hover:bg-orange-400 transition-all"
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold">{`${
                      cart.find((item) => item.id === combo.id)?.quantity
                    }`}</span>
                    <button
                      onClick={() => incrementQuantity(combo.id)}
                      className="px-4 py-2 bg-orange-500 rounded-full hover:bg-orange-400 transition-all"
                    >
                      +
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
