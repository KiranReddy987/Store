import { useState } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  User,
  X,
  Minus,
  Plus,
  Search,
  Facebook,
  Twitter,
  Linkedin,
  LocateIcon,
} from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AnimatePresence, motion } from "framer-motion";
import { categories } from "@/data/categories";

export function Navbar({
  cart,
  setCart,
  setselectedCategory,
  showSearchLoginProfile,
  user,
  setUser,
}) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginPageOpen, setIsLoginOpen] = useState(false);
  const [login, setLogin] = useState(true);

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  const [showCheckoutOptions, setShowCheckoutOptions] = useState(false);

  const handleCheckout = () => {
    setShowCheckoutOptions(true); // Show the checkout options
  };

  const navigate = useNavigate();

  const handleIncrement = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = (updatedCart[index].quantity || 1) + 1;
    setCart(updatedCart);
  };

  const handleClearCart = () => {
    setCart([]); // Assuming you're using useState for `cart`
  };

  const handleDecrement = (index) => {
    const updatedCart = [...cart];
    const currentQty = updatedCart[index].quantity || 1;
    if (currentQty > 1) {
      updatedCart[index].quantity = currentQty - 1;
      setCart(updatedCart);
    } else {
      updatedCart.splice(index, 1);
      setCart(updatedCart);
    }
  };

  const calculateTotal = () => {
    return cart
      .reduce(
        (acc, item) => acc + (item.originalPrice || 0) * (item.quantity || 1),
        0
      )
      .toFixed(2);
  };

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const toggleLogin = (e) => {
    e.preventDefault();
    setLogin(!login);
  };

  const handleHomeClick = () => {
    setselectedCategory(""); // Reset selected category
    window.scrollTo(0, 0);
    navigate("/"); // Navigate to home
  };

  const handleLocationClick = () => {
    const lat = -33.8567844; // Example coordinates (Sydney, Australia)
    const lng = 151.213108;
    const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(googleMapsUrl, "_blank"); // Open Google Maps in a new tab
  };

  const handleProfileClick = () => {
    if (user) {
      window.scrollTo(0, 0);
      navigate("/profile"); // Navigate to profile if logged in
    } else {
      setIsLoginOpen(true); // Open login modal if not logged in
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-[#556B2F] to-[#6B8E23] text-white border-b">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-6">
            <motion.a
              href="/"
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.95 }}
              className="text-3xl font-logo font-semibold text-white transition-transform bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent"
            >
              K store
            </motion.a>
          </div>

          {showSearchLoginProfile && (
            <div className="hidden flex-1 items-center justify-center px-20 lg:flex">
              <div className="relative w-full max-w-2xl">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search for categories..."
                    className="w-full pl-10 bg-[#F4F4F4] text-black rounded-lg"
                    value={searchText}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSearchText(val);
                      if (val.trim() === "") {
                        setSuggestions([]);
                      } else {
                        const matches = categories
                          .filter((cat) =>
                            cat.name.toLowerCase().includes(val.toLowerCase())
                          )
                          .slice(0, 10);
                        setSuggestions(matches);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && searchText.trim() !== "") {
                        navigate(
                          `/search/${encodeURIComponent(searchText.trim())}`
                        );
                        setSuggestions([]);
                      }
                    }}
                  />
                  {suggestions.length > 0 && (
                    <ul className="absolute left-0 right-0 bg-white border border-gray-200 rounded shadow-md mt-1 z-10 max-h-60 overflow-y-auto">
                      {suggestions.map((cat, idx) => (
                        <li
                          key={idx}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-black"
                          onClick={() => {
                            setSearchText(cat.name);
                            setSuggestions([]);
                            window.scrollTo(0, 0);
                            navigate(`/search/${encodeURIComponent(cat.name)}`);
                          }}
                        >
                          {cat.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-4">
            {/* Home Button */}
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              onClick={handleHomeClick} // Home click to reset selectedCategory
            >
              Home
            </Button>

            {/* Location Button */}
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              onClick={handleLocationClick} // Location button to open Google Maps
            >
              <LocateIcon className="h-5 w-5" />
              Store Location
            </Button>

            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Cart</span>
              </Button>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {cart.length}
                </span>
              )}
            </div>

            {user ? (
              <>
                {showSearchLoginProfile && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2"
                    onClick={handleProfileClick} // Profile click to navigate to /profile
                  >
                    <User className="h-5 w-5" />
                    <span>{user.email.split("@")[0]}</span>
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2"
                  onClick={() => {
                    setUser(null); // Unset the user, logging them out
                    setIsLoggedIn(false); // Set login state to false
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="gap-2"
                onClick={() => setIsLoginOpen(true)}
              >
                <User className="h-5 w-5" />
                <span>Login</span>
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 z-50 h-full w-96 bg-[#F9F9F9] shadow-xl border-l border-gray-200"
          >
            <div className="flex items-center justify-between p-4 border-b bg-[#F0F0F0]">
              <h2 className="text-lg font-semibold text-gray-800">Your Cart</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCartOpen(false)}
              >
                <X className="h-5 w-5 text-gray-800" />
              </Button>
            </div>

            <div className="p-4 overflow-y-auto max-h-[calc(100vh-140px)] space-y-4 bg-[#F9F9F9]">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center text-gray-500">
                  <img
                    src="https://your-logo-url.com/cart-empty-logo.png"
                    alt="Cart is Empty"
                    className="w-32 h-32 object-cover mb-4"
                  />
                  <p className="text-xl">Your cart is empty. Add some items!</p>
                </div>
              ) : (
                <>
                  {cart.map((item, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 flex gap-4 bg-white shadow-sm hover:shadow-md transition duration-200"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-md border"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between">
                          <div>
                            <span className="font-medium block text-sm text-gray-800">
                              {item.title}
                            </span>
                            <span className="text-xs text-gray-500">
                              {item.unit}
                            </span>
                          </div>
                          <span className="text-sm text-gray-600">
                            ${item.originalPrice?.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleDecrement(index)}
                              className="bg-gray-200 text-gray-800 hover:bg-gray-300"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="px-2 text-lg font-semibold">
                              {item.quantity || 1}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleIncrement(index)}
                              className="bg-gray-200 text-gray-800 hover:bg-gray-300"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          <span className="text-sm text-gray-800">
                            $
                            {(
                              item.originalPrice * (item.quantity || 1)
                            ).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Total */}
                  <div className="p-4 border-t bg-white flex justify-between items-center shadow-sm">
                    <span className="font-semibold text-lg text-gray-800">
                      Total
                    </span>
                    <span className="text-lg font-bold text-purple-600">
                      ${calculateTotal()}
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="p-4 border-t bg-white flex justify-between items-center">
                    <Button
                      variant="outline"
                      style={{ color: "black" }}
                      onClick={handleClearCart}
                      disabled={cart.length === 0}
                      className="bg-gray-200 text-gray-800 hover:bg-gray-300"
                    >
                      Clear Cart
                    </Button>

                    <Button
                      onClick={handleCheckout}
                      disabled={cart.length === 0}
                      className="bg-purple-600 text-white hover:bg-purple-700"
                    >
                      Checkout
                    </Button>
                  </div>
                </>
              )}
            </div>
          </motion.aside>
        )}

        {/* Checkout Options */}
        {showCheckoutOptions && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 z-50 h-full w-96 bg-[#F9F9F9] shadow-lg p-4"
          >
            <div className="flex items-center justify-between mb-4 bg-[#F0F0F0]">
              <h2 className="text-lg font-semibold text-gray-800">
                Choose Payment Method
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowCheckoutOptions(false)}
              >
                <X className="h-5 w-5 text-gray-800" />
              </Button>
            </div>

            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full bg-gray-200 text-gray-800 hover:bg-gray-300"
                onClick={() => alert("Pay Online selected")}
              >
                Pay Online
              </Button>
              <Button
                variant="outline"
                className="w-full bg-gray-200 text-gray-800 hover:bg-gray-300"
                onClick={() => alert("Pay at Store selected")}
              >
                Pay at Store
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* User Menu and Login Modal */}
      <AnimatePresence>
        {isUserMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 z-50 h-full w-96 bg-white shadow-lg rounded-l-lg p-8 bg-[#FFF5E1]"
          >
            <div className="flex items-center justify-between mb-4 border-b pb-4 ">
              <h2 className="text-lg font-semibold text-gray-800">
                User Profile
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleUserMenuToggle}
              >
                <X className="h-5 w-5 text-gray-800" />
              </Button>
            </div>

            <div className="space-y-6">
              <div className="text-sm text-gray-700">
                <strong>Name:</strong> {user.name}
              </div>
              <div className="text-sm text-gray-700">
                <strong>Email:</strong> {user.email}
              </div>

              <div className="space-y-4">
                <Button variant="outline" className="w-full">
                  Profile
                </Button>
                <Button variant="outline" className="w-full">
                  Previous Orders
                </Button>

                <Button
                  variant="outline"
                  className="mt-4 w-full bg-red-500 text-white hover:bg-red-600"
                  onClick={() => {
                    setUser(null); // Unset the user, logging them out
                    setIsUserMenuOpen(false); // Close the user menu
                    setIsLoggedIn(false); // Set login state to false
                  }}
                >
                  Logout
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isLoginPageOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 z-50 h-full w-96 bg-white shadow-lg rounded-l-lg p-6 bg-[#FFF5E1]"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Login</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsLoginOpen(false)}
              >
                <X className="h-5 w-5 text-gray-800" />
              </Button>
            </div>

            <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-140px)] bg-[#F9F9F9] rounded-lg">
              {/* Social Sign In */}
              <div className="flex items-center justify-center space-x-4 mb-4">
                <p className="text-sm font-medium text-gray-600">
                  Sign in with
                </p>
                <Button
                  variant="outline"
                  size="icon"
                  className="hover:bg-blue-500"
                >
                  <Facebook className="h-4 w-4 text-blue-600" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="hover:bg-blue-400"
                >
                  <Twitter className="h-4 w-4 text-blue-400" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="hover:bg-blue-700"
                >
                  <Linkedin className="h-4 w-4 text-blue-700" />
                </Button>
              </div>

              {/* Divider */}
              <div className="relative flex items-center justify-center my-4">
                <div className="border-t w-full"></div>
                <span className="absolute bg-white px-4 text-sm text-gray-500">
                  Or
                </span>
              </div>

              {/* Login Form */}
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  const email = e.target.email.value;
                  const password = e.target.password.value;
                  if (email === "admin@gmail.com" && password === "admin") {
                    setUser({ email });
                    setIsLoggedIn(true);
                    setIsLoginOpen(false);
                  } else {
                    alert("Invalid credentials. Try again.");
                  }
                }}
              >
                {/* Email Field */}
                <div className="space-y-1">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Remember Me and Forgot Password */}
                {login && (
                  <div className="flex justify-between items-center text-xs mt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" />
                      <Label htmlFor="remember">Remember me</Label>
                    </div>
                    <a href="#" className="text-blue-600 hover:underline">
                      Forgot password?
                    </a>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full mt-4 bg-blue-600 text-white hover:bg-blue-700"
                >
                  {login ? "Login" : "Register"}
                </Button>
              </form>

              {/* Switch between Login and Register */}
              {login ? (
                <p className="text-center text-xs text-gray-600 mt-4">
                  Don't have an account?{" "}
                  <a
                    className="cursor-pointer text-blue-600 hover:underline font-medium"
                    onClick={(e) => toggleLogin(e)}
                  >
                    Register here
                  </a>
                </p>
              ) : (
                <p className="text-center text-xs text-gray-600 mt-4">
                  Already have an account?{" "}
                  <a
                    className="cursor-pointer text-blue-600 hover:underline font-medium"
                    onClick={(e) => toggleLogin(e)}
                  >
                    Login here
                  </a>
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
