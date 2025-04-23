import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categories } from "@/data/categories";
import { Navbar } from '@/components/navbar';
import { CategoryNav } from '@/components/category-nav';
import Footer from '@/components/ui/Footer';

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
  5: "Essentials & Care"
};

const App = ({ cart, setCart, selectedCategory, setselectedCategory,user,setUser }) => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const catId = parseInt(categoryId || '0');

  const filteredCategories = catId === 0
    ? categories
    : categories.filter(c => c.category === catId);

  const uniqueSubcategories = [...new Set(filteredCategories.map(c => c.subcategory))];

  const [selectedSubCategory, setselectedSubCategory] = useState<string>('All');

  // Handle invalid categoryId and set the selected category
  useEffect(() => {
    if (!(catId in categoryMap)) {
      navigate('/not-found');
      return;
    }
    setselectedSubCategory('All')
    setselectedCategory(categoryMap[catId]);
  }, [catId, navigate, setselectedCategory,setselectedSubCategory]);


  const filteredProducts = selectedSubCategory === 'All'
    ? filteredCategories
    : filteredCategories.filter(product => product.subcategory === selectedSubCategory);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) return;

    const newCartItem: CartItem = {
      id: product.id,
      name: product.name,
      image: product.image,
      originalPrice: product.price,
      quantity: 1
    };

    setCart([...cart, newCartItem]);
  };

  const incrementQuantity = (id: number) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decrementQuantity = (id: number) => {
    setCart(cart.filter(item => {
      if (item.id === id) {
        return item.quantity > 1 ? (item.quantity--, true) : false;
      }
      return true;
    }));
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar cart={cart} setCart={setCart} setselectedCategory={setselectedCategory} showSearchLoginProfile={true} user={user} setUser={setUser}/>
      <CategoryNav selectedCategory={selectedCategory} setselectedCategory={setselectedCategory} />

      <div className="flex p-6 bg-gray-100">
        {/* Sidebar */}
        <div className="w-1/4 bg-white p-4 overflow-y-auto" style={{ maxHeight: '90vh' }}>
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <ul>
            <li
              className={`cursor-pointer p-2 ${selectedSubCategory === "All" ? 'text-purple-600' : 'text-gray-800'}`}
              onClick={() => setselectedSubCategory('All')}
            >
              All
            </li>
            {uniqueSubcategories.map(category => (
              <li
                key={category}
                className={`cursor-pointer p-2 ${selectedSubCategory === category ? 'text-purple-600' : 'text-gray-800'}`}
                onClick={() => setselectedSubCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Product Grid */}
        <div className="w-3/4 ml-8 overflow-y-auto" style={{ maxHeight: '90vh' }}>
          <h1 className="text-3xl font-bold mb-6">{selectedCategory}</h1>
          <div className="grid grid-cols-3 gap-8">
            {filteredProducts.map(product => {
              const inCart = cart.find(item => item.id === product.id);
              return (
                <motion.div
                  key={product.id}
                  className="max-w-sm rounded-lg overflow-hidden shadow-md bg-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    className="w-full h-36 object-cover"
                    src={product.image}
                    alt={product.name}
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold">{product.name}</h2>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xl font-bold text-green-600">
                        ${product.price}
                      </span>
                    </div>
                    {inCart ? (
                      <div className="flex justify-between items-center mt-4">
                        <button
                          onClick={() => decrementQuantity(inCart.id)}
                          className="px-4 py-2 bg-gray-300 text-black rounded-md"
                        >
                          -
                        </button>
                        <span className="text-lg font-semibold">{inCart.quantity}</span>
                        <button
                          onClick={() => incrementQuantity(inCart.id)}
                          className="px-4 py-2 bg-gray-300 text-black rounded-md"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(product)}
                        className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-md w-full"
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
